# FaceKit — Project Constitution

Premium iOS face-analysis + daily face-training app (SwiftUI, iOS 17+).
App name: **FaceKit** · bundle id `com.approtic.facekit`.
NAMING NOTE: a competitor already ships under this exact name on the App Store
(id6756392359, by Mindmush). App Store Connect requires unique app names, so the
store display name will need a differentiator at submission (e.g. "FaceKit AI —
Face Analysis"); keep the in-app brand "FaceKit" everywhere in UI copy.

Competitor reference video: /reference/*.MP4. Design targets: the 20-screen
sheet in /reference/ plus solo renders in /assets/screens. Frozen as v1.0 —
match them, do not redesign.

## Non-negotiable design tokens (never guess, never drift)
- Background cream #F1EEE8; chat screens: white → radial #DCEBFF glow, lower half
- Accent azure #2F80FF — ONE accent, ≤10% of any screen; one highlighted word per headline
- Cards: white, 24px radius, shadow (0,12,32, rgba(20,24,32,0.08)), no borders
- Primary CTA: black pill, 56pt tall, 28 radius, white 17pt semibold
- Chips: white pills, hairline #E4E0D8 border
- Text: primary near-black #16181D, secondary #6E7480, micro-labels 11pt uppercase +2 tracking #9AA0AB
- Fonts: General Sans (Fontshare, bundled) for headlines/body; SF Pro Rounded for all score numerals
- Metric colors: redness coral #FF6B7A, texture teal #2EC5A8, tone purple #A855F7, oil amber #F5A623, success green #34C759
- Status pills: GOOD blue / GREAT green / NURTURE amber

## Architecture
- MVVM, feature folders: Onboarding/, Scan/, Analysis/, Dashboard/, Progress/, Routine/, Coach/, Social/, Paywall/, Shared/
- DesignSystem.swift = single source of truth for every token above; NO raw hex/pt values in views
- MockDataService behind protocols first; real backend (Supabase) wired later — every screen must run on mocks
- Dependencies allowed: RiveRuntime, Lottie. Nothing else without asking.
- Navigation: single AppRouter enum-driven; 5 tabs Home / Progress / Scan (center) / Coach / Profile

## The build loop (every screen, no exceptions)
1. Open the matching crop of the reference sheet
2. Build the screen with DesignSystem tokens + mock data
3. `xcodebuild` → run on iPhone 15 Pro simulator → `xcrun simctl io booted screenshot`
4. Compare screenshot vs reference side-by-side; list every visible difference
5. Fix; repeat until spacing, type scale, and color are faithful (target: a designer couldn't pick the fake)
6. Only then commit (conventional commits) and move to the next screen

## Screen order (feel-critical first)
1 Coach chat + chip→bubble matchedGeometryEffect morph · 2 Coach intro (name input)
3 Hero + typewriter headline · 4 Sign-in sheet · 5 Interstitials (proof / compare slider)
6 Scan capture (AVCapture + Vision landmarks, blob mask, tick ring, countdown)
7 Analysing (progress rows + mask) · 8 Structure analysis · 9 Skin analysis (metric overlay modes)
10 Dashboard · 11 Paywall (StoreKit 2: yearly + weekly) · 12 Progress / calendar
13 Scan history · 14 Compare · 15 Routine · 16 Exercise player · 17 FaceCard (+ ShareLink render)
18 Battles (mock leaderboard) · 19 Learn hub · 20 Settings / profile

## Motion spec (implement, don't approximate)
- Chat: 900ms typing dots before each coach message; bubbles slide-up 12pt spring(0.4/0.75); chips cascade 50ms apart; selected chip morphs to user bubble via matchedGeometryEffect; unselected fade → collapse
- Typewriter headlines ~35ms/char, azure words pre-colored
- Score count-up 1.4s decelerating via TimelineView; ring trim spring(1.1/0.85); success haptic at settle
- Slot-machine numbers (routine compiling): digit columns, vertical offset + blur, decelerate
- Countdown numerals scale 1.15→1.0 + light haptic each second
- Metric overlay switch: 0.3s cross-fade; chip / gauges / status pill recolor together
- Slide-to-commit: drag reveals azure gradient fill, snap at 90%, label cross-fades to "Committed"
- Card entrances staggered 60ms, spring(0.45); button press scale 0.97 + light haptic

## Asset fallback protocol — HIGH-LEVEL OUTPUT REQUIRED
Audit /assets first. For anything missing, low-res, wrong-background, or
inconsistent, GENERATE it yourself at production quality; never ship a
placeholder without logging it in ASSETS-TODO.md:
- Icons: hand-write SVGs (24 grid, 1.8px stroke, round caps, single style) → Assets.xcassets template images. Full set ~38 per the design sheet. SF Symbols allowed only as temporary stand-ins, logged.
- Exercise illustrations: single-stroke line SVGs matching the player screen style; uniform stroke weight across the set
- Coach mascot: layered vector (body, highlight, eyes, mouth as separate groups) exported for Rive; SwiftUI-animated fallback (Canvas/shapes) until the .riv exists
- Porcelain mask: source/construct a neutral USDZ for SceneKit; until then, render high-quality statics from provided PNGs — never a gray box
- Paywall clouds, glows, grain: generate programmatically (SwiftUI gradients + noise) rather than stretching low-res PNGs
- App icon: if the provided one is weak, compose in code (Core Graphics script) at 1024

## Product rules (learned from the competitor's 1-star reviews)
- Purchases must restore flawlessly; account optional, never blocks access after payment
- Show real value (structure analysis of a demo scan) BEFORE the paywall
- Never promise AI before/after imagery we don't ship
- Score floor: displayed overall never below 40; framing stays constructive
- Scan data stays on device by default; copy must say so truthfully
- Not-medical-advice disclaimer on analysis screens

## Session discipline
- Start each session: read this file, read ASSETS-TODO.md and PROGRESS.md, continue from the last unchecked item
- Maintain PROGRESS.md checklist of the 20 screens with loop status
- Never refactor working screens while building new ones; batch refactors separately
