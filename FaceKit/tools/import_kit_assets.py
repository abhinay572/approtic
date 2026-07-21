#!/usr/bin/env python3
"""Import real FaceForm kit rasters into Assets.xcassets, replacing stand-ins."""
import json, os, shutil

ROOT = "/Users/abhinay/approtic/FaceKit"
KIT = f"{ROOT}/assets/FaceForm_UI_Design_Kit/assets"
XC = f"{ROOT}/FaceKit/Resources/Assets.xcassets"

# kit file -> imageset name (replaces existing set if present)
MAP = {
    "raster/hero_phone_composite.png": "hero-phone",
    "raster/sign_in_editorial_model.png": "signin-model",
    "raster/coach_mascot_reference.png": "coach-mascot",
    "raster/before_after_comparison.png": "before-after",
    "raster/porcelain_structure_mask.png": "porcelain-mask-static",
    "raster/porcelain_analysis_mask.png": "porcelain-analysis-mask",
    "raster/face_scan_portrait.png": "scan-demo",
    "raster/skin_analysis_model.png": "skin-model",
    "raster/dotted_face_preview.png": "dotted-face",
    "raster/paywall_capsule_clouds.png": "paywall-clouds",
    "raster/facecard_sample.png": "facecard-sample",
    "raster/learn_featured_illustration.png": "learn-featured",
    "textures/paper_grain_overlay_512.png": "paper-grain",
    "textures/bone_grain_background_1170x2535.png": "bone-grain-bg",
    "textures/chat_glow_background_1170x2535.png": "chat-glow-bg",
    "textures/charcoal_presentation_background_1024.png": "charcoal-bg",
    "brand/faceform_capsule_512.png": "brand-capsule",
    "brand/coach_mascot_512.png": "coach-mascot-flat",
    "brand/faceform_wordmark.png": "brand-wordmark",
}

for src, name in MAP.items():
    src_path = os.path.join(KIT, src)
    if not os.path.exists(src_path):
        print(f"MISSING: {src}")
        continue
    d = os.path.join(XC, f"{name}.imageset")
    if os.path.exists(d):
        shutil.rmtree(d)
    os.makedirs(d)
    fn = f"{name}.png"
    shutil.copy(src_path, os.path.join(d, fn))
    with open(os.path.join(d, "Contents.json"), "w") as f:
        json.dump({
            "images": [{"filename": fn, "idiom": "universal", "scale": "2x"},
                        {"idiom": "universal", "scale": "1x"},
                        {"idiom": "universal", "scale": "3x"}],
            "info": {"author": "xcode", "version": 1},
        }, f, indent=2)
    print(f"OK: {name} <- {src}")
print("done")
