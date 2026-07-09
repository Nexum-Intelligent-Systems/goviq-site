#!/usr/bin/env node
/**
 * Bind-map generator.
 *
 * Derives "component -> Convex function -> table" edges directly from source
 * (no LLM, no manual transcription) so the map can be regenerated whenever
 * the app changes instead of drifting out of date.
 *
 * Two modes, chosen per-config via `mode`:
 *  - "manual" (default, see verifiq.config.mjs): you pre-assign a small,
 *    flat convex/ directory's files to modules; every function in each
 *    assigned file is documented, whether or not the UI calls it yet — this
 *    is what surfaces "dead"/unwired functions.
 *  - "auto" (see goviq-main.config.mjs): for large convex/ trees where
 *    exhaustively parsing every file is impractical, modules are derived
 *    from top-level src/app/ directories and Convex functions are resolved
 *    on demand, only for the ones an actual `useQuery`/`useMutation`/
 *    `useAction(api.*)` call references.
 *
 * Usage: node generate-bind-map.mjs --config <path-to-config.mjs>
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { pathToFileURL } from "node:url";

function walk(dir, exts, excludeDirNames = []) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === "_generated" || entry === "node_modules" || excludeDirNames.includes(entry)) continue;
      out.push(...walk(full, exts, excludeDirNames));
    } else if (exts.includes(extname(entry))) {
      out.push(full);
    }
  }
  return out;
}

function extractTablesFromFile(schemaPath) {
  const src = readFileSync(schemaPath, "utf8");
  const tables = [];
  const re = /^\s{2}(\w+):\s*defineTable\(/gm;
  let m;
  while ((m = re.exec(src))) tables.push(m[1]);
  return tables;
}

function extractTables(config) {
  if (config.schemaFile) return extractTablesFromFile(join(config.repoRoot, config.schemaFile));
  if (config.schemaDir) {
    const dir = join(config.repoRoot, config.schemaDir);
    const files = walk(dir, [".ts"]).filter((f) => !f.endsWith(".test.ts"));
    const tables = new Set();
    for (const f of files) for (const t of extractTablesFromFile(f)) tables.add(t);
    return [...tables];
  }
  throw new Error("config must set schemaFile or schemaDir");
}

const FN_KINDS = ["query", "mutation", "action", "internalQuery", "internalMutation", "internalAction"];

// Single-pass extraction of every string literal passed to ctx.db.query()/insert() in a
// body, filtered against the known table set — avoids O(tables x functions) regex blowup
// on large schemas (goviq-main has 420 tables).
function findTablesInBody(body, knownTablesSet) {
  const found = new Set();
  const re = /\.(?:query|insert)\(\s*["'](\w+)["']/g;
  let m;
  while ((m = re.exec(body))) {
    if (knownTablesSet.has(m[1])) found.add(m[1]);
  }
  return [...found];
}

function findTriggersInBody(body, excludeName) {
  const triggers = new Set();
  const re = /(?:internal|api)\.([\w.]+)\.(\w+)/g;
  let m;
  while ((m = re.exec(body))) {
    const key = `${m[1]}.${m[2]}`;
    if (key !== excludeName) triggers.add(key);
  }
  return [...triggers];
}

// Extract the balanced-paren body of `export const <name> = <kind>(` starting at `matchIndex`.
function extractCallBody(src, matchIndex) {
  let depth = 0;
  let bodyStart = -1;
  let i = matchIndex;
  for (; i < src.length; i++) {
    if (src[i] === "(") {
      depth++;
      if (bodyStart === -1) bodyStart = i;
    } else if (src[i] === ")") {
      depth--;
      if (depth === 0) break;
    }
  }
  return src.slice(bodyStart, i + 1);
}

function extractConvexFunctions(filePath, knownTablesSet) {
  const src = readFileSync(filePath, "utf8");
  const fnRe = new RegExp(`export const (\\w+)\\s*=\\s*(${FN_KINDS.join("|")})\\(`, "g");
  const fns = [];
  let m;
  while ((m = fnRe.exec(src))) {
    const [, name, kind] = m;
    const body = extractCallBody(src, m.index);
    fns.push({
      name,
      kind,
      tables: findTablesInBody(body, knownTablesSet),
      triggers: findTriggersInBody(body, name),
    });
  }
  return fns;
}

// Resolve one specific exported Convex function by name, without scanning the whole file
// for every export — used by auto mode where we only care about referenced functions.
function resolveOneConvexFunction(filePath, fnName, knownTablesSet) {
  const src = readFileSync(filePath, "utf8");
  const fnRe = new RegExp(`export const ${fnName}\\s*=\\s*(${FN_KINDS.join("|")})\\(`);
  const m = fnRe.exec(src);
  if (!m) return null;
  const kind = m[1];
  const body = extractCallBody(src, m.index);
  return { name: fnName, kind, tables: findTablesInBody(body, knownTablesSet), triggers: findTriggersInBody(body, fnName) };
}

function extractUiBindings(filePath, appRoot, { fullPath } = {}) {
  const src = readFileSync(filePath, "utf8");
  const lines = src.split("\n");
  const bindings = [];
  let currentComponent = relative(appRoot, filePath);
  const componentDeclRe = /^(?:export\s+)?(?:default\s+)?(?:function|const)\s+([A-Z]\w*)/;
  const hookRe = fullPath ? /use(Query|Mutation|Action)\(\s*api\.([\w.]+)/ : /use(Query|Mutation|Action)\(\s*api\.(\w+)\.(\w+)/;

  for (const line of lines) {
    const cm = line.match(componentDeclRe);
    if (cm) currentComponent = cm[1];
    if (line.trim().startsWith("//") || line.trim().startsWith("*")) continue;
    const hm = line.match(hookRe);
    if (hm) {
      if (fullPath) {
        const [, hook, dotted] = hm;
        const parts = dotted.split(".");
        const fn = parts.pop();
        const modulePath = parts.join(".");
        bindings.push({ component: currentComponent, hook: `use${hook}`, modulePath, fn, dotted: `${dotted}` });
      } else {
        const [, hook, module, fn] = hm;
        bindings.push({ component: currentComponent, hook: `use${hook}`, module, fn });
      }
    }
  }
  return bindings;
}

function mermaidEscape(s) {
  return s.replace(/"/g, "'");
}

function makeNodeIdFactory() {
  const nodeIds = new Map();
  let counter = 0;
  return (label) => {
    if (!nodeIds.has(label)) nodeIds.set(label, `n${counter++}`);
    return nodeIds.get(label);
  };
}

function renderModuleDoc({ title, description, filesLine, bindingsForModule, notes }) {
  const lines = [`# ${title}`, "", description ?? "", "", filesLine, "", "## Bind map", "", "```mermaid", "flowchart LR"];
  const nodeId = makeNodeIdFactory();

  if (bindingsForModule.length === 0) {
    lines.push(`  n0["(no UI bindings found for this module)"]`);
  }
  for (const b of bindingsForModule) {
    const compLabel = `${b.page} :: ${b.component}`;
    const fnLabel = `${b.hook} api.${b.fnPath}`;
    const compId = nodeId(compLabel);
    const fnId = nodeId(fnLabel);
    lines.push(`  ${compId}["${mermaidEscape(compLabel)}"] -->|${b.hook}| ${fnId}["${mermaidEscape(fnLabel)}"]`);
    if (!b.resolved) {
      const unresolvedId = nodeId(`unresolved:${b.fnPath}`);
      lines.push(`  ${fnId} -.->|"? not resolved"| ${unresolvedId}["unresolved — see Notes"]`);
      continue;
    }
    for (const t of b.resolved.tables) {
      const tId = nodeId(`table:${t}`);
      lines.push(`  ${fnId} -->|reads/writes| ${tId}[("${t}")]`);
    }
    for (const trig of b.resolved.triggers) {
      const trigId = nodeId(`fn:${trig}`);
      lines.push(`  ${fnId} -.->|triggers| ${trigId}["${trig}"]`);
    }
  }
  lines.push("```", "", "## Convex functions referenced by this module's UI", "", "| Function | Kind | Tables touched | Triggers |", "|---|---|---|---|");
  const seen = new Set();
  for (const b of bindingsForModule) {
    if (seen.has(b.fnPath)) continue;
    seen.add(b.fnPath);
    if (!b.resolved) {
      lines.push(`| \`${b.fnPath}\` | *unresolved* | — | — |`);
    } else {
      lines.push(
        `| \`${b.fnPath}\` | ${b.resolved.kind} | ${b.resolved.tables.map((t) => `\`${t}\``).join(", ") || "—"} | ${b.resolved.triggers.map((t) => `\`${t}\``).join(", ") || "—"} |`,
      );
    }
  }
  lines.push("", "## UI bindings", "", "| Page | Component | Hook | Convex function |", "|---|---|---|---|");
  for (const b of bindingsForModule) {
    lines.push(`| \`${b.page}\` | ${b.component} | ${b.hook} | \`api.${b.fnPath}\` |`);
  }
  if (notes?.length) lines.push("", "## Notes", "", ...notes.map((n) => `- ${n}`));
  return lines.join("\n") + "\n";
}

function runManualMode(config) {
  const tables = extractTables(config);
  const knownTablesSet = new Set(tables);

  const convexFiles = walk(join(config.repoRoot, config.convexDir), [".ts"]).filter(
    (f) => !f.endsWith("schema.ts") && !f.includes("_generated"),
  );
  const allFunctions = new Map();
  const fileToModule = new Map();
  for (const mod of config.modules) for (const f of mod.convexFiles) fileToModule.set(f, mod.slug);

  const functionsByModule = new Map(config.modules.map((m) => [m.slug, []]));
  for (const file of convexFiles) {
    const relFile = relative(join(config.repoRoot, config.convexDir), file);
    const modSlug = fileToModule.get(relFile) ?? "unassigned";
    if (!functionsByModule.has(modSlug)) functionsByModule.set(modSlug, []);
    const fns = extractConvexFunctions(file, knownTablesSet);
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
        fnPath: `${b.module}.${b.fn}`,
      })),
    );
  }

  mkdirSync(config.outDir, { recursive: true });
  const indexLines = buildIndexHeader(config);

  for (const mod of config.modules) {
    const fns = functionsByModule.get(mod.slug) ?? [];
    const modFnKeys = new Set(fns.map((f) => `${f.moduleKey}.${f.name}`));
    const bindingsForModule = allBindings
      .filter((b) => modFnKeys.has(b.fnPath))
      .map((b) => ({ ...b, resolved: allFunctions.get(b.fnPath) }));

    const doc = renderModuleDoc({
      title: mod.title,
      description: mod.description,
      filesLine: `**Files:** ${mod.convexFiles.map((f) => `\`${config.convexDir}/${f}\``).join(", ")}`,
      bindingsForModule,
      notes: mod.notes,
    });
    // Manual mode additionally documents every function in the assigned files,
    // not just the ones the UI currently calls — this is how "unwired" functions
    // (e.g. verifiq's auditExport) get surfaced.
    const allFnLines = ["", "## All Convex functions in this module (not just UI-called)", "", "| Function | Kind | Tables touched | Triggers |", "|---|---|---|---|"];
    for (const fn of fns) {
      allFnLines.push(
        `| \`${fn.moduleKey}.${fn.name}\` | ${fn.kind} | ${fn.tables.map((t) => `\`${t}\``).join(", ") || "—"} | ${fn.triggers.map((t) => `\`${t}\``).join(", ") || "—"} |`,
      );
    }
    const finalDoc = doc + allFnLines.join("\n") + "\n";

    writeFileSync(join(config.outDir, `${mod.slug}.md`), finalDoc);
    indexLines.push(`| [${mod.title}](./${mod.slug}.md) | ${fns.length} | ${bindingsForModule.length} |`);
  }

  const unassigned = functionsByModule.get("unassigned") ?? [];
  if (unassigned.length) {
    console.warn(`Warning: ${unassigned.length} functions not assigned to a module: ${unassigned.map((f) => `${f.moduleKey}.${f.name}`).join(", ")}`);
  }

  finishIndex(config, indexLines);
  console.log(`Wrote ${config.modules.length} module bind maps + README to ${config.outDir}`);
}

function runAutoMode(config) {
  const tables = extractTables(config);
  const knownTablesSet = new Set(tables);
  const convexRoot = join(config.repoRoot, config.convexDir);
  const appRoot = join(config.repoRoot, config.appDir);

  const excludeAppDirs = new Set(config.excludeAppDirs ?? []);
  const moduleDirs = readdirSync(appRoot).filter((entry) => {
    if (excludeAppDirs.has(entry)) return false;
    return statSync(join(appRoot, entry)).isDirectory();
  });

  const resolutionCache = new Map(); // "dotted.path" -> resolved fn record or null
  function resolve(dotted) {
    if (resolutionCache.has(dotted)) return resolutionCache.get(dotted);
    const parts = dotted.split(".");
    const fnName = parts.pop();
    const modulePath = parts.join("/");
    const filePath = join(convexRoot, `${modulePath}.ts`);
    let result = null;
    if (existsSync(filePath)) {
      result = resolveOneConvexFunction(filePath, fnName, knownTablesSet);
      if (result) result.file = relative(convexRoot, filePath);
    }
    resolutionCache.set(dotted, result);
    return result;
  }

  mkdirSync(config.outDir, { recursive: true });
  const indexLines = buildIndexHeader(config);
  let totalUnresolved = 0;

  const componentsRoot = config.componentsDir ? join(config.repoRoot, config.componentsDir) : null;
  const componentAliases = config.componentDirAliases ?? {};
  const moduleDirSet = new Set(moduleDirs);

  // dir of a resolved function's file, relative to convexDir root — "router/decision_pack.ts" -> "router";
  // a flat file "sp_procurements.ts" -> "sp_procurements" (its own basename stands in for "module").
  function convexHomeOf(resolvedFile) {
    const parts = resolvedFile.split("/");
    return parts.length > 1 ? parts[0] : parts[0].replace(/\.ts$/, "");
  }

  // module -> module (or module -> backend-subsystem) edges, derived from the same
  // triggers/tables data already extracted per binding — this is the system-level
  // "process flow": which UI modules ultimately fan out into which backend areas.
  const crossModuleEdges = new Map(); // "src=>dst" -> count
  function addEdge(src, dst) {
    if (src === dst) return;
    const key = `${src}=>${dst}`;
    crossModuleEdges.set(key, (crossModuleEdges.get(key) ?? 0) + 1);
  }

  for (const dir of moduleDirs) {
    const dirPath = join(appRoot, dir);
    const tsxFiles = statSync(dirPath).isDirectory() ? walk(dirPath, [".tsx"]) : [];

    let componentFiles = [];
    let componentsSubdir = null;
    if (componentsRoot) {
      const candidate = componentAliases[dir] ?? dir;
      const candidatePath = join(componentsRoot, candidate);
      if (existsSync(candidatePath) && statSync(candidatePath).isDirectory()) {
        componentsSubdir = `${config.componentsDir}/${candidate}`;
        componentFiles = walk(candidatePath, [".tsx"]);
      }
    }

    const bindings = [];
    for (const file of [...tsxFiles, ...componentFiles]) {
      const isComponent = componentFiles.includes(file);
      const scanRoot = isComponent ? componentsRoot : appRoot;
      const raw = extractUiBindings(file, scanRoot, { fullPath: true });
      for (const b of raw) {
        const resolved = resolve(b.dotted);
        if (!resolved) totalUnresolved++;
        bindings.push({ ...b, page: relative(scanRoot, file), fnPath: b.dotted, resolved });

        if (resolved) {
          const targetHome = convexHomeOf(resolved.file);
          const targetModule = moduleDirSet.has(targetHome) ? targetHome : `convex:${targetHome}`;
          addEdge(dir, targetModule);
          for (const trig of resolved.triggers) {
            const trigResolved = resolve(trig);
            if (trigResolved) {
              const trigHome = convexHomeOf(trigResolved.file);
              const trigModule = moduleDirSet.has(trigHome) ? trigHome : `convex:${trigHome}`;
              addEdge(targetModule, trigModule);
            }
          }
        }
      }
    }

    const modTitle = dir;
    const modSlug = dir;
    const filesLine = componentsSubdir
      ? `**App directory:** \`${config.appDir}/${dir}/\` (${tsxFiles.length} \`.tsx\` files) + **components directory:** \`${componentsSubdir}/\` (${componentFiles.length} \`.tsx\` files)`
      : `**App directory:** \`${config.appDir}/${dir}/\` (${tsxFiles.length} \`.tsx\` files scanned; no matching \`${config.componentsDir}/\` subdirectory found)`;
    const doc = renderModuleDoc({
      title: modTitle,
      description: `Auto-derived module: everything under \`${config.appDir}/${dir}/\`${componentsSubdir ? ` plus \`${componentsSubdir}/\`` : ""}.`,
      filesLine,
      bindingsForModule: bindings,
      notes: config.moduleNotes?.[dir],
    });
    writeFileSync(join(config.outDir, `${modSlug}.md`), doc);
    const uniqueFns = new Set(bindings.map((b) => b.fnPath)).size;
    indexLines.push(`| [${modTitle}](./${modSlug}.md) | ${uniqueFns} | ${bindings.length} |`);
  }

  if (totalUnresolved > 0) {
    console.warn(`Warning: ${totalUnresolved} UI bindings reference a Convex function the generator could not locate (see per-module "unresolved" rows).`);
  }

  writeProcessFlow(config, crossModuleEdges, moduleDirs);
  indexLines.push("", `See [PROCESS-FLOW.md](./PROCESS-FLOW.md) for the auto-derived cross-module dependency graph (which modules fan out into which backend subsystems, and which subsystems are the shared backbones).`);
  finishIndex(config, indexLines);
  console.log(`Wrote ${moduleDirs.length} module bind maps + README to ${config.outDir}`);
}

// Auto-derived system-level flow: every edge here is a real (module -> Convex
// subsystem) call or (subsystem -> subsystem) trigger already found while building
// the per-module bind maps above — not a hand-drawn journey. This is what "process
// flow mapping" means at a scale where no one person holds the whole call graph.
function writeProcessFlow(config, crossModuleEdges, moduleDirs) {
  const nodeId = makeNodeIdFactory();
  const lines = [
    `# ${config.title} — Cross-Module Process Flow`,
    "",
    "Every edge below is a real `useQuery`/`useMutation`/`useAction(api.*)` call (module -> backend subsystem) or a Convex `internal.*`/`api.*` call found inside that function's body (subsystem -> subsystem, one hop) — extracted from the same pass that built the per-module bind maps, not hand-drawn. `convex:<name>` nodes are backend subsystems with no matching `src/app/` module of their own.",
    "",
    "```mermaid",
    "flowchart LR",
  ];
  const edges = [...crossModuleEdges.entries()].sort((a, b) => b[1] - a[1]);
  for (const [key, count] of edges) {
    const [src, dst] = key.split("=>");
    const srcId = nodeId(src);
    const dstId = nodeId(dst);
    const srcLabel = moduleDirs.includes(src) ? `["${src}"]` : `(["${src}"])`;
    const dstLabel = moduleDirs.includes(dst) ? `["${dst}"]` : `(["${dst}"])`;
    lines.push(`  ${srcId}${srcLabel} -->|${count}x| ${dstId}${dstLabel}`);
  }
  lines.push("```", "", "Square nodes are `src/app/` modules; rounded nodes are backend-only Convex subsystems.", "");

  lines.push("## Busiest cross-module edges", "", "| From | To | Call count |", "|---|---|---|");
  for (const [key, count] of edges.slice(0, 40)) {
    const [src, dst] = key.split("=>");
    lines.push(`| ${src} | ${dst} | ${count} |`);
  }

  const fanOut = new Map();
  const fanIn = new Map();
  for (const [key, count] of edges) {
    const [src, dst] = key.split("=>");
    fanOut.set(src, (fanOut.get(src) ?? 0) + count);
    fanIn.set(dst, (fanIn.get(dst) ?? 0) + count);
  }
  const topFanIn = [...fanIn.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  lines.push(
    "",
    "## Most-depended-on subsystems (highest fan-in)",
    "",
    "These are the shared backbones — a change here has the widest blast radius across modules.",
    "",
    "| Subsystem | Inbound calls from other modules/subsystems |",
    "|---|---|",
    ...topFanIn.map(([n, c]) => `| ${n} | ${c} |`),
  );

  writeFileSync(join(config.outDir, "PROCESS-FLOW.md"), lines.join("\n") + "\n");
}

function buildIndexHeader(config) {
  return [
    `# ${config.title} — Bind Maps`,
    "",
    "Generated from source by `tools/bind-map/generate-bind-map.mjs`. Do not hand-edit — re-run the generator after code changes:",
    "",
    "```",
    `node tools/bind-map/generate-bind-map.mjs --config tools/bind-map/${config.configName}`,
    "```",
    "",
    "Each edge below is derived from an actual `useQuery`/`useMutation`/`useAction(api.*)` call and the matching Convex function body — not hand-drawn.",
    "",
    "| Module | Convex functions referenced | UI bindings found |",
    "|---|---|---|",
  ];
}

function finishIndex(config, indexLines) {
  if (config.limitations?.length) {
    indexLines.push("", "## Known limitations of this generator", "", ...config.limitations.map((l) => `- ${l}`));
  }
  writeFileSync(join(config.outDir, "README.md"), indexLines.join("\n") + "\n");
}

async function main() {
  const configArgIdx = process.argv.indexOf("--config");
  if (configArgIdx === -1) {
    console.error("Usage: node generate-bind-map.mjs --config <path>");
    process.exit(1);
  }
  const configPath = process.argv[configArgIdx + 1];
  const { default: config } = await import(pathToFileURL(configPath).href);

  if (config.mode === "auto") runAutoMode(config);
  else runManualMode(config);
}

main();
