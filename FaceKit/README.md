# FaceKit — iOS app project

Premium face-analysis + daily face-training app. SwiftUI, iOS 17+,
bundle id `com.approtic.facekit`.

- **CLAUDE.md** — project constitution (tokens, motion spec, build loop). Read first.
- **PROGRESS.md** — 20-screen build-loop checklist + session log.
- **ASSETS-TODO.md** — asset audit: what was generated, what is blocked on uploads.
- `FaceKit.xcodeproj` — Xcode 16 project (filesystem-synchronized groups: files added
  to `FaceKit/FaceKit/` appear in the project automatically).
- `FaceKit/` — app source (MVVM feature folders, DesignSystem.swift, MockDataService).
- `assets/` — source assets (icons/illustrations/brand generated; see ASSETS-TODO.md).
- `reference/` — design targets. **Currently missing the 20-screen sheet + competitor MP4** — upload them here.
- `tools/` — Python generators for icons/illustrations/brand/xcassets.

## Run it
1. Open `FaceKit.xcodeproj` on a Mac (Xcode 16+).
2. Optional but intended: drop the six General Sans .otf files into
   `FaceKit/Resources/Fonts/` (see the README there — Fontshare was blocked in the
   cloud session). The app runs on system fonts until then.
3. Build & run on iPhone 15 Pro simulator. The app opens on the Coach tab (screen 1).
