/* =========================================================================
   site.js — shared chrome (header + footer), injected into every page.
   Edit SITE below to change the wordmark, nav, or contact links everywhere.
   ========================================================================= */

const SITE = {
  brand:   "True Alcohol",          // wordmark, top-left
  author:  "Tauri",                 // credited in footer + articles
  unit:    "Research Unit",         // sub-label
  slogan:  "Jin · Jîyan · Azadî",   // footer slogan
  nav: [
    { href: "articles.html", label: "Articles" },
    { href: "designs.html",  label: "Designs"  },
    { href: "about.html",    label: "About"    },
  ],
  // Contact / external links — set to "" to hide a row.
  links: {
    email:     "",
    instagram: "https://www.instagram.com/true_alcohol/",
    tiktok:    "https://www.tiktok.com/@true.alcohol",
    philpapers:"",
    scholar:   "",
  },
};

function currentPage() {
  const p = location.pathname.split("/").pop() || "index.html";
  return p === "" ? "index.html" : p;
}

function renderHeader() {
  const here = currentPage();
  const links = SITE.nav.map(n => {
    const active = n.href === here ? ' aria-current="page"' : "";
    return `<a href="${n.href}"${active}>${n.label}</a>`;
  }).join("");
  return `
    <header class="site-head">
      <div class="site-head__inner wrap">
        <a class="brand" href="index.html">${SITE.brand.replace(/\s/g, " ")}<span class="dot">.</span></a>
        <nav class="nav" aria-label="Primary">${links}</nav>
      </div>
    </header>`;
}

function renderFooter() {
  const L = SITE.links;
  const rows = [
    L.email     && `<a href="mailto:${L.email}">Email</a>`,
    L.instagram && `<a href="${L.instagram}" target="_blank" rel="noopener">Instagram</a>`,
    L.tiktok    && `<a href="${L.tiktok}" target="_blank" rel="noopener">TikTok</a>`,
    L.philpapers&& `<a href="${L.philpapers}" target="_blank" rel="noopener">PhilPapers</a>`,
    L.scholar   && `<a href="${L.scholar}" target="_blank" rel="noopener">Scholar</a>`,
  ].filter(Boolean).join("");
  const year = document.documentElement.getAttribute("data-year") || "";
  return `
    <footer class="site-foot">
      <div class="site-foot__inner wrap">
        <div>
          <div class="slogan">${SITE.slogan}</div>
          <div class="meta" style="margin-top:.6rem">${SITE.author} · ${SITE.brand} (${SITE.unit})</div>
        </div>
        <div class="foot-links">${rows}</div>
      </div>
    </footer>`;
}

function mountChrome() {
  const head = document.getElementById("site-head");
  const foot = document.getElementById("site-foot");
  if (head) head.outerHTML = renderHeader();
  if (foot) foot.outerHTML = renderFooter();
}

document.addEventListener("DOMContentLoaded", mountChrome);
window.SITE = SITE;
