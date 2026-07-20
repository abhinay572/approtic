# FaceKit — Build Progress

## Phase 0 — Setup
- [x] Assets audited (ASSETS-TODO.md written) — 2026-07-20
- [x] Missing/weak assets regenerated (53 icons, 8 illustrations, mascot, app icon, avatars; fonts + mask USDZ blocked — see ASSETS-TODO.md)
- [ ] 20-screen sheet sliced into /reference/screens — **BLOCKED: sheet not uploaded** (see reference/README.md)
- [x] Xcode project scaffolded (DesignSystem.swift, MockDataService, AppRouter + 5-tab shell, fonts plumbing, Assets.xcassets)

## Screens (build loop: built → screenshot-verified → committed)
- [~] 01 Coach chat (chip→bubble morph) — **code complete** (typing dots 900ms, bubble slide-up spring 0.4/0.75, chip cascade 50ms, matchedGeometryEffect morph, radial glow bg). Screenshot loop **requires a Mac** — this session ran on Linux with no Xcode/simulator. Next Mac session: run the loop vs the reference before checking this off.
- [~] 02 Coach intro (name input) — code complete (typing dots → bubble, pill input, CTA)
- [~] 03 Hero (typewriter headline) — scaffold with typewriter implemented; fidelity pass pending
- [~] 04 Sign-in sheet — code complete (Apple/Google, account-optional copy)
- [~] 05 Interstitials — code complete (before/after drag slider, staggered proof cards)
- [~] 06 Scan capture — code complete (AVFoundation front cam, blob mask, 3-2-1 countdown w/ haptics, tick ring; Vision landmarks pending fidelity pass; simulator falls back to mask static)
- [~] 07 Analysing — code complete (percent count, sequential check rows, auto-advance)
- [~] 08 Structure analysis — code complete (ring spring 1.1/0.85, 1.4s count-up, staggered bars, disclaimer)
- [~] 09 Skin analysis — code complete (overlay modes, 0.3s cross-fade, chip/gauge/pill recolor together)
- [~] 10 Dashboard — scaffold (score count-up + ring spring done); fidelity pass pending
- [~] 11 Paywall — scaffold (programmatic clouds/grain, mock plans); StoreKit 2 pending
- [~] 12 Progress / calendar — scaffold; fidelity pass pending
- [~] 13 Scan history — scaffold; fidelity pass pending
- [~] 14 Compare — code complete (slider + delta cards)
- [~] 15 Routine — code complete (exercise cards + slide-to-commit: azure reveal, 90% snap, label cross-fade)
- [~] 16 Exercise player — scaffold (countdown ring + haptics); fidelity pass pending
- [~] 17 FaceCard — code complete (gradient card + ImageRenderer ShareLink)
- [~] 18 Battles — scaffold (mock leaderboard); fidelity pass pending
- [~] 19 Learn hub — code complete (category chips + article cards)
- [~] 20 Settings / profile — scaffold; fidelity pass pending

`[~]` = scaffolded with DS tokens + mocks, NOT yet through the screenshot loop.
Loop rule stands: nothing gets `[x]` without simulator screenshot vs reference.

## Phase 2 — Integration
- [ ] Rive coach mascot (.riv) wired (SwiftUI Canvas fallback live in Shared/CoachMascotView.swift)
- [ ] SceneKit mask (USDZ) wired (static render stand-in in assets/3d)
- [ ] StoreKit products + restore tested
- [ ] Full onboarding flow end-to-end
- [ ] App icon + launch screen — icon generated + in catalog; launch color set

## Session log
- 2026-07-20 (cloud/Linux): unzip revealed skeleton-only upload (no sheet/MP4/UI kit/photos —
  all logged). Generated asset set, scaffolded full Xcode project (synchronized-group
  pbxproj, iOS 17, com.approtic.facekit), built screen 1 code + motion spec.
  **Handoff to Mac:** open FaceKit/FaceKit.xcodeproj, drop General Sans .otf files into
  FaceKit/Resources/Fonts/, run on iPhone 15 Pro sim, start the screenshot loop.
- 2026-07-20 later (cloud/Linux): built screens 02, 04–09, 14, 15, 17, 19 code-complete
  per motion spec (countdown haptics, overlay cross-fades, slide-to-commit, ShareLink
  card render, AVFoundation capture with simulator fallback). All 29 Swift files pass
  tree-sitter syntax check. Remaining unbuilt: 19-detail article view; StoreKit 2,
  Vision landmarks, Rive/SceneKit integrations queued for Phase 2 on a Mac.
