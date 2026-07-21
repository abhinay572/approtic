from __future__ import annotations

import csv
import json
import math
import os
import random
import shutil
import textwrap
import zipfile
from pathlib import Path
from typing import Dict, List, Tuple

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont
import cairosvg

SRC = Path('/mnt/data/a_clean_high_resolution_mockup_gallery_of_a_mobil.png')
ROOT = Path('/mnt/data/FaceForm_UI_Design_Kit')
ZIP_PATH = Path('/mnt/data/FaceForm_UI_Design_Kit.zip')

if ROOT.exists():
    shutil.rmtree(ROOT)
ROOT.mkdir(parents=True)

# -----------------------------------------------------------------------------
# Core constants
# -----------------------------------------------------------------------------
COLORS = {
    'bone': '#F1EEE8',
    'surface': '#FFFFFF',
    'ink': '#12151B',
    'body': '#6E7480',
    'muted': '#A4A9B2',
    'border': '#E4E0D8',
    'azure': '#2F80FF',
    'azure_soft': '#DCEBFF',
    'azure_pale': '#EAF2FF',
    'charcoal': '#25272B',
    'success': '#19B56B',
    'danger': '#E85D5D',
    'gold': '#C49A45',
    'skin_data': '#2AA6A2',
}

SCREEN_NAMES = [
    'Hero', 'Sign-In', 'Coach Intro', 'Coach Question',
    'Multi-Select', 'Glow-Up Proof', 'Structure Analysis', 'Face Scan',
    'Analysing', 'Skin Analysis', 'Dashboard', 'Paywall',
    'Progress Tab', 'Scan History', 'Compare', 'Routine Tab',
    'Exercise Player', 'FaceCard', 'Face Battles', 'Info Hub',
]
SLUGS = [
    'hero', 'sign_in', 'coach_intro', 'coach_question',
    'multi_select', 'glow_up_proof', 'structure_analysis', 'face_scan',
    'analysing', 'skin_analysis', 'dashboard', 'paywall',
    'progress_tab', 'scan_history', 'compare', 'routine_tab',
    'exercise_player', 'facecard', 'face_battles', 'info_hub',
]

# Crop boundaries detected from the source presentation sheet.
X_RANGES = [(9, 216), (222, 424), (429, 631), (637, 855)]
Y_RANGES = [(6, 411), (415, 814), (818, 1202), (1206, 1536), (1539, 1820)]
TARGET_SIZE = (1170, 2535)  # exact 9:19.5 ratio

# -----------------------------------------------------------------------------
# Helpers
# -----------------------------------------------------------------------------
def ensure(path: Path) -> Path:
    path.mkdir(parents=True, exist_ok=True)
    return path


def write_text(path: Path, text: str) -> None:
    ensure(path.parent)
    path.write_text(text, encoding='utf-8')


def hex_to_rgb(h: str) -> Tuple[int, int, int]:
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))


def srgb_luminance(hex_color: str) -> float:
    rgb = [c / 255 for c in hex_to_rgb(hex_color)]
    def convert(v: float) -> float:
        return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = [convert(v) for v in rgb]
    return 0.2126*r + 0.7152*g + 0.0722*b


def contrast(a: str, b: str) -> float:
    l1, l2 = sorted([srgb_luminance(a), srgb_luminance(b)], reverse=True)
    return (l1 + 0.05) / (l2 + 0.05)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    path = '/usr/share/fonts/opentype/inter/Inter-Bold.otf' if bold else '/usr/share/fonts/opentype/inter/Inter-Regular.otf'
    return ImageFont.truetype(path, size=size)


def rgba(hex_color: str, alpha: int = 255) -> Tuple[int, int, int, int]:
    return (*hex_to_rgb(hex_color), alpha)

# -----------------------------------------------------------------------------
# Screen exports
# -----------------------------------------------------------------------------
source = Image.open(SRC).convert('RGB')
source_dir = ensure(ROOT / 'source')
screens_source_dir = ensure(ROOT / 'screens' / 'source_crops')
screens_hires_dir = ensure(ROOT / 'screens' / 'hires_png')
screens_thumb_dir = ensure(ROOT / 'screens' / 'thumbnails')

shutil.copy2(SRC, source_dir / 'reference_sheet_20_screens.png')

normalized_screens: List[Image.Image] = []
manifest: List[dict] = []

for row, yr in enumerate(Y_RANGES):
    for col, xr in enumerate(X_RANGES):
        idx = row * 4 + col
        number = idx + 1
        base = f'{number:02d}_{SLUGS[idx]}'
        crop = source.crop((xr[0], yr[0], xr[1], yr[1]))
        crop.save(screens_source_dir / f'{base}_source.png', optimize=False, compress_level=2)

        # The generator compressed lower rows vertically. Normalize every export to
        # a true iPhone 9:19.5 canvas while retaining all visible content.
        norm = crop.resize(TARGET_SIZE, Image.Resampling.LANCZOS)
        norm = ImageEnhance.Sharpness(norm).enhance(1.08)
        norm.save(screens_hires_dir / f'{base}_1170x2535.png', optimize=False, compress_level=2)
        normalized_screens.append(norm)

        thumb = norm.resize((234, 507), Image.Resampling.LANCZOS)
        thumb.save(screens_thumb_dir / f'{base}_thumb.png', optimize=False, compress_level=2)

        manifest.append({
            'number': number,
            'name': SCREEN_NAMES[idx],
            'slug': SLUGS[idx],
            'grid_row': row + 1,
            'grid_column': col + 1,
            'source_crop_px': {'left': xr[0], 'top': yr[0], 'right': xr[1], 'bottom': yr[1]},
            'source_size_px': {'width': crop.width, 'height': crop.height},
            'export_size_px': {'width': TARGET_SIZE[0], 'height': TARGET_SIZE[1]},
            'aspect_ratio': '9:19.5',
            'file': f'screens/hires_png/{base}_1170x2535.png',
        })

write_text(ROOT / 'screens' / 'screen_manifest.json', json.dumps(manifest, indent=2))
with open(ROOT / 'screens' / 'screen_manifest.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['number', 'name', 'slug', 'row', 'column', 'width', 'height', 'file'])
    for m in manifest:
        writer.writerow([m['number'], m['name'], m['slug'], m['grid_row'], m['grid_column'], 1170, 2535, m['file']])

# High-quality normalized contact sheet.
thumb_w, thumb_h = 405, 878
margin, gap = 80, 44
sheet_w = margin*2 + 4*thumb_w + 3*gap
sheet_h = margin*2 + 5*thumb_h + 4*gap
contact = Image.new('RGB', (sheet_w, sheet_h), hex_to_rgb(COLORS['charcoal']))
for i, screen in enumerate(normalized_screens):
    t = screen.resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
    x = margin + (i % 4) * (thumb_w + gap)
    y = margin + (i // 4) * (thumb_h + gap)
    contact.paste(t, (x, y))
contact.save(ROOT / 'screens' / 'contact_sheet_4x5.png', optimize=False, compress_level=2)

# -----------------------------------------------------------------------------
# Reusable raster crops extracted from the normalized screens
# -----------------------------------------------------------------------------
raster_dir = ensure(ROOT / 'assets' / 'raster')
raster_specs = {
    'hero_phone_composite.png': (0, (110, 180, 1080, 1630)),
    'sign_in_editorial_model.png': (1, (0, 0, 1170, 1640)),
    'coach_mascot_reference.png': (2, (250, 210, 930, 1120)),
    'before_after_comparison.png': (5, (85, 550, 1080, 1820)),
    'porcelain_structure_mask.png': (6, (320, 330, 1150, 1510)),
    'face_scan_portrait.png': (7, (120, 650, 1050, 2070)),
    'porcelain_analysis_mask.png': (8, (70, 210, 1110, 1560)),
    'skin_analysis_model.png': (9, (300, 220, 1160, 1350)),
    'dotted_face_preview.png': (10, (560, 160, 1160, 850)),
    'paywall_capsule_clouds.png': (11, (90, 0, 1080, 850)),
    'facecard_sample.png': (17, (55, 320, 1115, 1940)),
    'learn_featured_illustration.png': (19, (20, 330, 1150, 990)),
}
for filename, (screen_idx, box) in raster_specs.items():
    normalized_screens[screen_idx].crop(box).save(raster_dir / filename, optimize=False, compress_level=2)

# -----------------------------------------------------------------------------
# Background and texture assets
# -----------------------------------------------------------------------------
texture_dir = ensure(ROOT / 'assets' / 'textures')
rng = np.random.default_rng(1742)

# Transparent paper grain overlay.
noise = rng.normal(loc=128, scale=20, size=(512, 512)).clip(0, 255).astype(np.uint8)
alpha = np.full((512, 512), 18, dtype=np.uint8)
rgba_noise = np.stack([noise, noise, noise, alpha], axis=-1)
Image.fromarray(rgba_noise, 'RGBA').save(texture_dir / 'paper_grain_overlay_512.png', optimize=False, compress_level=2)

# Bone background with subtle grain.
base = np.zeros((2535, 1170, 3), dtype=np.float32)
base[:] = np.array(hex_to_rgb(COLORS['bone']), dtype=np.float32)
small_noise = rng.normal(0, 1.6, size=(2535, 1170, 1))
base = np.clip(base + small_noise, 0, 255).astype(np.uint8)
Image.fromarray(base, 'RGB').save(texture_dir / 'bone_grain_background_1170x2535.png', optimize=False, compress_level=2)

# White-to-sky-blue chat background.
h, w = 2535, 1170
yy, xx = np.mgrid[0:h, 0:w]
white = np.array(hex_to_rgb('#FFFFFF'), dtype=np.float32)
blue = np.array(hex_to_rgb(COLORS['azure_soft']), dtype=np.float32)
cx, cy = w * 0.55, h * 0.78
sigma_x, sigma_y = w * 0.62, h * 0.34
weight = np.exp(-(((xx-cx)**2)/(2*sigma_x**2) + ((yy-cy)**2)/(2*sigma_y**2)))
weight = np.clip(weight * 0.88, 0, 0.88)[..., None]
chat_bg = white*(1-weight) + blue*weight
chat_bg = np.clip(chat_bg + rng.normal(0, 0.8, (h,w,1)), 0, 255).astype(np.uint8)
Image.fromarray(chat_bg, 'RGB').save(texture_dir / 'chat_glow_background_1170x2535.png', optimize=False, compress_level=2)

# Neutral presentation background.
char = np.zeros((1024, 1024, 3), dtype=np.float32)
char[:] = np.array(hex_to_rgb(COLORS['charcoal']), dtype=np.float32)
char = np.clip(char + rng.normal(0, 1.3, (1024,1024,1)), 0, 255).astype(np.uint8)
Image.fromarray(char, 'RGB').save(texture_dir / 'charcoal_presentation_background_1024.png', optimize=False, compress_level=2)

# -----------------------------------------------------------------------------
# SVG brand assets and icons
# -----------------------------------------------------------------------------
brand_dir = ensure(ROOT / 'assets' / 'brand')
icons_svg_dir = ensure(ROOT / 'assets' / 'icons' / 'svg')
icons_png_root = ensure(ROOT / 'assets' / 'icons' / 'png')

CAPSULE_SVG = '''<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
<defs>
  <linearGradient id="g" x1="90" y1="70" x2="430" y2="450" gradientUnits="userSpaceOnUse">
    <stop stop-color="#7ED1FF"/><stop offset="0.42" stop-color="#2F80FF"/><stop offset="1" stop-color="#1358D4"/>
  </linearGradient>
  <radialGradient id="shine" cx="0" cy="0" r="1" gradientTransform="translate(194 146) rotate(42) scale(245 130)" gradientUnits="userSpaceOnUse">
    <stop stop-color="white" stop-opacity="0.92"/><stop offset="0.52" stop-color="white" stop-opacity="0.18"/><stop offset="1" stop-color="white" stop-opacity="0"/>
  </radialGradient>
  <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="22" stdDeviation="22" flood-color="#2F80FF" flood-opacity="0.28"/></filter>
</defs>
<g transform="rotate(-38 256 256)" filter="url(#shadow)">
  <rect x="92" y="178" width="328" height="156" rx="78" fill="url(#g)"/>
  <path d="M174 190h144c39 0 73 22 90 54-22-19-48-29-78-29H188c-33 0-60 11-83 33 14-35 40-58 69-58Z" fill="url(#shine)"/>
  <rect x="109" y="195" width="294" height="122" rx="61" fill="none" stroke="white" stroke-opacity="0.24" stroke-width="3"/>
</g>
</svg>'''
write_text(brand_dir / 'faceform_capsule.svg', CAPSULE_SVG)
cairosvg.svg2png(bytestring=CAPSULE_SVG.encode(), write_to=str(brand_dir / 'faceform_capsule_512.png'), output_width=512, output_height=512)

MASCOT_SVG = '''<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
<defs>
  <radialGradient id="ball" cx="0" cy="0" r="1" gradientTransform="translate(190 152) rotate(45) scale(360)">
    <stop stop-color="#A8E2FF"/><stop offset="0.33" stop-color="#4AA1FF"/><stop offset="0.7" stop-color="#2F80FF"/><stop offset="1" stop-color="#155BD7"/>
  </radialGradient>
  <radialGradient id="shine" cx="0" cy="0" r="1" gradientTransform="translate(172 132) rotate(41) scale(230 150)">
    <stop stop-color="white" stop-opacity="0.95"/><stop offset="0.52" stop-color="white" stop-opacity="0.18"/><stop offset="1" stop-color="white" stop-opacity="0"/>
  </radialGradient>
  <filter id="shadow" x="-40%" y="-40%" width="180%" height="190%"><feDropShadow dx="0" dy="28" stdDeviation="26" flood-color="#1E66D6" flood-opacity="0.28"/></filter>
</defs>
<ellipse cx="256" cy="428" rx="126" ry="25" fill="#2F80FF" opacity="0.16" filter="url(#shadow)"/>
<circle cx="256" cy="240" r="168" fill="url(#ball)" filter="url(#shadow)"/>
<ellipse cx="205" cy="188" rx="112" ry="82" fill="url(#shine)"/>
<path d="M193 227c0-11 8-19 18-19s18 8 18 19" stroke="#123E90" stroke-width="14" stroke-linecap="round" fill="none"/>
<path d="M283 227c0-11 8-19 18-19s18 8 18 19" stroke="#123E90" stroke-width="14" stroke-linecap="round" fill="none"/>
<path d="M198 282c17 26 38 39 63 39 25 0 47-13 65-39" stroke="#123E90" stroke-width="14" stroke-linecap="round" fill="none"/>
<circle cx="256" cy="240" r="163" fill="none" stroke="white" stroke-opacity="0.24" stroke-width="4"/>
</svg>'''
write_text(brand_dir / 'coach_mascot.svg', MASCOT_SVG)
cairosvg.svg2png(bytestring=MASCOT_SVG.encode(), write_to=str(brand_dir / 'coach_mascot_512.png'), output_width=512, output_height=512)

WORDMARK_SVG = '''<svg xmlns="http://www.w3.org/2000/svg" width="880" height="220" viewBox="0 0 880 220">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#75C8FF"/><stop offset="0.5" stop-color="#2F80FF"/><stop offset="1" stop-color="#155BD7"/></linearGradient></defs>
<g transform="translate(34 24) rotate(-34 82 82)"><rect x="4" y="42" width="156" height="80" rx="40" fill="url(#g)"/><path d="M34 54h60c31 0 51 10 64 29-21-10-43-14-67-14H37c-13 0-23 4-31 10 6-15 16-25 28-25Z" fill="white" opacity=".42"/></g>
<text x="216" y="142" font-family="-apple-system,BlinkMacSystemFont,'SF Pro Display',Inter,Arial,sans-serif" font-size="88" font-weight="700" letter-spacing="-3" fill="#12151B">FaceForm</text>
</svg>'''
write_text(brand_dir / 'faceform_wordmark.svg', WORDMARK_SVG)
cairosvg.svg2png(bytestring=WORDMARK_SVG.encode(), write_to=str(brand_dir / 'faceform_wordmark.png'), output_width=1760, output_height=440)

# Decorative facecard dot pattern.
dots = []
for row in range(10):
    for col in range(10):
        x = 10 + col*12
        y = 10 + row*12
        opacity = max(0.08, min(0.85, (row+col)/18))
        r = 1.1 + ((row+col) % 3) * 0.35
        dots.append(f'<circle cx="{x}" cy="{y}" r="{r:.2f}" fill="#2F80FF" opacity="{opacity:.2f}"/>')
PATTERN_SVG = f'''<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">{''.join(dots)}</svg>'''
write_text(brand_dir / 'facecard_dot_pattern.svg', PATTERN_SVG)

# Scan tick ring.
ticks = []
for i in range(72):
    a = math.radians(i*5)
    x1 = 160 + math.cos(a)*132
    y1 = 160 + math.sin(a)*132
    length = 17 if i % 6 == 0 else 10
    x2 = 160 + math.cos(a)*(132-length)
    y2 = 160 + math.sin(a)*(132-length)
    active = 14 <= i <= 31
    color = COLORS['azure'] if active else COLORS['muted']
    opacity = 1 if active else 0.48
    ticks.append(f'<line x1="{x1:.2f}" y1="{y1:.2f}" x2="{x2:.2f}" y2="{y2:.2f}" stroke="{color}" stroke-width="2" stroke-linecap="round" opacity="{opacity}"/>')
RING_SVG = f'''<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">{''.join(ticks)}</svg>'''
write_text(brand_dir / 'scan_tick_ring.svg', RING_SVG)

# Icon definitions (24x24, currentColor, rounded 1.8px strokes).
ICON_PATHS: Dict[str, str] = {
    'home': '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h5v-5h3v5h5v-9.5"/>',
    'progress': '<path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-7"/><path d="M22 19V3"/>',
    'scan': '<path d="M4 8V5a1 1 0 0 1 1-1h3"/><path d="M16 4h3a1 1 0 0 1 1 1v3"/><path d="M20 16v3a1 1 0 0 1-1 1h-3"/><path d="M8 20H5a1 1 0 0 1-1-1v-3"/><circle cx="12" cy="12" r="3.5"/>',
    'coach': '<path d="M4 5.5h16v11H9l-5 4v-15Z"/><circle cx="9" cy="11" r=".7" fill="currentColor" stroke="none"/><circle cx="12" cy="11" r=".7" fill="currentColor" stroke="none"/><circle cx="15" cy="11" r=".7" fill="currentColor" stroke="none"/>',
    'profile': '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.7-4 3.1-6 7-6s6.3 2 7 6"/>',
    'chevron_left': '<path d="m15 18-6-6 6-6"/>',
    'chevron_right': '<path d="m9 18 6-6-6-6"/>',
    'close': '<path d="m6 6 12 12M18 6 6 18"/>',
    'bell': '<path d="M6 17h12l-1.4-2.2V10a4.6 4.6 0 0 0-9.2 0v4.8L6 17Z"/><path d="M10 20h4"/>',
    'share': '<circle cx="18" cy="5" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="19" r="2"/><path d="m8 11 8-5M8 13l8 5"/>',
    'compare': '<path d="M7 7h10l-2.5-2.5M17 17H7l2.5 2.5"/><path d="M17 7l-2.5 2.5M7 17l2.5-2.5"/>',
    'calendar': '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M7 3v4M17 3v4M3.5 9h17"/>',
    'refresh': '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 5v6h-6"/>',
    'help': '<circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 3.7 2c-.9.6-1.5 1.1-1.5 2.3"/><circle cx="12" cy="17" r=".8" fill="currentColor" stroke="none"/>',
    'viewfinder': '<path d="M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4"/>',
    'check': '<path d="m5 12 4 4L19 6"/>',
    'arrow_up_right': '<path d="M7 17 17 7M9 7h8v8"/>',
    'arrow_right': '<path d="M5 12h14M14 7l5 5-5 5"/>',
    'swap': '<path d="M4 8h13l-3-3M20 16H7l3 3"/><path d="m17 8-3 3M7 16l3-3"/>',
    'camera': '<rect x="3" y="6" width="18" height="14" rx="3"/><path d="M8 6l1.5-2h5L16 6"/><circle cx="12" cy="13" r="4"/>',
    'symmetry': '<path d="M12 3v18"/><path d="M10 5C6.5 6.5 5 9 5 12s1.5 5.5 5 7M14 5c3.5 1.5 5 4 5 7s-1.5 5.5-5 7"/>',
    'jawline': '<path d="M6 4c0 7 2 13 6 16 4-3 6-9 6-16"/><path d="M8 14c2 2 6 2 8 0"/>',
    'cheekbones': '<path d="M4 10c2-4 5-6 8-6s6 2 8 6"/><path d="M5 13c3-2 5-2 7 0 2-2 4-2 7 0"/><path d="M7 16c3 3 7 3 10 0"/>',
    'eye': '<path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5S2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.6"/>',
    'nose': '<path d="M12 4c0 5-1 8-3 11 2 1 4 1 6 0"/><path d="M9 18c2 1 4 1 6 0"/>',
    'skin': '<path d="M7 3h10l3 5-8 13L4 8l3-5Z"/><path d="m4 8 8 2 8-2M12 10v11"/>',
    'posture': '<circle cx="10" cy="5" r="2"/><path d="M10 7v5l4 2 2 6M10 12l-3 3-2 5M10 9l5-2"/>',
    'hydrate': '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/><path d="M9 15c1 1.5 2 2 3.5 2"/>',
    'chin_tuck': '<path d="M8 3c4 0 7 2.5 7 6v2c0 2.2-1 4.5-3 6"/><path d="M8 7c-1 3-1 6 1 8 1 1 2 1.5 3 2"/><path d="M18 10h-5M15 8l-2 2 2 2"/>',
    'tongue': '<path d="M4 6c5 1 11 1 16 0v7c0 5-3.5 8-8 8s-8-3-8-8V6Z"/><path d="M8 12c2 1 6 1 8 0"/>',
    'streak': '<path d="M13 2c1 4-2 5-2 8 0 1.5 1 2.5 2.5 2.5 2 0 3.5-1.8 3.5-4.5 3 3 4 5.5 4 8a9 9 0 0 1-18 0c0-4 2-7 6-10-.3 3 1 5 3 5 2.5 0 2.8-4.8 1-9Z"/>',
    'sparkle': '<path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z"/><path d="m18 14 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z"/>',
    'shield': '<path d="M12 3 5 6v5c0 4.5 2.8 8 7 10 4.2-2 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
    'scan_history': '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2M4 5v4h4"/><path d="M4.5 8A8 8 0 0 1 20 11"/>',
    'article': '<path d="M6 3h9l3 3v15H6V3Z"/><path d="M15 3v4h4M9 11h6M9 15h6"/>',
    'pause': '<path d="M8 5v14M16 5v14"/>',
    'lock': '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    'filter': '<path d="M4 6h16M7 12h10M10 18h4"/>',
    'crown': '<path d="m4 8 4 4 4-7 4 7 4-4-2 10H6L4 8Z"/>',
}

SVG_TEMPLATE = '''<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" color="{color}"><g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">{body}</g></svg>'''

icon_manifest = []
variants = {'azure': COLORS['azure'], 'ink': COLORS['ink'], 'muted': COLORS['body']}
for name, body in ICON_PATHS.items():
    svg = SVG_TEMPLATE.format(color=COLORS['azure'], body=body)
    write_text(icons_svg_dir / f'{name}.svg', svg)
    icon_manifest.append({'name': name, 'svg': f'assets/icons/svg/{name}.svg', 'stroke': 1.8, 'viewBox': '0 0 24 24'})
    for variant, color in variants.items():
        for size in (24, 48, 72):
            out_dir = ensure(icons_png_root / variant / str(size))
            colored_svg = SVG_TEMPLATE.format(color=color, body=body)
            cairosvg.svg2png(bytestring=colored_svg.encode(), write_to=str(out_dir / f'{name}.png'), output_width=size, output_height=size)
write_text(ROOT / 'assets' / 'icons' / 'icon_manifest.json', json.dumps(icon_manifest, indent=2))

# -----------------------------------------------------------------------------
# Design tokens and implementation files
# -----------------------------------------------------------------------------
design_dir = ensure(ROOT / 'design_system')
css_dir = ensure(design_dir / 'css')
swift_dir = ensure(design_dir / 'swiftui')
figma_dir = ensure(design_dir / 'figma')
html_dir = ensure(design_dir / 'html')
fonts_dir = ensure(ROOT / 'fonts')
mock_dir = ensure(ROOT / 'mock_data')
localization_dir = ensure(ROOT / 'localization')

TOKENS = {
    '$schema': 'https://design-tokens.github.io/community-group/format/',
    'meta': {
        'name': 'FaceForm Design System',
        'version': '1.0.0',
        'platform': 'iOS',
        'screen': '1170x2535, 9:19.5',
    },
    'color': {
        'background': {'bone': {'$type':'color','$value':COLORS['bone']}, 'chatGlow': {'$type':'color','$value':COLORS['azure_soft']}},
        'surface': {'primary': {'$type':'color','$value':COLORS['surface']}},
        'text': {'primary': {'$type':'color','$value':COLORS['ink']}, 'secondary': {'$type':'color','$value':COLORS['body']}, 'muted': {'$type':'color','$value':COLORS['muted']}, 'inverse': {'$type':'color','$value':'#FFFFFF'}},
        'brand': {'accent': {'$type':'color','$value':COLORS['azure']}, 'accentPale': {'$type':'color','$value':COLORS['azure_pale']}},
        'line': {'subtle': {'$type':'color','$value':COLORS['border']}},
        'semantic': {'success': {'$type':'color','$value':COLORS['success']}, 'danger': {'$type':'color','$value':COLORS['danger']}, 'ranking': {'$type':'color','$value':COLORS['gold']}, 'skinData': {'$type':'color','$value':COLORS['skin_data']}},
    },
    'font': {
        'family': {'display': {'$type':'fontFamily','$value':'SF Pro Display'}, 'text': {'$type':'fontFamily','$value':'SF Pro Text'}, 'fallback': {'$type':'fontFamily','$value':'Inter, Helvetica Neue, Arial, sans-serif'}},
        'weight': {'regular': {'$type':'fontWeight','$value':400}, 'medium': {'$type':'fontWeight','$value':500}, 'semibold': {'$type':'fontWeight','$value':600}, 'bold': {'$type':'fontWeight','$value':700}},
        'size': {k:{'$type':'dimension','$value':f'{v}px'} for k,v in {'micro':11,'caption':13,'body':15,'button':16,'subhead':20,'title':30,'headline':34,'displayNumber':56}.items()},
        'lineHeight': {k:{'$type':'number','$value':v} for k,v in {'micro':1.25,'caption':1.35,'body':1.6,'button':1.25,'subhead':1.25,'title':1.12,'headline':1.08,'displayNumber':1.0}.items()},
        'tracking': {'micro': {'$type':'dimension','$value':'2px'}, 'headline': {'$type':'dimension','$value':'-0.8px'}},
    },
    'space': {str(v): {'$type':'dimension','$value':f'{v}px'} for v in [4,8,12,16,20,24,28,32,40,48,56,64]},
    'radius': {'small': {'$type':'dimension','$value':'12px'}, 'medium': {'$type':'dimension','$value':'16px'}, 'card': {'$type':'dimension','$value':'24px'}, 'sheet': {'$type':'dimension','$value':'32px'}, 'pill': {'$type':'dimension','$value':'999px'}},
    'shadow': {'card': {'$type':'shadow','$value':{'color':'#14182014','offsetX':'0px','offsetY':'12px','blur':'32px','spread':'0px'}}, 'chip': {'$type':'shadow','$value':{'color':'#1418200F','offsetX':'0px','offsetY':'6px','blur':'18px','spread':'0px'}}, 'accentGlow': {'$type':'shadow','$value':{'color':'#2F80FF38','offsetX':'0px','offsetY':'10px','blur':'28px','spread':'0px'}}},
    'component': {
        'primaryButton': {'height': {'$type':'dimension','$value':'56px'}, 'radius': {'$type':'dimension','$value':'999px'}, 'background': {'$type':'color','$value':COLORS['ink']}, 'label': {'$type':'color','$value':'#FFFFFF'}},
        'chip': {'height': {'$type':'dimension','$value':'44px'}, 'radius': {'$type':'dimension','$value':'999px'}, 'background': {'$type':'color','$value':'#FFFFFF'}, 'border': {'$type':'color','$value':COLORS['border']}},
        'card': {'radius': {'$type':'dimension','$value':'24px'}, 'padding': {'$type':'dimension','$value':'20px'}},
        'tabBar': {'height': {'$type':'dimension','$value':'84px'}, 'scanButton': {'$type':'dimension','$value':'58px'}},
    },
}
write_text(design_dir / 'design_tokens.json', json.dumps(TOKENS, indent=2))

# Tokens Studio-compatible simplified format.
tokens_studio = {
    'global': {
        'color': {k:{'value':v,'type':'color'} for k,v in {
            'bone': COLORS['bone'], 'surface': COLORS['surface'], 'ink': COLORS['ink'],
            'body': COLORS['body'], 'border': COLORS['border'], 'azure': COLORS['azure'],
            'chatGlow': COLORS['azure_soft'], 'success': COLORS['success'], 'danger': COLORS['danger']
        }.items()},
        'radius': {k:{'value':f'{v}px','type':'borderRadius'} for k,v in {'small':12,'medium':16,'card':24,'sheet':32,'pill':999}.items()},
        'spacing': {str(v):{'value':f'{v}px','type':'spacing'} for v in [4,8,12,16,20,24,28,32,40,48,56,64]},
    },
    'ios': {
        'typography': {
            'headline': {'value':{'fontFamily':'SF Pro Display','fontWeight':'700','fontSize':'34px','lineHeight':'108%','letterSpacing':'-0.8px'},'type':'typography'},
            'body': {'value':{'fontFamily':'SF Pro Text','fontWeight':'400','fontSize':'15px','lineHeight':'160%','letterSpacing':'0px'},'type':'typography'},
            'button': {'value':{'fontFamily':'SF Pro Text','fontWeight':'600','fontSize':'16px','lineHeight':'125%','letterSpacing':'0px'},'type':'typography'},
        }
    }
}
write_text(design_dir / 'tokens_studio.json', json.dumps(tokens_studio, indent=2))

CSS_TOKENS = f''':root {{
  --ff-bg-bone: {COLORS['bone']};
  --ff-bg-chat-glow: {COLORS['azure_soft']};
  --ff-surface: #FFFFFF;
  --ff-ink: {COLORS['ink']};
  --ff-body: {COLORS['body']};
  --ff-muted: {COLORS['muted']};
  --ff-line: {COLORS['border']};
  --ff-accent: {COLORS['azure']};
  --ff-accent-pale: {COLORS['azure_pale']};
  --ff-success: {COLORS['success']};
  --ff-danger: {COLORS['danger']};
  --ff-gold: {COLORS['gold']};
  --ff-font-display: "SF Pro Display", Inter, "Helvetica Neue", Arial, sans-serif;
  --ff-font-text: "SF Pro Text", Inter, "Helvetica Neue", Arial, sans-serif;
  --ff-radius-card: 24px;
  --ff-radius-sheet: 32px;
  --ff-radius-pill: 999px;
  --ff-shadow-card: 0 12px 32px rgba(20, 24, 32, 0.08);
  --ff-shadow-chip: 0 6px 18px rgba(20, 24, 32, 0.06);
  --ff-shadow-accent: 0 10px 28px rgba(47, 128, 255, 0.22);
}}
'''
write_text(css_dir / 'faceform-tokens.css', CSS_TOKENS)

CSS_COMPONENTS = '''.ff-screen {
  min-height: 100dvh;
  background: var(--ff-bg-bone);
  color: var(--ff-ink);
  font-family: var(--ff-font-text);
}
.ff-screen--chat {
  background: radial-gradient(80% 45% at 55% 78%, var(--ff-bg-chat-glow) 0%, #fff 76%);
}
.ff-headline {
  margin: 0;
  font-family: var(--ff-font-display);
  font-size: 34px;
  line-height: 1.08;
  letter-spacing: -0.8px;
  font-weight: 700;
}
.ff-headline__accent { color: var(--ff-accent); }
.ff-body { color: var(--ff-body); font-size: 15px; line-height: 1.6; }
.ff-card { background: #fff; border-radius: var(--ff-radius-card); box-shadow: var(--ff-shadow-card); }
.ff-chip {
  min-height: 44px; padding: 0 16px; display: inline-flex; align-items: center; gap: 10px;
  border: 1px solid var(--ff-line); border-radius: var(--ff-radius-pill); background: #fff;
  box-shadow: var(--ff-shadow-chip); font-weight: 500;
}
.ff-chip[aria-selected="true"] { border-color: var(--ff-accent); box-shadow: var(--ff-shadow-accent); }
.ff-button-primary {
  width: 100%; min-height: 56px; border: 0; border-radius: var(--ff-radius-pill);
  background: var(--ff-ink); color: #fff; font-size: 16px; font-weight: 600;
}
.ff-progress { height: 4px; border-radius: 999px; overflow: hidden; background: #E7E9EE; }
.ff-progress > span { display: block; height: 100%; border-radius: inherit; background: var(--ff-accent); }
'''
write_text(css_dir / 'faceform-components.css', CSS_COMPONENTS)

SWIFT_TOKENS = f'''import SwiftUI

public enum FaceFormTheme {{
    public static let bone = Color(hex: "{COLORS['bone']}")
    public static let surface = Color.white
    public static let ink = Color(hex: "{COLORS['ink']}")
    public static let body = Color(hex: "{COLORS['body']}")
    public static let muted = Color(hex: "{COLORS['muted']}")
    public static let line = Color(hex: "{COLORS['border']}")
    public static let azure = Color(hex: "{COLORS['azure']}")
    public static let chatGlow = Color(hex: "{COLORS['azure_soft']}")
    public static let success = Color(hex: "{COLORS['success']}")
    public static let danger = Color(hex: "{COLORS['danger']}")

    public static let cardRadius: CGFloat = 24
    public static let sheetRadius: CGFloat = 32
    public static let buttonHeight: CGFloat = 56
    public static let tabBarHeight: CGFloat = 84

    public static let screenPadding: CGFloat = 20
    public static let cardPadding: CGFloat = 20

    public static func headline(_ size: CGFloat = 34) -> Font {{ .system(size: size, weight: .bold, design: .default) }}
    public static let title = Font.system(size: 30, weight: .bold)
    public static let bodyFont = Font.system(size: 15, weight: .regular)
    public static let buttonFont = Font.system(size: 16, weight: .semibold)
    public static let micro = Font.system(size: 11, weight: .semibold)
}}

public extension Color {{
    init(hex: String) {{
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let r, g, b: UInt64
        switch hex.count {{
        case 3: (r, g, b) = ((int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        default: (r, g, b) = (int >> 16, int >> 8 & 0xFF, int & 0xFF)
        }}
        self.init(.sRGB, red: Double(r)/255, green: Double(g)/255, blue: Double(b)/255, opacity: 1)
    }}
}}
'''
write_text(swift_dir / 'FaceFormTokens.swift', SWIFT_TOKENS)

SWIFT_COMPONENTS = '''import SwiftUI

public struct FFPrimaryButton: View {
    let title: String
    let action: () -> Void

    public init(_ title: String, action: @escaping () -> Void) {
        self.title = title
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            Text(title)
                .font(FaceFormTheme.buttonFont)
                .foregroundStyle(.white)
                .frame(maxWidth: .infinity)
                .frame(height: FaceFormTheme.buttonHeight)
                .background(FaceFormTheme.ink)
                .clipShape(Capsule())
        }
        .buttonStyle(.plain)
    }
}

public struct FFCard<Content: View>: View {
    @ViewBuilder let content: Content

    public init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    public var body: some View {
        content
            .padding(FaceFormTheme.cardPadding)
            .background(.white)
            .clipShape(RoundedRectangle(cornerRadius: FaceFormTheme.cardRadius, style: .continuous))
            .shadow(color: Color.black.opacity(0.08), radius: 16, x: 0, y: 12)
    }
}

public struct FFChip: View {
    let title: String
    var selected = false

    public var body: some View {
        Text(title)
            .font(.system(size: 14, weight: .medium))
            .foregroundStyle(FaceFormTheme.ink)
            .padding(.horizontal, 16)
            .frame(minHeight: 44)
            .background(.white)
            .clipShape(Capsule())
            .overlay(Capsule().stroke(selected ? FaceFormTheme.azure : FaceFormTheme.line, lineWidth: selected ? 1.5 : 1))
            .shadow(color: selected ? FaceFormTheme.azure.opacity(0.20) : Color.black.opacity(0.05), radius: selected ? 14 : 9, y: 6)
    }
}

public struct FFProgressBar: View {
    let progress: Double

    public var body: some View {
        GeometryReader { proxy in
            ZStack(alignment: .leading) {
                Capsule().fill(Color(hex: "E7E9EE"))
                Capsule().fill(FaceFormTheme.azure).frame(width: proxy.size.width * max(0, min(progress, 1)))
            }
        }
        .frame(height: 4)
    }
}
'''
write_text(swift_dir / 'FaceFormComponents.swift', SWIFT_COMPONENTS)

# -----------------------------------------------------------------------------
# Documentation
# -----------------------------------------------------------------------------
contrast_rows = [
    ('Ink on bone', COLORS['ink'], COLORS['bone']),
    ('Body gray on bone', COLORS['body'], COLORS['bone']),
    ('White on ink', '#FFFFFF', COLORS['ink']),
    ('Azure on white', COLORS['azure'], '#FFFFFF'),
    ('White on azure', '#FFFFFF', COLORS['azure']),
    ('Ink on azure pale', COLORS['ink'], COLORS['azure_pale']),
]
contrast_md = '\n'.join(f'| {name} | `{fg}` | `{bg}` | {contrast(fg,bg):.2f}:1 |' for name,fg,bg in contrast_rows)

COLORS_MD = f'''# FaceForm color system

## Brand palette

| Token | Hex | Role |
|---|---:|---|
| Bone background | `{COLORS['bone']}` | Default screen background |
| Surface | `#FFFFFF` | Cards, chips, sheets |
| Ink | `{COLORS['ink']}` | Primary text and matte-black CTA |
| Body gray | `{COLORS['body']}` | Supporting copy |
| Subtle line | `{COLORS['border']}` | Chip borders and dividers |
| Azure accent | `{COLORS['azure']}` | One highlighted word, active states, progress |
| Chat glow | `{COLORS['azure_soft']}` | Lower-half radial glow on coach screens |

Azure should remain below roughly 10% of any screen. Functional success, danger, ranking-gold, and skin-data colors are reserved for meaning and should never become decorative brand accents.

## Recommended combinations and contrast

| Combination | Foreground | Background | WCAG contrast |
|---|---:|---:|---:|
{contrast_md}

`#2F80FF` on white is best for large or semibold text, icons, progress, and borders. Keep small body copy in ink or body gray.
'''
write_text(design_dir / 'colors.md', COLORS_MD)

TYPO_MD = '''# Typography system

## Font stack

- **iOS display:** SF Pro Display via SwiftUI `.system`.
- **iOS body:** SF Pro Text via SwiftUI `.system`.
- **Cross-platform fallback:** Inter, Helvetica Neue, Arial, sans-serif.

No font binaries are included in this kit. SF Pro ships with Apple platforms and is subject to Apple’s license. Install Inter separately for web or non-Apple prototypes.

## Scale

| Style | Size / line-height | Weight | Tracking | Use |
|---|---:|---:|---:|---|
| Hero headline | 34 / 37 px | 700 | -0.8 px | Primary onboarding statements |
| Screen title | 30 / 34 px | 700 | -0.5 px | Main-app titles |
| Subhead | 20 / 25 px | 600 | -0.2 px | Card headings |
| Body | 15 / 24 px | 400 | 0 | Supporting copy |
| Button | 16 / 20 px | 600 | 0 | Primary CTA labels |
| Caption | 13 / 18 px | 400–500 | 0 | Metadata and helper text |
| Micro label | 11 / 14 px | 600 | +2 px | Uppercase section labels |
| Display number | 56 / 56 px | 700 | -1.5 px | Scores and timers |

Use sentence case. Apply azure to no more than one or two meaningful words per headline; never use a text gradient.
'''
write_text(design_dir / 'typography.md', TYPO_MD)

SPACING_MD = '''# Spacing, geometry, and layout

- Base spacing unit: **4 px**.
- Standard horizontal screen inset: **20 px**.
- Card internal padding: **20 px**.
- Vertical section gap: **24–32 px**.
- Card corner radius: **24 px**.
- Bottom-sheet radius: **32 px**.
- Pills: fully rounded, `999 px` radius.
- Primary button: **56 px** high.
- Standard chip: **44 px** high.
- Main tab bar: **84 px** high including safe-area treatment.
- Center scan control: **58 px** black circle.
- Reference export: **1170 × 2535 px**, exact **9:19.5**.

Keep content aligned to a 4-point grid. Main-app screens should reserve the bottom safe area for the persistent tab bar.
'''
write_text(design_dir / 'spacing_and_layout.md', SPACING_MD)

COMPONENTS_MD = '''# Component rules

## Primary CTA
Full-width matte ink pill, 56 px high, white semibold label. No gradient. Optional azure underglow is limited to analysis-completion contexts.

## Cards
Pure white surface, 24 px continuous radius, no visible border, soft `0 12 32 rgba(20,24,32,.08)` shadow.

## Chips
White pill, 1 px warm-gray border, 44 px minimum height. Selected state uses a 1.5 px azure border and restrained azure glow; text remains ink.

## Coach bubbles
Coach messages are white cards with soft shadow. User messages are azure with white text and right alignment. Preserve generous vertical whitespace.

## Progress
Use a 4 px rounded track with an azure fill. Segmented onboarding progress uses equal-width sections and subtle inactive gray.

## Data visuals
Use thin radial gauges and rounded bars. Avoid dense chart furniture. Scores use large ink numerals; azure highlights only active or improving data.

## Tab bar
Five destinations: Home, Progress, center Scan, Coach, Profile. Active destination is azure; inactive icons are muted gray. Center scan is always a matte-black circular control.
'''
write_text(design_dir / 'components.md', COMPONENTS_MD)

ACCESS_MD = '''# Accessibility notes

- Keep body text at 15 px or larger and maintain at least 4.5:1 contrast for normal text.
- Azure `#2F80FF` on white is suited to large/bold text, icons, borders, and progress. Avoid using it for long small-copy passages.
- Never encode score change by color alone; pair green/red with arrows and signed values.
- Give every icon a text accessibility label. Decorative porcelain masks and grain textures should be hidden from assistive technologies.
- Maintain 44 × 44 pt minimum touch targets, including tab items, back controls, compare handles, and quick-reply chips.
- Respect Reduce Motion for mascot bounce, scan ring animation, rotating analysis masks, and chart transitions.
'''
write_text(design_dir / 'accessibility.md', ACCESS_MD)

FONT_NOTE = '''# Font package note

This directory intentionally contains no font binaries.

Use Apple’s system typography on iOS:

```swift
Font.system(size: 34, weight: .bold)
```

For web or cross-platform prototypes, use the documented fallback stack:

```css
font-family: "SF Pro Display", Inter, "Helvetica Neue", Arial, sans-serif;
```

Obtain and license any non-system font directly from its publisher. Do not redistribute Apple font files.
'''
write_text(fonts_dir / 'README.md', FONT_NOTE)

FIGMA_MD = '''# Figma setup

1. Create a 1170 × 2535 frame preset named **FaceForm / iPhone 9:19.5**.
2. Import `design_system/tokens_studio.json` through Tokens Studio, or create local variables from `design_tokens.json`.
3. Create text styles from `typography.md` using SF Pro Display/Text.
4. Import SVG icons from `assets/icons/svg`; they use `currentColor` and remain recolorable.
5. Use 20 px screen insets, 24 px card radii, 56 px CTAs, and the 4 px spacing grid.
6. Place `paper_grain_overlay_512.png` above bone backgrounds at 3–5% opacity using Soft Light.
7. Use `chat_glow_background_1170x2535.png` for coach-chat frames.
8. The screen PNGs are raster references. Rebuild UI text and components with the included copy deck and tokens for production-editable layouts.
'''
write_text(figma_dir / 'Figma_Setup.md', FIGMA_MD)

# -----------------------------------------------------------------------------
# Screen specs and copy deck
# -----------------------------------------------------------------------------
screen_specs = [
    {'id':1,'name':'Hero','category':'Onboarding','headline':'Unlock your best face','accentWords':['Unlock','best'],'cta':'Get Started','keyComponents':['Capsule logo','FaceForm wordmark','Floating scan-phone artwork','Black primary CTA']},
    {'id':2,'name':'Sign-In','category':'Onboarding','headline':'Sign in to start your face analysis','cta':'Continue with Apple','secondary':'Continue without an account','keyComponents':['Editorial profile photo','Four metric callouts','Bottom sheet','Privacy note']},
    {'id':3,'name':'Coach Intro','category':'Onboarding','headline':'Hey 👋 / I’m FaceForm Coach / What should I call you?','cta':'Send name','keyComponents':['Gel-ball mascot','Chat glow background','Name field','Azure send button']},
    {'id':4,'name':'Coach Question','category':'Onboarding','headline':'What is holding you back?','cta':'Continue','keyComponents':['Coach header','Segmented progress','Two coach bubbles','Five quick-reply chips']},
    {'id':5,'name':'Multi-Select','category':'Onboarding','headline':'What do you actually want to work on?','cta':'Done ✓','keyComponents':['Coach bubble','User answer bubble','Two-column multi-select chips']},
    {'id':6,'name':'Glow-Up Proof','category':'Onboarding','headline':'Real glow-up results','accentWords':['results'],'cta':'Continue','keyComponents':['Progress header','Before/after drag card','Stat tiles','Testimonial']},
    {'id':7,'name':'Structure Analysis','category':'Analysis','headline':'Structure analysis','cta':'Continue','keyComponents':['Large score','Porcelain mask','Landmark callout','Metric chips','Structure/Skin segment']},
    {'id':8,'name':'Face Scan','category':'Scan','headline':'Hold still — starting in 3','keyComponents':['Help/refresh buttons','Organic selfie mask','Radial capture ticks','Instruction caption']},
    {'id':9,'name':'Analysing','category':'Scan','headline':'Analysing your scan','keyComponents':['Porcelain mask','Two progress rows','Time estimate']},
    {'id':10,'name':'Skin Analysis','category':'Analysis','headline':'Skin analysis','cta':'Analyze my results','keyComponents':['Texture score','Model contour overlay','Metric chips','Regional gauges','Suggestion card']},
    {'id':11,'name':'Dashboard','category':'Main App','headline':'Good afternoon, Abhinay.','keyComponents':['Score hero card','2×2 bento grid','Routine preview','Main tab bar']},
    {'id':12,'name':'Paywall','category':'Monetization','headline':'Unlock All Features with Pro','cta':'CONTINUE →','keyComponents':['Cloud hero','Capsule logo','Benefit checklist','Plan selector','Legal footer']},
    {'id':13,'name':'Progress Tab','category':'Main App','headline':'Your Progress','keyComponents':['Progress/Calendar segment','Stat tiles','Calendar','Trend chart','Tab bar']},
    {'id':14,'name':'Scan History','category':'Main App','headline':'Previous scans','keyComponents':['Filter chips','Scan rows','Score badges','Compare link','Tab bar']},
    {'id':15,'name':'Compare','category':'Main App','headline':'Compare','cta':'Share progress','keyComponents':['Date selectors','Before/after drag card','Delta rows','Dual bars']},
    {'id':16,'name':'Routine Tab','category':'Main App','headline':'Routine','cta':'Resume session →','keyComponents':['Morning/Evening segment','Azure routine hero','Exercise checklist','Tab bar']},
    {'id':17,'name':'Exercise Player','category':'Training','headline':'Chin tucks','cta':'Pause','keyComponents':['Close control','Exercise position label','Line illustration','Ring timer','Skip action']},
    {'id':18,'name':'FaceCard','category':'Social','headline':'Your FaceCard','cta':'Share card','secondary':'Customize','keyComponents':['Share icon','Premium score card','Micro stats','Streak','Wordmark']},
    {'id':19,'name':'Face Battles','category':'Social','headline':'Battles','cta':'Challenge a friend','keyComponents':['Global/Friends segment','Top-three podium','Leaderboard rows','Highlighted user rank','Tab bar']},
    {'id':20,'name':'Info Hub','category':'Content','headline':'Learn','keyComponents':['Category chips','Featured article','Two-column article grid','Tab bar']},
]
write_text(design_dir / 'screen_specs.json', json.dumps(screen_specs, indent=2, ensure_ascii=False))

spec_md_lines = ['# Screen inventory', '', '| # | Screen | Category | Primary action |', '|---:|---|---|---|']
for s in screen_specs:
    spec_md_lines.append(f"| {s['id']} | {s['name']} | {s['category']} | {s.get('cta','—')} |")
spec_md_lines.extend(['', 'Detailed component lists and copy are available in `screen_specs.json` and `copy_deck.csv`.'])
write_text(design_dir / 'screen_specs.md', '\n'.join(spec_md_lines))

copy_rows = [
    (1,'wordmark','FaceForm'),(1,'headline','Unlock your best face'),(1,'cta','Get Started'),
    (2,'title','Sign in to start your face analysis'),(2,'cta','Continue with Apple'),(2,'secondary','Continue without an account'),(2,'privacy','Your scan data stays private.'),
    (2,'metric','Symmetry 95 · 92 · 3.0°'),(2,'metric','Cheekbones — High & angular'),(2,'metric','Jaw — 118°'),(2,'metric','Neck & chin — Defined'),
    (3,'headline','Hey 👋'),(3,'headline','I’m FaceForm Coach'),(3,'headline','What should I call you?'),(3,'placeholder','Type your name…'),
    (4,'bubble','But first I need to know what you’re actually trying to achieve.'),(4,'bubble','So, what’s the main thing holding you back right now?'),
    (4,'chip','📊 I can’t see my progress'),(4,'chip','😕 I’m unsure what to improve'),(4,'chip','🧭 I don’t know where to start'),(4,'chip','📚 Too much conflicting info'),(4,'chip','🔋 I lack motivation'),(4,'cta','Continue'),
    (5,'bubble','What do you actually want to work on?'),(5,'userBubble','📊 I can’t see my progress ✓'),(5,'chip','💪 Jawline'),(5,'chip','💎 Cheekbones'),(5,'chip','👤 Side profile'),(5,'chip','⚖️ Symmetry'),(5,'chip','👃 Nose'),(5,'chip','👁 Eye area'),(5,'cta','Done ✓'),
    (6,'headline','Real glow-up results'),(6,'caption','Luke S. · 19 · drag to compare'),(6,'quote','Better angles, stronger jawline — real change.'),(6,'cta','Continue'),
    (7,'title','Structure analysis'),(7,'score','82 /100'),(7,'rank','Top 14%'),(7,'callout','Jawline 121° · Top 18%'),(7,'cta','Continue'),
    (8,'title','Hold still — starting in'),(8,'countdown','3'),(8,'caption','Move your head in a circle to capture every angle.'),
    (9,'title','Analysing your scan'),(9,'progress','Taking measurements — 24%'),(9,'progress','Analysing skin — 0%'),(9,'footnote','This may take up to 30 seconds.'),
    (10,'title','Skin analysis'),(10,'score','Texture 68 /100'),(10,'status','GOOD'),(10,'suggestion','Use gentle exfoliation 2–3×/week'),(10,'cta','Analyze my results'),
    (11,'greeting','Good afternoon, Abhinay.'),(11,'tile','DAILY SCAN — Start →'),(11,'tile','PROGRESS +7 ↗ structure · 30d'),(11,'tile','ROUTINE 3/5 Completed Today'),(11,'tile','ASK — What am I doing wrong?'),
    (12,'title','Unlock All Features with Pro'),(12,'plan','YEARLY $39.99/yr'),(12,'plan','WEEKLY $12.99/wk'),(12,'cta','CONTINUE →'),
    (13,'title','Your Progress'),(13,'segment','Progress'),(13,'segment','Calendar'),(13,'chart','Structure trend'),
    (14,'title','Previous scans'),(14,'action','Compare'),
    (15,'title','Compare'),(15,'delta','Jawline 74 → 76 +2'),(15,'delta','Symmetry 91 → 91 0'),(15,'delta','Skin texture 64 → 68 +4'),(15,'cta','Share progress'),
    (16,'title','Routine'),(16,'caption','Complete your sets to keep your streak alive.'),(16,'cta','Resume session →'),
    (17,'label','JAW CIRCUIT · 2 OF 5'),(17,'title','Chin tucks'),(17,'instruction','Pull your chin straight back, hold, release. Keep shoulders relaxed.'),(17,'timer','0:42'),(17,'cta','Pause'),(17,'secondary','Skip exercise'),
    (18,'title','Your FaceCard'),(18,'name','ABHINAY'),(18,'score','82'),(18,'cta','Share card'),(18,'secondary','Customize'),
    (19,'title','Battles'),(19,'segment','Global'),(19,'segment','Friends'),(19,'cta','Challenge a friend'),
    (20,'title','Learn'),(20,'featured','Why jaw angle matters — 4 min read'),(20,'article','Mewing, explained'),(20,'article','Fix forward head posture'),(20,'article','The science of symmetry'),(20,'article','Skincare basics'),
]
with open(design_dir / 'copy_deck.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['screen_id','element','copy'])
    writer.writerows(copy_rows)

# Localization JSON.
localization = {f'screen_{sid:02d}': {} for sid in range(1,21)}
for sid, element, copy in copy_rows:
    key = element
    existing = localization[f'screen_{sid:02d}'].get(key)
    if existing is None:
        localization[f'screen_{sid:02d}'][key] = copy
    elif isinstance(existing, list):
        existing.append(copy)
    else:
        localization[f'screen_{sid:02d}'][key] = [existing, copy]
write_text(localization_dir / 'en.json', json.dumps(localization, indent=2, ensure_ascii=False))

# Mock datasets.
mock_data = {
    'dashboard.json': {
        'user': {'name':'Abhinay','score':82,'percentile':14,'streakDays':22},
        'progress': {'structureDelta30d':7},
        'routine': {'completed':3,'total':5,'items':[{'name':'Mewing hold','detail':'1m 30s','done':True},{'name':'Hydrate','detail':'Drink 2L today','done':True},{'name':'Jaw circuit','detail':'5 exercises','done':False},{'name':'Chin tucks','detail':'3 sets','done':False}]}
    },
    'scan_history.json': {'scans':[{'date':'2026-04-14T07:42:00','score':82,'jaw':89,'symmetry':94,'delta':2},{'date':'2026-04-13T08:15:00','score':80,'jaw':87,'symmetry':92,'delta':1},{'date':'2026-04-11T07:50:00','score':79,'jaw':86,'symmetry':92,'delta':0},{'date':'2026-04-09T07:30:00','score':78,'jaw':83,'symmetry':90,'delta':-1},{'date':'2026-04-07T08:02:00','score':79,'jaw':81,'symmetry':89,'delta':0},{'date':'2026-04-04T07:45:00','score':77,'jaw':79,'symmetry':88,'delta':-2}]},
    'routine.json': {'period':'Morning','durationMinutes':19,'exercises':[{'name':'Mewing hold','duration':'1m 30s','done':True},{'name':'Hydrate','duration':'Drink 2L today','done':True},{'name':'Jaw circuit','duration':'5 exercises','done':False},{'name':'Chin tucks','duration':'3 sets','done':False},{'name':'Tongue posture','duration':'10 min','done':False}]},
    'leaderboard.json': {'scope':'Global','leaders':[{'rank':1,'name':'Alex M.','score':94},{'rank':2,'name':'Daniel K.','score':91},{'rank':3,'name':'Ryan T.','score':89}], 'user':{'rank':1204,'name':'Abhinay','score':82,'change':3}},
    'progress_calendar.json': {'month':'2026-07','streakDays':22,'best':'2026-04-17','scans':34,'scanDays':[1,3,4,6,8,9,11,13,14,15,17,18,20,22,23,24,26,27,29,31], 'trend':[74,75,77,76,79,78,79,80,80,81,81,82]},
}
for filename, data in mock_data.items():
    write_text(mock_dir / filename, json.dumps(data, indent=2))

# -----------------------------------------------------------------------------
# Self-contained HTML design-system preview
# -----------------------------------------------------------------------------
html_swatches = ''.join(f'<div class="swatch"><span style="background:{v}"></span><b>{k}</b><code>{v}</code></div>' for k,v in [('Bone',COLORS['bone']),('Surface','#FFFFFF'),('Ink',COLORS['ink']),('Body',COLORS['body']),('Border',COLORS['border']),('Azure',COLORS['azure']),('Chat glow',COLORS['azure_soft'])])
HTML = f'''<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>FaceForm Design System</title><style>
:root{{--bone:{COLORS['bone']};--ink:{COLORS['ink']};--body:{COLORS['body']};--line:{COLORS['border']};--azure:{COLORS['azure']};}}
*{{box-sizing:border-box}}body{{margin:0;background:#25272B;color:var(--ink);font-family:Inter,-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif}}main{{max-width:1180px;margin:0 auto;padding:72px 32px}}.hero{{background:var(--bone);border-radius:40px;padding:56px;box-shadow:0 28px 80px rgba(0,0,0,.22)}}h1{{font-size:52px;line-height:1.02;letter-spacing:-2px;margin:0 0 18px}}h1 em{{color:var(--azure);font-style:normal}}p{{color:var(--body);font-size:16px;line-height:1.65}}h2{{margin:56px 0 20px;font-size:28px}}.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px}}.swatch{{background:#fff;border-radius:22px;padding:14px;box-shadow:0 12px 32px rgba(20,24,32,.08)}}.swatch span{{display:block;height:92px;border-radius:14px;margin-bottom:12px;border:1px solid rgba(0,0,0,.04)}}.swatch b,.swatch code{{display:block}}.swatch code{{color:var(--body);margin-top:4px}}.components{{display:grid;grid-template-columns:1fr 1fr;gap:18px}}.card{{background:#fff;border-radius:24px;padding:24px;box-shadow:0 12px 32px rgba(20,24,32,.08)}}button{{border:0;background:var(--ink);color:white;height:56px;border-radius:999px;padding:0 30px;font-weight:700;font-size:16px;width:100%}}.chip{{display:inline-flex;height:44px;align-items:center;padding:0 16px;border-radius:999px;background:#fff;border:1px solid var(--line);box-shadow:0 6px 18px rgba(20,24,32,.06);margin:4px}}.chip.active{{border:1.5px solid var(--azure);box-shadow:0 10px 28px rgba(47,128,255,.2)}}.type div{{margin:14px 0}}.micro{{font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700}}.headline{{font-size:34px;line-height:1.08;font-weight:800;letter-spacing:-.8px}}.body{{font-size:15px;line-height:1.6;color:var(--body)}}footer{{color:#A4A9B2;text-align:center;padding:30px}}</style></head><body><main><section class="hero"><h1>FaceForm <em>design system</em></h1><p>Implementation-ready tokens, icons, flat screen exports, reusable assets, and component guidance for the 20-screen FaceForm iOS experience.</p><h2>Color</h2><div class="grid">{html_swatches}</div><h2>Typography</h2><div class="card type"><div class="micro">DEMO SCAN</div><div class="headline">Unlock your <span style="color:var(--azure)">best</span> face</div><div class="body">AI face analysis designed around calm hierarchy, precise data, and generous whitespace.</div></div><h2>Components</h2><div class="components"><div class="card"><button>Analyze my results</button></div><div class="card"><span class="chip">Structure</span><span class="chip active">Calendar</span><span class="chip">Skin</span></div></div></section><footer>FaceForm UI Design Kit · v1.0</footer></main></body></html>'''
write_text(html_dir / 'faceform_design_system.html', HTML)

# -----------------------------------------------------------------------------
# Design-system overview image
# -----------------------------------------------------------------------------
overview = Image.new('RGB', (2400, 1600), hex_to_rgb(COLORS['charcoal']))
d = ImageDraw.Draw(overview)
card = (100, 90, 2300, 1510)
d.rounded_rectangle(card, radius=50, fill=hex_to_rgb(COLORS['bone']))
d.text((180, 170), 'FaceForm design system', font=font(64, True), fill=hex_to_rgb(COLORS['ink']))
d.text((180, 250), 'Color, typography, components, icons, and implementation tokens', font=font(27), fill=hex_to_rgb(COLORS['body']))
# swatches
swatches=[('Bone',COLORS['bone']),('White','#FFFFFF'),('Ink',COLORS['ink']),('Body',COLORS['body']),('Line',COLORS['border']),('Azure',COLORS['azure']),('Glow',COLORS['azure_soft'])]
start_x, sw_y=180, 360
for i,(label,col) in enumerate(swatches):
    x=start_x+i*285
    d.rounded_rectangle((x,sw_y,x+245,sw_y+210),radius=24,fill=(255,255,255),outline=(230,228,222))
    d.rounded_rectangle((x+18,sw_y+18,x+227,sw_y+132),radius=18,fill=hex_to_rgb(col),outline=(225,225,225))
    d.text((x+20,sw_y+148),label,font=font(22,True),fill=hex_to_rgb(COLORS['ink']))
    d.text((x+20,sw_y+178),col,font=font(18),fill=hex_to_rgb(COLORS['body']))
# type samples
d.text((180, 670), 'TYPOGRAPHY', font=font(20,True), fill=hex_to_rgb(COLORS['body']))
d.text((180, 720), 'Unlock your', font=font(76,True), fill=hex_to_rgb(COLORS['ink']))
d.text((666, 720), 'best', font=font(76,True), fill=hex_to_rgb(COLORS['azure']))
d.text((840, 720), 'face', font=font(76,True), fill=hex_to_rgb(COLORS['ink']))
d.text((180, 825), 'AI face analysis designed around calm hierarchy, precise data, and generous whitespace.', font=font(28), fill=hex_to_rgb(COLORS['body']))
# component cards
d.text((180, 930), 'COMPONENTS', font=font(20,True), fill=hex_to_rgb(COLORS['body']))
# button
d.rounded_rectangle((180,990,980,1110),radius=60,fill=hex_to_rgb(COLORS['ink']))
btn='Analyze my results'; bbox=d.textbbox((0,0),btn,font=font(30,True)); d.text(((180+980-(bbox[2]-bbox[0]))/2,1028),btn,font=font(30,True),fill='white')
# chips
for i,(label,active) in enumerate([('Structure',False),('Calendar',True),('Skin',False)]):
    x=1080+i*340
    d.rounded_rectangle((x,990,x+300,1080),radius=45,fill='white',outline=hex_to_rgb(COLORS['azure'] if active else COLORS['border']),width=4 if active else 2)
    if active:
        # subtle glow approximation
        pass
    bb=d.textbbox((0,0),label,font=font(26,True if active else False))
    d.text((x+(300-(bb[2]-bb[0]))/2,1018),label,font=font(26,True if active else False),fill=hex_to_rgb(COLORS['ink']))
# card sample
d.rounded_rectangle((180,1180,2220,1400),radius=34,fill='white')
d.text((230,1230),'Overall',font=font(28,True),fill=hex_to_rgb(COLORS['ink']))
d.text((230,1285),'Top 14%',font=font(24),fill=hex_to_rgb(COLORS['body']))
d.text((780,1230),'STRONGEST',font=font(16,True),fill=hex_to_rgb(COLORS['body']))
d.text((780,1275),'Jaw',font=font(26,True),fill=hex_to_rgb(COLORS['azure']))
d.text((1350,1230),'WEAKEST',font=font(16,True),fill=hex_to_rgb(COLORS['body']))
d.text((1350,1275),'Nose',font=font(26,True),fill=hex_to_rgb(COLORS['ink']))
overview.save(ROOT / 'design_system' / 'design_system_overview.png', optimize=False, compress_level=2)

# -----------------------------------------------------------------------------
# README and notes
# -----------------------------------------------------------------------------
README = '''# FaceForm UI Design Kit

A packaged design handoff for the 20-screen FaceForm iOS concept.

## Included

- **20 flat, full-bleed PNG screen exports** at 1170 × 2535 px (9:19.5).
- Original source-sheet crops and thumbnails.
- A normalized 4 × 5 contact sheet.
- FaceForm capsule logo, wordmark, gel-ball coach mascot, scan ring, and facecard pattern.
- Recolorable SVG icon library plus PNG icon variants at 24, 48, and 72 px in azure, ink, and muted gray.
- Bone-grain, coach-chat glow, presentation charcoal, and paper-grain texture assets.
- Reusable raster art crops from the screens.
- Design tokens in JSON and Tokens Studio formats.
- CSS and SwiftUI tokens/components.
- Figma setup instructions, screen specifications, copy deck, localization JSON, and mock data.
- A self-contained HTML style guide and PNG overview.

## Important export note

The individual screens are high-resolution normalized raster exports derived from the supplied generated presentation sheet. Their text and photography are flattened. Use the included copy deck, tokens, SVG icons, and implementation files to rebuild fully editable production screens.

## Font note

Font binaries are not included. Use Apple system SF Pro on iOS and the documented Inter/Helvetica fallback stack elsewhere. See `fonts/README.md`.

## Folder map

- `screens/hires_png/` — final 1170 × 2535 PNG exports.
- `screens/source_crops/` — unscaled crops from the original sheet.
- `assets/brand/` — logo and mascot assets.
- `assets/icons/` — SVG and multi-size PNG icons.
- `assets/raster/` — reusable image crops.
- `assets/textures/` — background and grain assets.
- `design_system/` — tokens, docs, CSS, SwiftUI, Figma notes, and style guide.
- `mock_data/` — sample JSON data for dashboard, progress, routines, history, and leaderboard.
- `localization/` — English copy JSON.
- `source/` — original 20-screen presentation sheet.

## Production checklist

1. Rebuild typography and cards as native components rather than embedding screen PNGs.
2. Replace raster model imagery with final licensed or commissioned photography where required.
3. Validate Dynamic Type, VoiceOver, Reduce Motion, and touch target sizes.
4. Keep azure below roughly 10% of each screen and reserve functional colors for status meaning.
'''
write_text(ROOT / 'README.md', README)

LEGAL = '''# Asset and licensing notes

- The screen sheet and raster crops are generated concept artwork supplied within this project handoff.
- Review production usage rights for all photography and replace concept imagery where your launch policy requires it.
- Apple trademarks, the Apple logo, and the phrase “Sign in with Apple” must follow Apple’s current Human Interface Guidelines and brand requirements. The kit does not redistribute Apple brand artwork.
- No font binaries are included. Use platform system fonts or obtain third-party fonts from their publisher.
- SVG icons and original design-token/code files in this kit are provided as project assets for the FaceForm concept.
'''
write_text(ROOT / 'ASSET_AND_LICENSE_NOTES.md', LEGAL)

# Include the build script for reproducibility.
shutil.copy2(Path(__file__), ROOT / 'tools_build_faceform_kit.py')

# -----------------------------------------------------------------------------
# Zip archive
# -----------------------------------------------------------------------------
if ZIP_PATH.exists():
    ZIP_PATH.unlink()
with zipfile.ZipFile(ZIP_PATH, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
    for path in ROOT.rglob('*'):
        if path.is_file():
            zf.write(path, arcname=str(Path(ROOT.name) / path.relative_to(ROOT)))

print(f'Created: {ZIP_PATH}')
print(f'Files: {sum(1 for p in ROOT.rglob("*") if p.is_file())}')
print(f'Zip size: {ZIP_PATH.stat().st_size / (1024*1024):.1f} MB')
