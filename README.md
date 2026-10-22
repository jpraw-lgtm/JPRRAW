# JPR.RAW — photography portfolio

Plain HTML, CSS and JavaScript. No build step, no dependencies, no backend. Works from any sub-path (`https://USERNAME.github.io/REPOSITORY/`) because every path is relative.

## Structure
```
index.html                  page markup (hero is static here for fast loading)
404.html                    custom not-found page
assets/css/styles.css       all styles
assets/js/portfolio.js      ★ all content: photos, categories, about, contact
assets/js/main.js           gallery, viewer, menu (no need to edit)
assets/images/portfolio/    optimized WebP (480 / 960 / 1600 px)
assets/images/hero/         hero images (mobile + desktop)
tools/optimize.py           makes the WebP files from your originals
originals/                  your full-size photos (git-ignored, never published)
.github/workflows/pages.yml GitHub Pages deployment
```

## Publish on GitHub Pages
1. Create a GitHub repository and push this folder to the `main` branch.
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` runs the workflow (Actions tab) and publishes the site at `https://USERNAME.github.io/REPOSITORY/`.
4. After the first deploy, edit `index.html` and replace `content="assets/og.jpg"` (og:image) with the full URL, e.g. `https://USERNAME.github.io/REPOSITORY/assets/og.jpg`, so social previews work. In `404.html`, set `site-base` to `/REPOSITORY/`.

Preview locally: `python3 -m http.server` inside this folder, then open http://localhost:8000.

## Add, replace or reorder photographs
1. Put the full-size JPG in `originals/` (use a short lowercase name, e.g. `harbor.jpg`).
2. `pip install pillow` then `python tools/optimize.py`. It writes the WebP sizes (metadata/GPS is stripped) and prints `w` and `h` for each photo.
3. Add a line to `photos` in `assets/js/portfolio.js` (`file` = name without extension). Order in the list = order on the site. Delete a line to remove a photo. Change `category` to move it. Categories with no photos disappear automatically.
4. Hero images: names are listed in `HERO` in `tools/optimize.py` and used in `index.html` (`assets/images/hero/…`). To change one, edit both.

The originals are never altered. Photos are shown uncropped (`object-fit: contain` inside their own aspect ratio).

## Update brand, bio and links
Everything is in `assets/js/portfolio.js`: `plans` (packages, prices, add-ons, booking policies), `about` (set `placeholder: false` once you have written your own text), and `contact` (Instagram, email, WhatsApp, other links). Empty fields are simply not shown. The tagline is in `index.html`.

## Troubleshooting
- **Images missing / 404 in the console:** the file name in `portfolio.js` must match the WebP names exactly (case-sensitive on GitHub Pages), e.g. `harbor` → `harbor-960.webp`. Re-run `tools/optimize.py`.
- **Site shows the README or a blank page:** Pages source must be *GitHub Actions* (step 2), and the workflow run must be green.
- **Fonts look different:** Cormorant Garamond and Inter load from Google Fonts; Georgia / system fonts are the fallbacks.
- **Gallery empty when opening index.html by double-click:** should work; if not, use the local server above.

## Notes
Not run: Lighthouse and real-device tests — run them on the published URL (Chrome DevTools → Lighthouse, mobile).
