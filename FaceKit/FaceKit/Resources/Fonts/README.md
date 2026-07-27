# General Sans — drop-in required

This cloud environment's proxy blocks fontshare.com, so the .otf files could
not be fetched (logged in ASSETS-TODO.md). To finish font setup:

1. Download the **General Sans** family (free) from
   https://www.fontshare.com/fonts/general-sans
2. Drop these six files into this folder:
   - GeneralSans-Light.otf
   - GeneralSans-Regular.otf
   - GeneralSans-Italic.otf
   - GeneralSans-Medium.otf
   - GeneralSans-Semibold.otf
   - GeneralSans-Bold.otf

Info.plist `UIAppFonts` already lists them, and the folder is inside the
synchronized project group, so Xcode picks them up automatically —
no project edits needed. `DS.Typo` falls back to the system font until the
files exist, so the app builds and runs either way.
