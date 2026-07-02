/* articles.js — renders the article index from content/articles.json */

function fmtDate(d) {
  // accepts "2025-12" or "2025-12-04" -> "December 2025"
  if (!d) return "";
  const [y, m] = d.split("-");
  const months = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
  return m ? `${months[+m - 1]} ${y}` : y;
}

// allow *italic* inside titles authored in the manifest
function emph(s = "") {
  return s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

async function renderArticles() {
  const mount = document.getElementById("article-list");
  if (!mount) return;
  try {
    const res = await fetch("content/articles.json", { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    let items = await res.json();
    items = items.filter(a => a.published !== false)
                 .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    const limit = parseInt(mount.getAttribute("data-limit") || "0", 10);
    if (limit > 0) items = items.slice(0, limit);
    if (!items.length) { mount.innerHTML = `<p class="empty">No articles yet.</p>`; return; }

    mount.innerHTML = `<ul class="entry-list">` + items.map(a => {
      const tags = (a.tags || []).map(t => `<span class="tag">${t}</span>`).join("");
      return `
        <li><a class="entry" href="article.html?slug=${encodeURIComponent(a.slug)}">
          <span class="entry__title">${emph(a.title)}</span>
          <span class="entry__date">${fmtDate(a.date)}</span>
          ${a.subtitle ? `<p class="entry__sub">${emph(a.subtitle)}</p>` : ""}
          ${tags ? `<span class="entry__tags">${tags}</span>` : ""}
        </a></li>`;
    }).join("") + `</ul>`;
  } catch (e) {
    mount.innerHTML = `<p class="empty">Could not load articles (${e.message}). Serve the site over http:// — see README.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", renderArticles);
window.fmtDate = fmtDate;
window.emph = emph;
