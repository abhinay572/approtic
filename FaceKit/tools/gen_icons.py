#!/usr/bin/env python3
"""FaceKit icon set generator — 24 grid, 1.8px stroke, round caps, single style."""
import os

OUT = "/home/user/approtic/FaceKit/assets/icons"
os.makedirs(OUT, exist_ok=True)

HEAD = ('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" '
        'xmlns="http://www.w3.org/2000/svg" stroke="currentColor" '
        'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">')
TAIL = "</svg>"

# Each icon: list of raw SVG element strings (stroke inherits from root).
ICONS = {
    # ---- Tab bar ----
    "tab-home": ['<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5.5h-5V21H5a1 1 0 0 1-1-1v-9.5Z"/>'],
    "tab-progress": ['<path d="M4 20V14"/>', '<path d="M9.3 20V9"/>', '<path d="M14.7 20v-8"/>', '<path d="M20 20V5"/>'],
    "tab-scan": ['<path d="M4 8V6a2 2 0 0 1 2-2h2"/>', '<path d="M16 4h2a2 2 0 0 1 2 2v2"/>',
                 '<path d="M20 16v2a2 2 0 0 1-2 2h-2"/>', '<path d="M8 20H6a2 2 0 0 1-2-2v-2"/>',
                 '<path d="M9 10.2c0-2 1.3-3.2 3-3.2s3 1.2 3 3.2c0 1.4-.6 2.4-1.4 3.1-.4.4-.6.9-.6 1.4v.3h-2v-.3c0-.5-.2-1-.6-1.4-.8-.7-1.4-1.7-1.4-3.1Z"/>',
                 '<path d="M10.5 17.5h3"/>'],
    "tab-coach": ['<path d="M12 4c4.4 0 8 3 8 6.9 0 3.9-3.6 6.9-8 6.9-.9 0-1.8-.1-2.6-.4L6 19v-3.2C4.7 14.6 4 12.9 4 10.9 4 7 7.6 4 12 4Z"/>',
                  '<circle cx="9.2" cy="11" r="0.4" fill="currentColor"/>', '<circle cx="14.8" cy="11" r="0.4" fill="currentColor"/>'],
    "tab-profile": ['<circle cx="12" cy="8.2" r="3.6"/>', '<path d="M5 20c.8-3.2 3.6-5 7-5s6.2 1.8 7 5"/>'],
    # ---- Navigation ----
    "chevron-left": ['<path d="M14.5 5.5 8 12l6.5 6.5"/>'],
    "chevron-right": ['<path d="M9.5 5.5 16 12l-6.5 6.5"/>'],
    "chevron-down": ['<path d="M5.5 9.5 12 16l6.5-6.5"/>'],
    "close": ['<path d="M6 6l12 12"/>', '<path d="M18 6 6 18"/>'],
    "arrow-right": ['<path d="M4 12h16"/>', '<path d="M14 6l6 6-6 6"/>'],
    "arrow-up-right": ['<path d="M7 17 17 7"/>', '<path d="M9 7h8v8"/>'],
    # ---- Actions ----
    "settings": ['<circle cx="12" cy="12" r="3"/>',
                 '<path d="M12 2.8l1.2 2.3 2.6.4 1.9-1 1.5 2.6-1.5 2.1.7 2.5L21 13l-1.5 2.6-2.5-.4-1.8 1.9.1 2.6-2.9.6-1.1-2.4h-2.6l-1.1 2.4-2.9-.6.1-2.6-1.8-1.9-2.5.4L3 13l2.6-1.3.7-2.5-1.5-2.1 1.5-2.6 1.9 1 2.6-.4L12 2.8Z" stroke-width="1.4" opacity="0"/>',
                 '<path d="M12 3.5v2"/>', '<path d="M12 18.5v2"/>', '<path d="M20.5 12h-2"/>', '<path d="M5.5 12h-2"/>',
                 '<path d="M18 6l-1.4 1.4"/>', '<path d="M7.4 16.6 6 18"/>', '<path d="M18 18l-1.4-1.4"/>', '<path d="M7.4 7.4 6 6"/>'],
    "share": ['<path d="M12 3v11"/>', '<path d="M8 6.5 12 3l4 3.5"/>', '<path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8"/>'],
    "plus": ['<path d="M12 5v14"/>', '<path d="M5 12h14"/>'],
    "check": ['<path d="M5 12.5 10 17.5 19 7"/>'],
    "edit": ['<path d="M14.5 5.5 18.5 9.5 8.5 19.5H4.5v-4L14.5 5.5Z"/>', '<path d="M12.5 7.5l4 4"/>'],
    "trash": ['<path d="M5 7h14"/>', '<path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
              '<path d="M7 7l1 12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-12"/>', '<path d="M10 11v5"/>', '<path d="M14 11v5"/>'],
    "search": ['<circle cx="11" cy="11" r="6"/>', '<path d="M15.5 15.5 20 20"/>'],
    "bell": ['<path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10Z"/>', '<path d="M10.3 19a2 2 0 0 0 3.4 0"/>'],
    "logout": ['<path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3"/>', '<path d="M10 12h10"/>', '<path d="M16 8l4 4-4 4"/>'],
    # ---- Scan / camera ----
    "camera": ['<path d="M4 8a2 2 0 0 1 2-2h2l1.4-2h5.2L16 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"/>', '<circle cx="12" cy="12.5" r="3.4"/>'],
    "camera-flip": ['<path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"/>',
                    '<path d="M9.5 12.3a2.6 2.6 0 0 1 4.6-1.4"/>', '<path d="M14.5 12.7a2.6 2.6 0 0 1-4.6 1.4"/>',
                    '<path d="M14.3 9.2v1.8h-1.8"/>', '<path d="M9.7 15.8V14h1.8"/>'],
    "flash": ['<path d="M13 3 5.5 13.5H11L10 21l7.5-10.5H12L13 3Z"/>'],
    "timer": ['<circle cx="12" cy="13.5" r="7"/>', '<path d="M12 10v3.5l2.4 1.6"/>', '<path d="M10 3.5h4"/>'],
    "face-outline": ['<path d="M6.5 10.5C6.5 6.6 8.9 4 12 4s5.5 2.6 5.5 6.5c0 2.6-1 5-2.5 6.7-.9 1-1.9 1.8-3 1.8s-2.1-.8-3-1.8c-1.5-1.7-2.5-4.1-2.5-6.7Z"/>'],
    "sparkle": ['<path d="M12 4c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6Z"/>',
                '<path d="M18.5 15.5c.3 1.6 1 2.3 2.5 2.5-1.5.2-2.2.9-2.5 2.5-.3-1.6-1-2.3-2.5-2.5 1.5-.2 2.2-.9 2.5-2.5Z"/>'],
    # ---- Metrics ----
    "metric-redness": ['<path d="M12 4.5c2.5 3.2 5.5 6.3 5.5 9.6a5.5 5.5 0 0 1-11 0c0-3.3 3-6.4 5.5-9.6Z"/>', '<path d="M9.6 14.8a2.7 2.7 0 0 0 2 2.1"/>'],
    "metric-texture": ['<path d="M4 8c2-2.5 4-2.5 6 0s4 2.5 6 0 3-2 4 0" transform="translate(0 -1)"/>',
                       '<path d="M4 13c2-2.5 4-2.5 6 0s4 2.5 6 0 3-2 4 0"/>', '<path d="M4 18c2-2.5 4-2.5 6 0s4 2.5 6 0 3-2 4 0" transform="translate(0 1)"/>'],
    "metric-tone": ['<circle cx="12" cy="12" r="8"/>', '<path d="M12 4a8 8 0 0 1 0 16" fill="currentColor" fill-opacity="0.15" stroke="none"/>', '<path d="M12 4v16"/>'],
    "metric-oil": ['<path d="M12 4c2.2 3 4.8 5.7 4.8 8.7A4.8 4.8 0 0 1 12 17.5a4.8 4.8 0 0 1-4.8-4.8C7.2 9.7 9.8 7 12 4Z"/>', '<path d="M8 20.5h8"/>'],
    "metric-structure": ['<path d="M12 4l7 4v8l-7 4-7-4V8l7-4Z"/>', '<path d="M12 4v8"/>', '<path d="M12 12l7-4"/>', '<path d="M12 12 5 8"/>', '<path d="M12 12v8"/>'],
    "symmetry": ['<path d="M12 3v18" stroke-dasharray="2.5 2.5"/>', '<path d="M8.5 7 4 12l4.5 5"/>', '<path d="M15.5 7 20 12l-4.5 5"/>'],
    # ---- Routine / lifestyle ----
    "streak-flame": ['<path d="M12 3.5c.5 3-1 4.4-2.6 6C7.8 11 6.5 12.6 6.5 15a5.5 5.5 0 0 0 11 0c0-4.5-3.5-6-3.5-9.5-1 .7-1.6 1.7-1.8 3-1-1.3-.6-3.4 1.8-5Z"/>'],
    "water-drop": ['<path d="M12 4c2.5 3.4 5 6.4 5 9.6a5 5 0 0 1-10 0C7 10.4 9.5 7.4 12 4Z"/>'],
    "sleep-moon": ['<path d="M19.5 14A8 8 0 0 1 10 4.5 8 8 0 1 0 19.5 14Z"/>'],
    "sun": ['<circle cx="12" cy="12" r="4"/>', '<path d="M12 3v2"/>', '<path d="M12 19v2"/>', '<path d="M21 12h-2"/>', '<path d="M5 12H3"/>',
            '<path d="M18.4 5.6 17 7"/>', '<path d="M7 17l-1.4 1.4"/>', '<path d="M18.4 18.4 17 17"/>', '<path d="M7 7 5.6 5.6"/>'],
    "calendar": ['<rect x="4" y="6" width="16" height="14" rx="2"/>', '<path d="M4 10.5h16"/>', '<path d="M8.5 4v3"/>', '<path d="M15.5 4v3"/>'],
    "clock-history": ['<circle cx="12" cy="12" r="8"/>', '<path d="M12 7.5V12l3 2"/>'],
    "play": ['<path d="M8.5 5.5v13L19 12 8.5 5.5Z"/>'],
    "pause": ['<path d="M8.5 5.5v13"/>', '<path d="M15.5 5.5v13"/>'],
    "replay": ['<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/>', '<path d="M6.5 3.5v3.4h3.4"/>'],
    "compare": ['<path d="M12 3v18" stroke-dasharray="2.5 2.5"/>', '<rect x="3.5" y="7" width="5.5" height="10" rx="1.5"/>', '<rect x="15" y="7" width="5.5" height="10" rx="1.5"/>'],
    # ---- Social / gamification ----
    "trophy": ['<path d="M8 4h8v6a4 4 0 0 1-8 0V4Z"/>', '<path d="M8 5.5H5.5a0 0 0 0 0 0 0c0 2.8 1 4.5 2.7 4.9"/>',
               '<path d="M16 5.5h2.5c0 2.8-1 4.5-2.7 4.9"/>', '<path d="M12 14v3"/>', '<path d="M8.5 20h7"/>', '<path d="M12 17c-1.8 0-2.8 1-3 3h6c-.2-2-1.2-3-3-3Z"/>'],
    "swords": ['<path d="M5 4 15.5 14.5"/>', '<path d="M5 4h2.8L18 14.2"/>', '<path d="M19 4 8.5 14.5"/>', '<path d="M19 4h-2.8L6 14.2"/>',
               '<path d="M6.5 16.5 5 18l1.5 1.5L8 18"/>', '<path d="M17.5 16.5 19 18l-1.5 1.5L16 18"/>'],
    "crown": ['<path d="M4.5 8.5 8 11.5 12 6l4 5.5 3.5-3v8a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5v-8Z"/>'],
    "heart": ['<path d="M12 19.5C7 15.8 4 13 4 9.7 4 7.4 5.8 5.5 8.1 5.5c1.6 0 3 .9 3.9 2.2.9-1.3 2.3-2.2 3.9-2.2 2.3 0 4.1 1.9 4.1 4.2 0 3.3-3 6.1-8 9.8Z"/>'],
    "star": ['<path d="M12 4l2.3 4.9 5.2.7-3.8 3.7.9 5.2L12 16l-4.6 2.5.9-5.2L4.5 9.6l5.2-.7L12 4Z"/>'],
    "book-learn": ['<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v14.5H6.5A2.5 2.5 0 0 0 4 21V6.5Z"/>', '<path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20"/>', '<path d="M9 8.5h6"/>'],
    "lock": ['<rect x="5.5" y="10.5" width="13" height="9.5" rx="2"/>', '<path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>', '<circle cx="12" cy="15" r="1" fill="currentColor" stroke="none"/>'],
    "shield-privacy": ['<path d="M12 3.5 19 6v5.5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-2.5Z"/>', '<path d="M9.2 11.8l2 2 3.6-4"/>'],
    "info": ['<circle cx="12" cy="12" r="8.5"/>', '<path d="M12 11v5"/>', '<circle cx="12" cy="8" r="0.4" fill="currentColor"/>'],
    "restore": ['<path d="M4.5 12a7.5 7.5 0 1 1 2 5.1"/>', '<path d="M4.5 20.3v-3.4h3.4"/>', '<path d="M12 8.5V12l2.6 1.6"/>'],
    "gift": ['<rect x="4" y="10" width="16" height="10" rx="1.5"/>', '<path d="M4 10h16V7H4v3Z" stroke-width="1.8"/>', '<path d="M12 7v13"/>',
             '<path d="M12 7c-3.2 0-4.5-1-4.5-2.3C7.5 3.7 8.3 3 9.4 3 11 3 12 4.6 12 7Z"/>', '<path d="M12 7c3.2 0 4.5-1 4.5-2.3C16.5 3.7 15.7 3 14.6 3 13 3 12 4.6 12 7Z"/>'],
}

for name, elements in ICONS.items():
    with open(os.path.join(OUT, f"icon-{name}.svg"), "w") as f:
        f.write(HEAD + "\n  " + "\n  ".join(elements) + "\n" + TAIL + "\n")

print(f"wrote {len(ICONS)} icons")
