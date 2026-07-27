#!/usr/bin/env python3
"""FaceKit exercise illustrations — single-stroke line SVGs, uniform 2.4 weight."""
import os

OUT = "/home/user/approtic/FaceKit/assets/illustrations"
os.makedirs(OUT, exist_ok=True)

HEAD = ('<svg width="160" height="160" viewBox="0 0 160 160" fill="none" '
        'xmlns="http://www.w3.org/2000/svg" stroke="#16181D" stroke-width="2.4" '
        'stroke-linecap="round" stroke-linejoin="round">')
TAIL = "</svg>"

# Shared face base: 3/4 head outline used across the set for consistency
FACE = ('<path d="M55 44c6-14 18-22 31-22 16 0 28 12 28 30 0 8-2 14-2 20 0 4 3 6 3 10 '
        '0 3-3 4-6 4 0 5-1 10-5 13-5 4-13 4-19 2"/>'
        '<path d="M85 138c0-8 0-14-4-18"/>'  # neck
        '<path d="M99 62c3-2 8-2 11 0"/>')   # brow

ILLUSTRATIONS = {
    "ex-jaw-release": [
        FACE,
        '<path d="M74 96c4 6 12 8 18 4"/>',                      # open jaw
        '<path d="M60 100c-6 8-8 16-6 24"/>',                    # jaw stretch line
        '<path d="M118 96l10 6" opacity="0.5"/>', '<path d="M120 84l12 2" opacity="0.5"/>',  # motion ticks
    ],
    "ex-cheek-lift": [
        FACE,
        '<path d="M76 92c5 4 12 4 17 0"/>',                      # smile
        '<path d="M66 78c3-3 8-3 11 0"/>',                       # lifted cheek
        '<path d="M52 70c-8-2-14 2-16 8" opacity="0.5"/>',       # hand hint
        '<path d="M64 60l-6-8" opacity="0.5"/>', '<path d="M76 56l-2-10" opacity="0.5"/>',
    ],
    "ex-brow-smoother": [
        FACE,
        '<path d="M84 60c4-3 10-3 14 0"/>',
        '<path d="M60 40c-10 0-18 6-20 14" opacity="0.5"/>',     # hand at brow
        '<path d="M46 58h14"/>', '<path d="M48 66h12" opacity="0.5"/>',
    ],
    "ex-fish-face": [
        FACE,
        '<path d="M80 92c2 4 8 4 10 0"/>',                       # puckered lips
        '<path d="M70 84c-3 2-4 6-2 9"/>',                       # sucked cheek left
        '<path d="M104 84c3 2 4 6 2 9"/>',
    ],
    "ex-neck-stretch": [
        '<path d="M62 54c6-14 18-22 30-22 16 0 27 12 27 29 0 8-3 14-3 20 0 4 3 6 3 10 0 3-3 4-6 4 0 5-1 10-5 13"/>',
        '<path d="M96 112c-4 10-2 20 4 28"/>',                   # long stretched neck
        '<path d="M64 118c-8 6-12 14-12 22"/>',
        '<path d="M118 70l14-6" opacity="0.5"/>', '<path d="M120 84l14 0" opacity="0.5"/>',
    ],
    "ex-eye-circles": [
        FACE,
        '<circle cx="92" cy="64" r="9"/>',                       # eye orbit
        '<path d="M104 52c4 2 6 6 6 10" opacity="0.5"/>',
        '<path d="M80 76c-4-2-6-6-6-10" opacity="0.5"/>',
    ],
    "ex-tongue-press": [
        FACE,
        '<path d="M78 94h16"/>',                                 # closed mouth
        '<path d="M86 84c0-6 4-10 10-10" opacity="0.5"/>',       # tongue-to-palate hint
        '<path d="M118 108c6 2 10 6 12 12" opacity="0.5"/>',
    ],
    "ex-smile-hold": [
        FACE,
        '<path d="M72 92c6 8 18 8 24 0"/>',                      # wide smile
        '<path d="M64 84c2-2 5-2 7 0" opacity="0.5"/>', '<path d="M100 82c2-2 5-2 7 0" opacity="0.5"/>',
        '<path d="M40 120c4-2 8-2 12 0" opacity="0.5"/>',        # hold timer hint
    ],
}

for name, elements in ILLUSTRATIONS.items():
    with open(os.path.join(OUT, f"{name}.svg"), "w") as f:
        f.write(HEAD + "\n  " + "\n  ".join(elements) + "\n" + TAIL + "\n")
print(f"wrote {len(ILLUSTRATIONS)} illustrations")
