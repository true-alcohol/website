/* designs.js — renders the (inverted, dark) design gallery from content/designs.json */

async function renderDesigns() {
  const mount = document.getElementById("gallery");
  if (!mount) return;
  try {
    const res = await fetch("content/designs.json", { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    let items = await res.json();
    items = items.filter(d => d.published !== false)
                 .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    if (!items.length) {
      mount.innerHTML = `<div class="plate plate--placeholder">Drop images in assets/img and list them in content/designs.json</div>`;
      return;
    }
    mount.innerHTML = items.map(d => {
      const href = d.link || d.src;
      const meta = [d.year || (d.date || "").split("-")[0]].filter(Boolean).join(" · ");
      return `
        <a class="plate" href="${href}" ${d.link ? 'target="_blank" rel="noopener"' : ""}>
          <img src="${d.src}" alt="${(d.title || "Untitled").replace(/"/g, "&quot;")}" loading="lazy">
          <span class="plate__cap">
            <span class="plate__title">${window.emph(d.title || "Untitled")}</span>
            ${meta ? `<span class="plate__meta">${meta}</span>` : ""}
          </span>
        </a>`;
    }).join("");
  } catch (e) {
    mount.innerHTML = `<div class="plate plate--placeholder">Could not load gallery (${e.message}). Serve over http:// — see README.</div>`;
  }
}

document.addEventListener("DOMContentLoaded", renderDesigns);
