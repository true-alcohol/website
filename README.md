# True Alcohol — Tauri's Philosophical Project

A static portfolio site: essays (Markdown) + a design gallery. No build step, no
dependencies to install. Articles are written in Markdown and rendered in the
browser; the Markdown parser (`marked`) is vendored locally in `assets/js/`.

## Preview locally

The site fetches `.md`/`.json` files, so it must be served over `http://`
(opening `index.html` directly with `file://` will show "could not load").

```powershell
cd C:\Users\user\portfolio
python -m http.server 5173
```

Then open http://localhost:5173

## Add an article

1. Copy `content/articles/_TEMPLATE.md` to `content/articles/<your-slug>.md`.
2. Write your essay in Markdown (frontmatter at the top sets title/date/tags).
3. Add a matching entry to `content/articles.json`:
   ```json
   { "slug": "<your-slug>", "title": "My Title", "subtitle": "…",
     "date": "2026-07", "tags": ["Ethics"], "published": true }
   ```
   Newest `date` sorts to the top. Set `"published": false` to hide a draft.

## Add a design

1. Put the image in `assets/img/` (any B&W or color image; it's desaturated in CSS).
2. Add an entry to `content/designs.json`:
   ```json
   { "title": "My *Cover*", "src": "assets/img/my-cover.jpg",
     "year": "2026", "published": true }
   ```
   Optional `"link": "https://…"` makes the plate open an external page.

## Change site-wide things

- **Wordmark, nav links, contact links, slogan:** edit the `SITE` object at the
  top of `assets/js/site.js` — it updates the header/footer on every page.
- **Colors, fonts, spacing:** the CSS variables at the top of
  `assets/css/style.css` (`--paper`, `--ink`, `--red`, `--display`, …).
- **Bio / CV:** edit `about.html` directly (marked with ▼ REPLACE comments).

## Deploy to true-alcohol.info (free)

Any static host works. Easiest, free, with your custom domain:

**Cloudflare Pages or Netlify (drag-and-drop)**
1. Create a free account.
2. Drag this whole folder into the "deploy" area (no build command; publish
   directory = the folder root).
3. In the host's domain settings, add `true-alcohol.info`.
4. At your domain registrar, set the DNS records the host shows you
   (usually a CNAME, or Cloudflare nameservers). HTTPS is automatic.

**GitHub Pages** also works: push this folder to a repo, enable Pages on the
root, then add the custom domain in Settings → Pages.

## Structure

```
index.html      articles.html   article.html   designs.html   about.html
assets/css/style.css
assets/js/       site.js  articles.js  article.js  designs.js  marked.min.js
content/articles/*.md      content/articles.json
content/designs.json
assets/img/      (your images + optional portrait.jpg)
```
"# website" 
"# website" 
"# website" 
