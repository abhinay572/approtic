#!/usr/bin/env python3
"""Build FaceKit Assets.xcassets from generated assets."""
import json, os, shutil

ROOT = "/home/user/approtic/FaceKit"
XC = os.path.join(ROOT, "FaceKit", "Resources", "Assets.xcassets")
A = os.path.join(ROOT, "assets")
os.makedirs(XC, exist_ok=True)

def w(path, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        json.dump(obj, f, indent=2)

INFO = {"info": {"author": "xcode", "version": 1}}
w(os.path.join(XC, "Contents.json"), INFO)

# App icon
ap = os.path.join(XC, "AppIcon.appiconset")
os.makedirs(ap, exist_ok=True)
shutil.copy(os.path.join(A, "brand", "app-icon-1024.png"), os.path.join(ap, "app-icon-1024.png"))
w(os.path.join(ap, "Contents.json"), {
    "images": [{"filename": "app-icon-1024.png", "idiom": "universal", "platform": "ios", "size": "1024x1024"}],
    "info": INFO["info"]})

# Colors
def color(name, hexv, alpha="1.000"):
    r, g, b = hexv[0:2], hexv[2:4], hexv[4:6]
    cs = os.path.join(XC, f"{name}.colorset")
    w(os.path.join(cs, "Contents.json"), {
        "colors": [{"color": {"color-space": "srgb", "components":
            {"alpha": alpha, "blue": f"0x{b}", "green": f"0x{g}", "red": f"0x{r}"}},
            "idiom": "universal"}],
        "info": INFO["info"]})

color("AccentColor", "2F80FF")
color("LaunchBackground", "F1EEE8")

# Icon template imagesets (SVG, preserves vector, template rendering)
icons_dir = os.path.join(A, "icons")
count = 0
for f in sorted(os.listdir(icons_dir)):
    if not f.endswith(".svg"):
        continue
    name = f[:-4]
    iset = os.path.join(XC, "Icons.spriteatlas" if False else f"{name}.imageset")
    os.makedirs(iset, exist_ok=True)
    shutil.copy(os.path.join(icons_dir, f), os.path.join(iset, f))
    w(os.path.join(iset, "Contents.json"), {
        "images": [{"filename": f, "idiom": "universal"}],
        "info": INFO["info"],
        "properties": {"preserves-vector-representation": True,
                       "template-rendering-intent": "template"}})
    count += 1

# Illustrations (SVG, original rendering)
ill_dir = os.path.join(A, "illustrations")
for f in sorted(os.listdir(ill_dir)):
    if not f.endswith(".svg"):
        continue
    name = f[:-4]
    iset = os.path.join(XC, f"{name}.imageset")
    os.makedirs(iset, exist_ok=True)
    shutil.copy(os.path.join(ill_dir, f), os.path.join(iset, f))
    w(os.path.join(iset, "Contents.json"), {
        "images": [{"filename": f, "idiom": "universal"}],
        "info": INFO["info"],
        "properties": {"preserves-vector-representation": True}})

# Photos + mascot + mask (PNG/SVG originals)
photo_files = [(os.path.join(A, "photos", f), f[:-4]) for f in sorted(os.listdir(os.path.join(A, "photos")))]
photo_files.append((os.path.join(A, "3d", "porcelain-mask-static.png"), "porcelain-mask-static"))
photo_files.append((os.path.join(A, "brand", "coach-mascot.svg"), "coach-mascot"))
for src, name in photo_files:
    fn = os.path.basename(src)
    iset = os.path.join(XC, f"{name}.imageset")
    os.makedirs(iset, exist_ok=True)
    shutil.copy(src, os.path.join(iset, fn))
    props = {"preserves-vector-representation": True} if fn.endswith(".svg") else {}
    obj = {"images": [{"filename": fn, "idiom": "universal", "scale": "2x"} if fn.endswith(".png") else {"filename": fn, "idiom": "universal"}],
           "info": INFO["info"]}
    if props:
        obj["properties"] = props
    # PNGs: provide as universal single-scale
    if fn.endswith(".png"):
        obj["images"] = [{"filename": fn, "idiom": "universal"}]
    w(os.path.join(iset, "Contents.json"), obj)

print(f"xcassets built: {count} icons + illustrations + photos")
