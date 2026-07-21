# FaceForm UI Design Kit

A packaged design handoff for the 20-screen FaceForm iOS concept.

## Included

- **20 flat, full-bleed PNG screen exports** at 1170 × 2535 px (9:19.5).
- Original source-sheet crops and thumbnails.
- A normalized 4 × 5 contact sheet.
- FaceForm capsule logo, wordmark, gel-ball coach mascot, scan ring, and facecard pattern.
- Recolorable SVG icon library plus PNG icon variants at 24, 48, and 72 px in azure, ink, and muted gray.
- Bone-grain, coach-chat glow, presentation charcoal, and paper-grain texture assets.
- Reusable raster art crops from the screens.
- Design tokens in JSON and Tokens Studio formats.
- CSS and SwiftUI tokens/components.
- Figma setup instructions, screen specifications, copy deck, localization JSON, and mock data.
- A self-contained HTML style guide and PNG overview.

## Important export note

The individual screens are high-resolution normalized raster exports derived from the supplied generated presentation sheet. Their text and photography are flattened. Use the included copy deck, tokens, SVG icons, and implementation files to rebuild fully editable production screens.

## Font note

Font binaries are not included. Use Apple system SF Pro on iOS and the documented Inter/Helvetica fallback stack elsewhere. See `fonts/README.md`.

## Folder map

- `screens/hires_png/` — final 1170 × 2535 PNG exports.
- `screens/source_crops/` — unscaled crops from the original sheet.
- `assets/brand/` — logo and mascot assets.
- `assets/icons/` — SVG and multi-size PNG icons.
- `assets/raster/` — reusable image crops.
- `assets/textures/` — background and grain assets.
- `design_system/` — tokens, docs, CSS, SwiftUI, Figma notes, and style guide.
- `mock_data/` — sample JSON data for dashboard, progress, routines, history, and leaderboard.
- `localization/` — English copy JSON.
- `source/` — original 20-screen presentation sheet.

## Production checklist

1. Rebuild typography and cards as native components rather than embedding screen PNGs.
2. Replace raster model imagery with final licensed or commissioned photography where required.
3. Validate Dynamic Type, VoiceOver, Reduce Motion, and touch target sizes.
4. Keep azure below roughly 10% of each screen and reserve functional colors for status meaning.
