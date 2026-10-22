#!/usr/bin/env python3
"""Create responsive WebP derivatives for JPR.RAW. Originals are never modified.

Usage:  pip install pillow && python tools/optimize.py
Reads   originals/*.jpg|jpeg|png   (this folder is git-ignored, not published)
Writes  assets/images/portfolio/<name>-480|960|1600.webp
        assets/images/hero/<name>-<widths>.webp   (names listed in HERO)
        assets/og.jpg                             (1200x630 social card)
Prints  width/height for each image, to paste into assets/js/portfolio.js.
Metadata (EXIF, GPS) is not copied into the derivatives.
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / "originals", ROOT / "assets" / "images"
WIDTHS = [480, 960, 1600]
HERO = {"dsc0097": [828, 1440], "dsc0099": [1440, 2400]}  # mobile + desktop heroes
OG_FROM = "dsc0099"

def save(im, width, dest, q):
    if width > im.width:
        return
    h = round(im.height * width / im.width)
    im.resize((width, h), Image.LANCZOS).save(dest, "WEBP", quality=q, method=6)

for f in sorted(SRC.iterdir()):
    if f.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
        continue
    im = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
    name = f.stem.lower()
    for w in WIDTHS:
        save(im, w, OUT / "portfolio" / f"{name}-{w}.webp", 80)
    for w in HERO.get(name, []):
        save(im, w, OUT / "hero" / f"{name}-{w}.webp", 80)
    if name == OG_FROM:
        og = ImageOps.fit(im, (1200, 630), Image.LANCZOS, centering=(0.5, 0.4))
        og.save(ROOT / "assets" / "og.jpg", "JPEG", quality=82)
    print(f'{name}: w={im.width}, h={im.height}')
