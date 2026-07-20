# ASSETS-TODO — audit vs the 20-screen requirements

Audited 2026-07-20 (remote Linux session). **Source situation:** the uploaded
`FaceKitproject.zip` contained only the empty folder skeleton — no design sheet,
no competitor MP4, no photos, no fonts, no UI kit. The "FaceForm complete UI kit"
zip mentioned from Downloads was **not uploaded** to this cloud session and must
be re-attached. Everything below marked GENERATED was produced this session per
the Asset Fallback Protocol; everything marked MISSING-BLOCKED needs a file drop
or a Mac.

| Asset | Status | Notes |
|---|---|---|
| Icon set (~38+) | **GENERATED** ✅ | 53 hand-written SVGs in `assets/icons/` — 24 grid, 1.8 stroke, round caps, single style. Tabs, nav, scan/camera, metrics, routine, social, paywall. Wired into `Assets.xcassets` as template images. |
| Exercise illustrations | **GENERATED** ✅ | 8 single-stroke line SVGs in `assets/illustrations/` (jaw release, cheek lift, brow smoother, fish face, neck stretch, eye circles, tongue press, smile hold), uniform 2.4 stroke, shared face base. |
| Coach mascot | **GENERATED** ✅ | `assets/brand/coach-mascot.svg` — layered groups (`body`, `highlight`, `eyes`, `blush`, `mouth`, `shadow`) named for Rive import. SwiftUI Canvas fallback implemented in `Shared/CoachMascotView.swift`; replace with `.riv` when produced. |
| App icon | **GENERATED** ✅ | `assets/brand/app-icon-1024.png` composed in code (azure gradient, scan corners + face glyph). In `Assets.xcassets/AppIcon`. Regenerate script: `tools/gen_brand.py`. |
| Wordmark | **GENERATED** ✅ | `assets/brand/wordmark.svg` (text run requires General Sans installed when rasterizing). |
| Porcelain mask (USDZ) | **NEEDS-REGEN** ⚠️ | No USDZ source available and no provided PNGs to re-render from. Shipped `assets/3d/porcelain-mask-static.png` — a soft sculptural static (not a gray box) — but it is below the reference bar. TODO: source/construct neutral USDZ on a Mac (Reality Composer / polycam) for SceneKit. |
| Photos (before/after, scan demo) | **NEEDS-REGEN** ⚠️ | No real photography was provided. Generated neutral abstract portrait stand-ins (`before-demo.png`, `after-demo.png`, `scan-demo.png`) — logged placeholders, must be replaced with licensed photography before ship. Product rule: never promise AI before/after imagery we don't ship. |
| Leaderboard avatars | **GENERATED** ✅ | 6 gradient silhouette avatars `avatar-01..06.png` for Battles mock. Acceptable for mock data; real user photos come from backend later. |
| General Sans fonts | **MISSING-BLOCKED** ⛔ | Fontshare (api/cdn.fontshare.com) is 403-blocked by this environment's network proxy. `FaceKit/Resources/Fonts/README.md` documents the drop-in step; `DesignSystem.Typography` auto-falls back to the system font until the 6 .otf files land. **Action: download General Sans from fontshare.com and drop into `FaceKit/FaceKit/Resources/Fonts/`** (Info.plist UIAppFonts entries are already declared). |
| SF Pro Rounded (score numerals) | **OK** ✅ | System-provided via `.fontDesign(.rounded)` — nothing to bundle. |
| Paywall clouds / glows / grain | **OK (in code)** ✅ | Generated programmatically in `Shared/CloudField.swift` + `DesignSystem.Gradients` (SwiftUI gradients + Canvas noise), per protocol. No raster needed. |
| Chat radial glow | **OK (in code)** ✅ | `DesignSystem.Gradients.chatGlow` — white → radial #DCEBFF, lower half. |
| 20-screen design sheet | **MISSING-BLOCKED** ⛔ | Not in the upload. SLICE phase cannot run. **Action: upload the sheet PNG to `reference/`**, then slice to `reference/screens/01-hero.png … 20-learn.png`. |
| Competitor screen-recording MP4 | **MISSING-BLOCKED** ⛔ | Not in the upload. **Action: upload to `reference/`.** |
| FaceForm complete UI kit (Downloads zip) | **MISSING-BLOCKED** ⛔ | Referenced by owner but never reached this session — local Downloads folders aren't visible to the cloud container. **Action: attach the zip in a message or commit it to the repo.** |
| Solo screen renders | **MISSING-BLOCKED** ⛔ | `assets/screens/` empty — expected from the same upload. |

## SF Symbols stand-ins currently in code (temporary, logged)
None — all icons referenced by the scaffold use the generated SVG set.

## Regeneration scripts
`FaceKit/tools/gen_icons.py`, `gen_illustrations.py`, `gen_brand.py` (Python 3 + Pillow).
