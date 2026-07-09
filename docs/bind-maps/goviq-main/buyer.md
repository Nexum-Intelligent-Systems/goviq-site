# buyer

Auto-derived module: everything under `src/app/buyer/`.

**App directory:** `src/app/buyer/` (4 `.tsx` files scanned; no matching `src/components/` subdirectory found)

## Bind map

```mermaid
flowchart LR
  n0["buyer/packs/[packId]/goods/page.tsx :: BuyerGoodsPackPage"] -->|useQuery| n1["useQuery api.tp.goods.getGoodsBuyerView.getGoodsBuyerView"]
  n1 -->|reads/writes| n2[("tp_goods_line_items")]
  n1 -->|reads/writes| n3[("tp_goods_spec_items")]
  n0["buyer/packs/[packId]/goods/page.tsx :: BuyerGoodsPackPage"] -->|useMutation| n4["useMutation api.tp.goods.enableGoodsMode.enableGoodsMode"]
  n4 -->|reads/writes| n5[("tp_events")]
  n0["buyer/packs/[packId]/goods/page.tsx :: BuyerGoodsPackPage"] -->|useMutation| n6["useMutation api.tp.goods.addGoodsLineItem.addGoodsLineItem"]
  n6 -->|reads/writes| n2[("tp_goods_line_items")]
  n0["buyer/packs/[packId]/goods/page.tsx :: BuyerGoodsPackPage"] -->|useMutation| n7["useMutation api.tp.goods.removeGoodsLineItem.removeGoodsLineItem"]
  n0["buyer/packs/[packId]/goods/page.tsx :: BuyerGoodsPackPage"] -->|useMutation| n8["useMutation api.tp.goods.addGoodsSpecItem.addGoodsSpecItem"]
  n8 -->|reads/writes| n3[("tp_goods_spec_items")]
  n0["buyer/packs/[packId]/goods/page.tsx :: BuyerGoodsPackPage"] -->|useMutation| n9["useMutation api.tp.goods.removeGoodsSpecItem.removeGoodsSpecItem"]
  n10["buyer/packs/page.tsx :: GoodsPacksPage"] -->|useQuery| n11["useQuery api.tp.listGoodsPacks.listGoodsPacks"]
  n11 -->|reads/writes| n12[("tp_packs")]
  n10["buyer/packs/page.tsx :: GoodsPacksPage"] -->|useMutation| n13["useMutation api.sp_procurements.create"]
  n13 -->|reads/writes| n14[("sp_procurements")]
  n13 -->|reads/writes| n15[("sp_auditEvents")]
  n10["buyer/packs/page.tsx :: GoodsPacksPage"] -->|useMutation| n16["useMutation api.tp.createPackFromProcurement.createPackFromProcurement"]
  n16 -->|reads/writes| n12[("tp_packs")]
  n16 -->|reads/writes| n17[("tp_pack_sections")]
  n16 -->|reads/writes| n18[("tp_schedules")]
  n16 -->|reads/writes| n19[("tp_response_requirements")]
  n16 -->|reads/writes| n5[("tp_events")]
```

## Convex functions referenced by this module's UI

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `tp.goods.getGoodsBuyerView.getGoodsBuyerView` | query | `tp_goods_line_items`, `tp_goods_spec_items` | — |
| `tp.goods.enableGoodsMode.enableGoodsMode` | mutation | `tp_events` | — |
| `tp.goods.addGoodsLineItem.addGoodsLineItem` | mutation | `tp_goods_line_items` | — |
| `tp.goods.removeGoodsLineItem.removeGoodsLineItem` | mutation | — | — |
| `tp.goods.addGoodsSpecItem.addGoodsSpecItem` | mutation | `tp_goods_spec_items` | — |
| `tp.goods.removeGoodsSpecItem.removeGoodsSpecItem` | mutation | — | — |
| `tp.listGoodsPacks.listGoodsPacks` | query | `tp_packs` | — |
| `sp_procurements.create` | mutation | `sp_procurements`, `sp_auditEvents` | — |
| `tp.createPackFromProcurement.createPackFromProcurement` | mutation | `tp_packs`, `tp_pack_sections`, `tp_schedules`, `tp_response_requirements`, `tp_events` | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `buyer/packs/[packId]/goods/page.tsx` | BuyerGoodsPackPage | useQuery | `api.tp.goods.getGoodsBuyerView.getGoodsBuyerView` |
| `buyer/packs/[packId]/goods/page.tsx` | BuyerGoodsPackPage | useMutation | `api.tp.goods.enableGoodsMode.enableGoodsMode` |
| `buyer/packs/[packId]/goods/page.tsx` | BuyerGoodsPackPage | useMutation | `api.tp.goods.addGoodsLineItem.addGoodsLineItem` |
| `buyer/packs/[packId]/goods/page.tsx` | BuyerGoodsPackPage | useMutation | `api.tp.goods.removeGoodsLineItem.removeGoodsLineItem` |
| `buyer/packs/[packId]/goods/page.tsx` | BuyerGoodsPackPage | useMutation | `api.tp.goods.addGoodsSpecItem.addGoodsSpecItem` |
| `buyer/packs/[packId]/goods/page.tsx` | BuyerGoodsPackPage | useMutation | `api.tp.goods.removeGoodsSpecItem.removeGoodsSpecItem` |
| `buyer/packs/page.tsx` | GoodsPacksPage | useQuery | `api.tp.listGoodsPacks.listGoodsPacks` |
| `buyer/packs/page.tsx` | GoodsPacksPage | useMutation | `api.sp_procurements.create` |
| `buyer/packs/page.tsx` | GoodsPacksPage | useMutation | `api.tp.createPackFromProcurement.createPackFromProcurement` |
