#!/usr/bin/env python3
"""Slice the 20-screen reference sheet into reference/screens/ per kit manifest."""
import json, os, sys
from PIL import Image

ROOT = "/Users/abhinay/approtic/FaceKit"
MANIFEST = f"{ROOT}/assets/FaceForm_UI_Design_Kit/screens/screen_manifest.json"
SHEET = f"{ROOT}/reference/reference_sheet_20_screens.png"
OUT = f"{ROOT}/reference/screens"

with open(MANIFEST) as f:
    screens = json.load(f)

img = Image.open(SHEET)
W, H = img.size
print(f"sheet: {W}x{H}")

# Manifest coords assume a particular sheet size; infer it from max crop extent
max_r = max(s["source_crop_px"]["right"] for s in screens)
max_b = max(s["source_crop_px"]["bottom"] for s in screens)
# Assume small margin beyond max extents
sx = W / (max_r + 9)
sy = H / (max_b + 6)
print(f"scale: {sx:.3f} x {sy:.3f}")

os.makedirs(OUT, exist_ok=True)
for s in screens:
    c = s["source_crop_px"]
    box = (round(c["left"] * sx), round(c["top"] * sy),
           round(c["right"] * sx), round(c["bottom"] * sy))
    crop = img.crop(box)
    # upscale to export size for easier side-by-side with 1290x2796 screenshots
    crop = crop.resize((1170, 2535), Image.LANCZOS)
    name = f"{s['number']:02d}_{s['slug']}.png"
    crop.save(os.path.join(OUT, name))
    print(f"{name}  <- {box}")
print("done")
