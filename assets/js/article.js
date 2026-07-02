/* article.js — loads one Markdown article (?slug=…) and renders it.
   Markdown files live in content/articles/<slug>.md and may begin with a
   YAML-ish frontmatter block:

     ---
     title: The *Socio-metaphysical* Trans Being
     subtitle: On being and its undressing
     date: 2025-12
     author: Tauri
     ---
*/

function parseFrontmatter(raw) {
  const m = raw.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  m[1].split(/\r?\n/).forEach(line => {
    const i = line.indexOf(":");
    if (i === -1) return;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    if (key) data[key] = val;
  });
  return { data, body: m[2] };
}

function getSlug() {
  const s = new URLSearchParams(location.search).get("slug") || "";
  return s.replace(/[^a-z0-9\-_]/gi, "");   // path-safety
}

async function renderArticle() {
  const head = document.getElementById("article-head");
  const body = document.getElementById("article-body");
  if (!body) return;
  const slug = getSlug();
  if (!slug) { body.innerHTML = `<p class="empty">No article specified.</p>`; return; }

  try {
    const res = await fetch(`content/articles/${slug}.md`, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    const raw = await res.text();
    const { data, body: md } = parseFrontmatter(raw);

    const title = data.title || slug;
    document.title = title.replace(/\*/g, "") + " — " + (window.SITE?.brand || "True Alcohol");

    if (head) {
      head.innerHTML = `
        <div class="wrap measure">
          <a class="backlink" href="articles.html">Articles</a>
          ${data.tags ? `<div class="eyebrow" style="margin-top:1.2rem">${data.tags}</div>` : ""}
          <h1 class="article-title">${window.emph(title)}</h1>
          ${data.subtitle ? `<p class="article-sub">${window.emph(data.subtitle)}</p>` : ""}
          <div class="rule"></div>
          <div class="creditblock">
            <span>${data.author || window.SITE?.author || "Tauri"}</span>
            <span class="sep">·</span><span>${window.fmtDate(data.date)}</span>
            <span class="sep">·</span><span>${window.SITE?.brand || "True Alcohol"} (${window.SITE?.unit || "Research Unit"})</span>
          </div>
        </div>`;
    }

    marked.setOptions({ gfm: true, breaks: false });
    body.innerHTML = marked.parse(md.trim());
  } catch (e) {
    body.innerHTML = `<p class="empty">Could not load this article (${e.message}). Check the slug, or serve over http:// — see README.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", renderArticle);
