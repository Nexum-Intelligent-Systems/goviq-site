#!/usr/bin/env node
/**
 * Bind-map generator.
 *
 * Derives "component -> Convex function -> table" edges directly from source
 * (no LLM, no manual transcription) so the map can be regenerated whenever
 * the app changes instead of drifting out of date. Point it at a Convex app
 * root via a config file (see verifiq.config.mjs for an example) and it
 * writes one Markdown file per module plus an index README.
 *
 * Usage: node generate-bind-map.mjs --config <path-to-config.mjs>
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

function walk(dir, exts) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === "_generated" || entry === "node_modules") continue;
      out.push(...walk(full, exts));
    } else if (exts.includes(extname(entry))) {
      out.push(full);
    }
  }
  return out;
}

function extractTables(schemaPath) {
  const src = readFileSync(schemaPath, "utf8");
  const tables = [];
  const re = /^\s{2}(\w+):\s*defineTable\(/gm;
  let m;
  while ((m = re.exec(src))) tables.push(m[1]);
  return tables;
}

const FN_KINDS = ["query", "mutation", "action", "internalQuery", "internalMutation", "internalAction"];

function extractConvexFunctions(filePath, knownTables) {
  const src = readFileSync(filePath, "utf8");
  const fnRe = new RegExp(`export const (\\w+)\\s*=\\s*(${FN_KINDS.join("|")})\\(`, "g");
  const fns = [];
  let m;
  while ((m = fnRe.exec(src))) {
    const [, name, kind] = m;
    // naive brace-matched body extraction starting at the match
    const start = m.index;
    let depth = 0;
    let bodyStart = -1;
    let i = start;
    for (; i < src.length; i++) {
      if (src[i] === "(") {
        depth++;
        if (bodyStart === -1) bodyStart = i;
      } else if (src[i] === ")") {
        depth--;
        if (depth === 0) break;
      }
    }
    const body = src.slice(bodyStart, i + 1);

    const tablesTouched = new Set();
    for (const t of knownTables) {
      const tableRe = new RegExp(`\\.(query|insert)\\(\\s*["']${t}["']`, "");
      if (tableRe.test(body)) tablesTouched.add(t);
    }

    const triggers = new Set();
    const triggerRe = /(?:internal|api)\.(\w+)\.(\w+)/g;
    let tm;
    while ((tm = triggerRe.exec(body))) {
      if (`${tm[1]}.${tm[2]}` !== `${name}`) triggers.add(`${tm[1]}.${tm[2]}`);
    }

    fns.push({ name, kind, tables: [...tablesTouched], triggers: [...triggers] });
  }
  return fns;
}

function extractUiBindings(filePath, appRoot) {
  const src = readFileSync(filePath, "utf8");
  const lines = src.split("\n");
  const bindings = [];
  let currentComponent = relative(appRoot, filePath);
  const componentDeclRe = /^(?:export\s+)?(?:default\s+)?(?:function|const)\s+([A-Z]\w*)/;
  const hookRe = /use(Query|Mutation|Action)\(\s*api\.(\w+)\.(\w+)/;

  for (const line of lines) {
    const cm = line.match(componentDeclRe);
    if (cm) currentComponent = cm[1];
    const hm = line.match(hookRe);
    if (hm) {
      const [, hook, module, fn] = hm;
      bindings.push({ component: currentComponent, hook: `use${hook}`, module, fn });
    }
  }
  return bindings;
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function mermaidEscape(s) {
  return s.replace(/"/g, "'");
}

async function main() {
  const configArgIdx = process.argv.indexOf("--config");
  if (configArgIdx === -1) {
    console.error("Usage: node generate-bind-map.mjs --config <path>");
    process.exit(1);
  }
  const configPath = process.argv[configArgIdx + 1];
  const { default: config } = await import(pathToFileURL(configPath).href);

  const tables = extractTables(join(config.repoRoot, config.schemaFile));

  const convexFiles = walk(join(config.repoRoot, config.convexDir), [".ts"]).filter(
    (f) => !f.endsWith("schema.ts") && !f.includes("_generated"),
  );
  const allFunctions = new Map(); // "file.fn" -> record
  const fileToModule = new Map();
  for (const mod of config.modules) {
    for (const f of mod.convexFiles) fileToModule.set(f, mod.slug);
  }

  const functionsByModule = new Map(config.modules.map((m) => [m.slug, []]));
  for (const file of convexFiles) {
    const relFile = relative(join(config.repoRoot, config.convexDir), file);
    const modSlug = fileToModule.get(relFile) ?? "unassigned";
    if (!functionsByModule.has(modSlug)) functionsByModule.set(modSlug, []);
    const fns = extractConvexFunctions(file, tables);
    const moduleKey = relFile.replace(/\.ts$/, "");
    for (const fn of fns) {
      allFunctions.set(`${moduleKey}.${fn.name}`, { ...fn, file: relFile, moduleKey });
      functionsByModule.get(modSlug).push({ ...fn, file: relFile, moduleKey });
    }
  }

  const appFiles = walk(join(config.repoRoot, config.appDir), [".tsx"]);
  const allBindings = [];
  for (const file of appFiles) {
    allBindings.push(
      ...extractUiBindings(file, join(config.repoRoot, config.appDir)).map((b) => ({
        ...b,
        page: relative(join(config.repoRoot, config.appDir), file),
      })),
    );
  }

  mkdirSync(config.outDir, { recursive: true });
  const indexLines = [
    `# ${config.title} — Bind Maps`,
    "",
    `Generated from source by \`tools/bind-map/generate-bind-map.mjs\`. Do not hand-edit — re-run the generator after code changes:`,
    "",
    "```",
    `node tools/bind-map/generate-bind-map.mjs --config tools/bind-map/${config.configName}`,
    "```",
    "",
    "Each edge below is derived from an actual `useQuery`/`useMutation`/`useAction(api.*)` call and the matching Convex function body — not hand-drawn.",
    "",
    "| Module | Convex functions | UI bindings found |",
    "|---|---|---|",
  ];

  for (const mod of config.modules) {
    const fns = functionsByModule.get(mod.slug) ?? [];
    const modFnKeys = new Set(fns.map((f) => `${f.moduleKey}.${f.name}`));
    const bindingsForModule = allBindings.filter((b) => modFnKeys.has(`${b.module}.${b.fn}`));

    const lines = [
      `# ${mod.title}`,
      "",
      mod.description ?? "",
      "",
      `**Files:** ${mod.convexFiles.map((f) => `\`${config.convexDir}/${f}\``).join(", ")}`,
      "",
      "## Bind map",
      "",
      "```mermaid",
      "flowchart LR",
    ];

    const nodeIds = new Map();
    let nodeCounter = 0;
    const nodeId = (label) => {
      if (!nodeIds.has(label)) nodeIds.set(label, `n${nodeCounter++}`);
      return nodeIds.get(label);
    };

    if (bindingsForModule.length === 0) {
      lines.push(`  n0["(no UI bindings found for this module's functions)"]`);
    }
    for (const b of bindingsForModule) {
      const compLabel = `${b.page} :: ${b.component}`;
      const fnLabel = `${b.hook} api.${b.module}.${b.fn}`;
      const compId = nodeId(compLabel);
      const fnId = nodeId(fnLabel);
      lines.push(`  ${compId}["${mermaidEscape(compLabel)}"] -->|${b.hook}| ${fnId}["${mermaidEscape(fnLabel)}"]`);
      const fnRecord = allFunctions.get(`${b.module}.${b.fn}`);
      for (const t of fnRecord?.tables ?? []) {
        const tId = nodeId(`table:${t}`);
        lines.push(`  ${fnId} -->|reads/writes| ${tId}[("${t}")]`);
      }
      for (const trig of fnRecord?.triggers ?? []) {
        const trigId = nodeId(`fn:${trig}`);
        lines.push(`  ${fnId} -.->|triggers| ${trigId}["${trig}"]`);
      }
    }
    lines.push("```", "", "## Convex functions", "", "| Function | Kind | Tables touched | Triggers |", "|---|---|---|---|");
    for (const fn of fns) {
      lines.push(
        `| \`${fn.moduleKey}.${fn.name}\` | ${fn.kind} | ${fn.tables.map((t) => `\`${t}\``).join(", ") || "—"} | ${fn.triggers.map((t) => `\`${t}\``).join(", ") || "—"} |`,
      );
    }
    lines.push("", "## UI bindings", "", "| Page | Component | Hook | Convex function |", "|---|---|---|---|");
    for (const b of bindingsForModule) {
      lines.push(`| \`${b.page}\` | ${b.component} | ${b.hook} | \`api.${b.module}.${b.fn}\` |`);
    }

    if (mod.notes?.length) {
      lines.push("", "## Notes", "", ...mod.notes.map((n) => `- ${n}`));
    }

    const outFile = join(config.outDir, `${mod.slug}.md`);
    writeFileSync(outFile, lines.join("\n") + "\n");
    indexLines.push(`| [${mod.title}](./${mod.slug}.md) | ${fns.length} | ${bindingsForModule.length} |`);
  }

  const unassigned = functionsByModule.get("unassigned") ?? [];
  if (unassigned.length) {
    console.warn(
      `Warning: ${unassigned.length} Convex functions not assigned to a module in config: ${unassigned.map((f) => `${f.moduleKey}.${f.name}`).join(", ")}`,
    );
  }

  if (config.limitations?.length) {
    indexLines.push("", "## Known limitations of this generator", "", ...config.limitations.map((l) => `- ${l}`));
  }

  writeFileSync(join(config.outDir, "README.md"), indexLines.join("\n") + "\n");
  console.log(`Wrote ${config.modules.length} module bind maps + README to ${config.outDir}`);
}

main();
