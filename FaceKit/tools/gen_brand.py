#!/usr/bin/env python3
"""FaceKit brand assets: layered coach mascot SVG (Rive-ready groups) + 1024 app icon PNG
+ photo stand-ins (avatars, before/after, porcelain-mask static)."""
import os, math
from PIL import Image, ImageDraw, ImageFilter

BRAND = "/home/user/approtic/FaceKit/assets/brand"
PHOTOS = "/home/user/approtic/FaceKit/assets/photos"
THREED = "/home/user/approtic/FaceKit/assets/3d"
for d in (BRAND, PHOTOS, THREED):
    os.makedirs(d, exist_ok=True)

# ---------------- Coach mascot: layered vector, groups named for Rive ----------------
mascot = '''<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Layered for Rive import: body / highlight / eyes / mouth / blush are separate groups -->
  <g id="shadow">
    <ellipse cx="120" cy="212" rx="52" ry="10" fill="#16181D" opacity="0.08"/>
  </g>
  <g id="body">
    <path d="M120 28c46 0 76 32 76 78 0 30-12 52-30 66-8 6-12 16-10 26l1 6c1 4-3 7-7 5l-16-9c-5-3-10-4-14-4s-9 1-14 4l-16 9c-4 2-8-1-7-5l1-6c2-10-2-20-10-26-18-14-30-36-30-66 0-46 30-78 76-78Z" fill="#2F80FF"/>
    <path d="M120 28c46 0 76 32 76 78 0 30-12 52-30 66-8 6-12 16-10 26l1 6c1 4-3 7-7 5l-16-9c-5-3-10-4-14-4s-9 1-14 4l-16 9c-4 2-8-1-7-5l1-6c2-10-2-20-10-26-18-14-30-36-30-66 0-46 30-78 76-78Z" fill="url(#bodyGrad)"/>
  </g>
  <g id="highlight">
    <ellipse cx="94" cy="66" rx="30" ry="18" fill="#FFFFFF" opacity="0.30" transform="rotate(-18 94 66)"/>
    <circle cx="70" cy="88" r="6" fill="#FFFFFF" opacity="0.35"/>
  </g>
  <g id="eyes">
    <g id="eye-left">
      <ellipse cx="98" cy="112" rx="10" ry="13" fill="#FFFFFF"/>
      <circle cx="100" cy="115" r="5.5" fill="#16181D"/>
      <circle cx="102" cy="112.5" r="1.8" fill="#FFFFFF"/>
    </g>
    <g id="eye-right">
      <ellipse cx="142" cy="112" rx="10" ry="13" fill="#FFFFFF"/>
      <circle cx="144" cy="115" r="5.5" fill="#16181D"/>
      <circle cx="146" cy="112.5" r="1.8" fill="#FFFFFF"/>
    </g>
  </g>
  <g id="blush">
    <ellipse cx="86" cy="132" rx="8" ry="4.5" fill="#FF6B7A" opacity="0.45"/>
    <ellipse cx="154" cy="132" rx="8" ry="4.5" fill="#FF6B7A" opacity="0.45"/>
  </g>
  <g id="mouth">
    <path d="M110 138c4 6 16 6 20 0" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  </g>
  <defs>
    <radialGradient id="bodyGrad" cx="0.35" cy="0.25" r="1.1">
      <stop offset="0" stop-color="#5C9DFF"/>
      <stop offset="0.65" stop-color="#2F80FF"/>
      <stop offset="1" stop-color="#1E63D6"/>
    </radialGradient>
  </defs>
</svg>
'''
open(os.path.join(BRAND, "coach-mascot.svg"), "w").write(mascot)

# Wordmark
wordmark = '''<svg width="480" height="120" viewBox="0 0 480 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="mark">
    <path d="M20 40V28a8 8 0 0 1 8-8h12" stroke="#16181D" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path d="M84 20h12a8 8 0 0 1 8 8v12" stroke="#16181D" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path d="M104 80v12a8 8 0 0 1-8 8H84" stroke="#16181D" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path d="M40 100H28a8 8 0 0 1-8-8V80" stroke="#16181D" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path d="M47 52c0-10 6.5-16 15-16s15 6 15 16c0 7-3 12-7 15.5-2 1.8-3 4.3-3 6.8v1.2h-10v-1.2c0-2.5-1-5-3-6.8-4-3.5-7-8.5-7-15.5Z" stroke="#2F80FF" stroke-width="7" stroke-linejoin="round" fill="none"/>
    <path d="M54 88h16" stroke="#2F80FF" stroke-width="7" stroke-linecap="round"/>
  </g>
  <text x="136" y="79" font-family="General Sans, -apple-system, sans-serif" font-weight="600" font-size="56" fill="#16181D">Face<tspan fill="#2F80FF">Kit</tspan></text>
</svg>
'''
open(os.path.join(BRAND, "wordmark.svg"), "w").write(wordmark)

# ---------------- App icon 1024 via Pillow ----------------
S = 1024
img = Image.new("RGB", (S, S), "#2F80FF")
d = ImageDraw.Draw(img)
# radial-ish gradient: light top-left
grad = Image.new("L", (S, S), 0)
gd = ImageDraw.Draw(grad)
cx, cy, maxr = S * 0.32, S * 0.22, S * 1.15
px = grad.load()
for y in range(S):
    for x in range(0, S, 2):
        r = math.hypot(x - cx, y - cy) / maxr
        v = max(0, min(255, int(150 * (1 - r))))
        px[x, y] = v
        if x + 1 < S:
            px[x + 1, y] = v
light = Image.new("RGB", (S, S), "#7FB2FF")
img = Image.composite(light, img, grad)
d = ImageDraw.Draw(img)

def rr(draw, xy, radius, **kw):
    draw.rounded_rectangle(xy, radius=radius, **kw)

W = 46  # stroke weight
# scan corners
m, ln = 200, 150
for (x0, y0, dx, dy) in [(m, m, 1, 1), (S - m, m, -1, 1), (S - m, S - m, -1, -1), (m, S - m, 1, -1)]:
    d.line([(x0, y0 + dy * ln), (x0, y0)], fill="white", width=W)
    d.line([(x0, y0), (x0 + dx * ln, y0)], fill="white", width=W)
    d.ellipse([x0 - W // 2, y0 - W // 2, x0 + W // 2, y0 + W // 2], fill="white")
    d.ellipse([x0 - W // 2, y0 + dy * ln - W // 2, x0 + W // 2, y0 + dy * ln + W // 2], fill="white")
    d.ellipse([x0 + dx * ln - W // 2, y0 - W // 2, x0 + dx * ln + W // 2, y0 + W // 2], fill="white")
# face: arc + jaw
d.arc([352, 330, 672, 700], start=200, end=340, fill="white", width=W)
d.arc([392, 430, 632, 760], start=15, end=165, fill="white", width=W)
# eyes
for ex in (445, 579):
    d.ellipse([ex - 16, 512 - 16, ex + 16, 512 + 16], fill="white")
# smile
d.arc([462, 560, 562, 640], start=20, end=160, fill="white", width=int(W * 0.75))
img.save(os.path.join(BRAND, "app-icon-1024.png"))

# ---------------- Photo stand-ins ----------------
def avatar(path, c1, c2, initial):
    A = 256
    im = Image.new("RGB", (A, A), c1)
    dr = ImageDraw.Draw(im)
    for y in range(A):
        t = y / A
        col = tuple(int(a + (b - a) * t) for a, b in zip(c1, c2))
        dr.line([(0, y), (A, y)], fill=col)
    # simple head+shoulders silhouette
    dr.ellipse([88, 52, 168, 132], fill=(255, 255, 255, 255))
    dr.pieslice([58, 140, 198, 300], 180, 360, fill=(255, 255, 255))
    im.save(path)

palette = [((47, 128, 255), (28, 99, 214)), ((255, 107, 122), (214, 69, 96)),
           ((46, 197, 168), (23, 150, 130)), ((168, 85, 247), (124, 46, 196)),
           ((245, 166, 35), (204, 122, 12)), ((22, 24, 29), (94, 100, 110))]
for i, (c1, c2) in enumerate(palette, 1):
    avatar(os.path.join(PHOTOS, f"avatar-{i:02d}.png"), c1, c2, "")

def soft_face(path, w, h, base, label_bar=None):
    """Neutral abstract 'portrait' placeholder: soft blob face on gradient."""
    im = Image.new("RGB", (w, h), base)
    dr = ImageDraw.Draw(im)
    for y in range(h):
        t = y / h
        col = tuple(int(c * (1 - 0.18 * t)) for c in base)
        dr.line([(0, y), (w, y)], fill=col)
    fx, fy = w // 2, int(h * 0.42)
    fw, fh = int(w * 0.34), int(h * 0.30)
    dr.ellipse([fx - fw, fy - fh, fx + fw, fy + fh], fill=tuple(min(255, c + 34) for c in base))
    neckw = int(fw * 0.45)
    dr.rectangle([fx - neckw, fy + int(fh * 0.7), fx + neckw, h], fill=tuple(min(255, c + 34) for c in base))
    im = im.filter(ImageFilter.GaussianBlur(1.2))
    if label_bar:
        dr = ImageDraw.Draw(im)
        dr.rectangle([0, h - 54, w, h], fill="#16181D")
    im.save(path)

soft_face(os.path.join(PHOTOS, "before-demo.png"), 480, 640, (196, 178, 160))
soft_face(os.path.join(PHOTOS, "after-demo.png"), 480, 640, (214, 196, 178))
soft_face(os.path.join(PHOTOS, "scan-demo.png"), 480, 640, (188, 170, 156))

# Porcelain mask static (until USDZ): grayscale sculptural face render
M = 640
im = Image.new("RGB", (M, M), (241, 238, 232))
dr = ImageDraw.Draw(im)
for y in range(M):
    t = y / M
    dr.line([(0, y), (M, y)], fill=tuple(int(c - 10 * t) for c in (241, 238, 232)))
# mask base
dr.ellipse([170, 90, 470, 480], fill=(250, 250, 251))
dr.polygon([(200, 300), (440, 300), (400, 520), (240, 520)], fill=(250, 250, 251))
# shading
sh = Image.new("L", (M, M), 0)
sd = ImageDraw.Draw(sh)
sd.ellipse([190, 110, 330, 460], fill=60)   # left shade
sd.ellipse([360, 140, 470, 470], fill=40)
sh = sh.filter(ImageFilter.GaussianBlur(40))
dark = Image.new("RGB", (M, M), (198, 200, 206))
im = Image.composite(dark, im, sh)
dr = ImageDraw.Draw(im)
# features: closed-eye slits, nose line, lips
dr.arc([250, 250, 310, 280], 20, 160, fill=(150, 152, 160), width=6)
dr.arc([340, 250, 400, 280], 20, 160, fill=(150, 152, 160), width=6)
dr.line([(322, 260), (316, 350)], fill=(190, 192, 198), width=5)
dr.arc([300, 340, 344, 372], 200, 340, fill=(170, 172, 180), width=5)
dr.arc([292, 386, 352, 416], 20, 160, fill=(150, 152, 160), width=7)
dr.arc([296, 378, 348, 404], 200, 340, fill=(165, 168, 176), width=6)
im = im.filter(ImageFilter.GaussianBlur(2.0))
im.save(os.path.join(THREED, "porcelain-mask-static.png"))
print("brand + photos + 3d done")
