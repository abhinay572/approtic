# FaceKit — Build Progress

## Phase 0 — Setup
- [x] Assets audited (ASSETS-TODO.md written) — 2026-07-20
- [x] Missing/weak assets regenerated (53 icons, 8 illustrations, mascot, app icon, avatars; fonts + mask USDZ blocked — see ASSETS-TODO.md)
- [ ] 20-screen sheet sliced into /reference/screens — **BLOCKED: sheet not uploaded** (see reference/README.md)
- [x] Xcode project scaffolded (DesignSystem.swift, MockDataService, AppRouter + 5-tab shell, fonts plumbing, Assets.xcassets)

## Screens (build loop: built → screenshot-verified → committed)
- [~] 01 Coach chat (chip→bubble morph) — **code complete** (typing dots 900ms, bubble slide-up spring 0.4/0.75, chip cascade 50ms, matchedGeometryEffect morph, radial glow bg). Screenshot loop **requires a Mac** — this session ran on Linux with no Xcode/simulator. Next Mac session: run the loop vs the reference before checking this off.
- [ ] 02 Coach intro (name input)
- [~] 03 Hero (typewriter headline) — scaffold with typewriter implemented; fidelity pass pending
- [ ] 04 Sign-in sheet
- [ ] 05 Interstitials (proof / compare slider)
- [ ] 06 Scan capture (camera + Vision)
- [ ] 07 Analysing
- [ ] 08 Structure analysis
- [ ] 09 Skin analysis (overlay modes)
- [~] 10 Dashboard — scaffold (score count-up + ring spring done); fidelity pass pending
- [~] 11 Paywall — scaffold (programmatic clouds/grain, mock plans); StoreKit 2 pending
- [~] 12 Progress / calendar — scaffold; fidelity pass pending
- [~] 13 Scan history — scaffold; fidelity pass pending
- [ ] 14 Compare
- [ ] 15 Routine
- [~] 16 Exercise player — scaffold (countdown ring + haptics); fidelity pass pending
- [ ] 17 FaceCard (+ share render)
- [~] 18 Battles — scaffold (mock leaderboard); fidelity pass pending
- [ ] 19 Learn hub
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
