# Paste this into Claude Code as the first message

Read CLAUDE.md fully — it is the constitution for this project. Then:

1. AUDIT: inspect everything in /assets and /reference. Produce ASSETS-TODO.md
   listing every asset as OK / NEEDS-REGEN / MISSING against what the 20 screens
   require (icons, fonts, mascot, mask, photos, illustrations, clouds). For every
   NEEDS-REGEN or MISSING item, generate it now per the Asset Fallback Protocol —
   high-level output, no placeholders left unlogged.

2. SLICE: cut the 20-screen design sheet in /reference into 20 individual
   reference images in /reference/screens/, named 01-hero.png … 20-learn.png
   per the screen order in CLAUDE.md.

3. SCAFFOLD: create the Xcode project (FaceKit, SwiftUI, iOS 17+, bundle id
   com.approtic.facekit), feature folders, DesignSystem.swift with every token
   from CLAUDE.md, bundled General Sans fonts, MockDataService with realistic
   fake data for all 20 screens, AppRouter with the 5-tab shell, and PROGRESS.md.

4. LOOP: begin with screen 1 — the coach chat with the chip-to-bubble
   matchedGeometryEffect morph — and run the full build → screenshot → compare →
   fix loop from CLAUDE.md until it is faithful to the coach-chat reference.
   Show me the final simulator screenshot before moving on.

Work autonomously through the audit, slice, and scaffold without stopping to
ask; only pause for the screen-1 screenshot review.
