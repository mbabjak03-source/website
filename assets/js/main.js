// ─────────────────────────────────────────────────────────────
//  MAIN SCRIPT
//  Builds the header, footer and page content from the files in /data.
//  You normally don't need to edit this file to add content.
//
//  Each .html page has <body data-page="...">, which picks the
//  render function at the bottom of this file.
// ─────────────────────────────────────────────────────────────

// Escape plain text before putting it into HTML.
function esc(text) {
  return String(text ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[c]);
}

const pad = (n) => String(n).padStart(2, "0");
const letter = (i) => String.fromCharCode(65 + i); // 0 → A, 1 → B …

function categoryLabel(id) {
  const cat = CATEGORIES.find((c) => c.id === id);
  return cat ? cat.label : id.toUpperCase();
}

// An image inside the corner-bracket frame, or an empty frame.
function frame(src, alt, extraClass = "", emptyText = "NO IMAGE YET") {
  if (!src) {
    return `<div class="frame empty ${extraClass}" data-empty="${esc(emptyText)}"></div>`;
  }
  return `<div class="frame ${extraClass}"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy"></div>`;
}

function rule(label, meta = "") {
  return `
    <div class="rule">
      <p class="label">${label}</p>
      <span class="line"></span>
      ${meta ? `<span class="meta">${meta}</span>` : ""}
    </div>`;
}

// ── Project write-up blocks ──────────────────────────────────
// A project's `body` is a list of blocks. A plain "string" is a
// paragraph; the { ... } kinds are listed at the top of data/projects.js.

function renderStory(p) {
  let figNo = 0;
  const paras = (text) => [].concat(text).map((t) => `<p>${t}</p>`).join("");
  const figure = (src, caption, cls = "photo") => {
    figNo += 1;
    return `
      <figure>
        ${frame(src, caption || p.title, cls)}
        <figcaption>FIG. ${pad(figNo)}${caption ? ` — ${esc(caption)}` : ""}</figcaption>
      </figure>`;
  };

  return p.body
    .map((b) => {
      if (typeof b === "string") {
        return `<div class="prose story-text">${paras(b)}</div>`;
      }
      if (b.heading) {
        return `<h2 class="story-heading">${esc(b.heading)}</h2>`;
      }
      if (b.quote) {
        return `<blockquote class="story-quote">${esc(b.quote)}</blockquote>`;
      }
      if (b.specs) {
        const rows = b.specs
          .map((s) => `<div><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`)
          .join("");
        return `<dl class="facts story-specs">${rows}</dl>`;
      }
      // "image" in b: an empty "" still counts, it shows an empty frame
      if (b.text && "image" in b) {
        const side = b.side === "left" ? " img-left" : "";
        return `
          <div class="story-split${side}">
            <div class="prose">${paras(b.text)}</div>
            ${figure(b.image, b.caption)}
          </div>`;
      }
      if (b.images) {
        const captions = [].concat(b.captions || []);
        return `
          <div class="story-row" style="--n:${b.images.length}">
            ${b.images.map((src, i) => figure(src, captions[i])).join("")}
          </div>`;
      }
      if ("image" in b) {
        return `<div class="story-image">${figure(b.image, b.caption, b.wide ? "pano" : "photo")}</div>`;
      }
      // text without an image: just show the text ("side" only moves an image)
      if (b.text) {
        return `<div class="prose story-text">${paras(b.text)}</div>`;
      }
      console.warn(`Project "${p.id}": don't know how to show this block`, b);
      return "";
    })
    .join("");
}

// ── Shared header + footer ───────────────────────────────────

function renderHeader() {
  const current = location.pathname.split("/").pop() || "index.html";
  const links = SITE.nav
    .map((item, i) => {
      const active = current === item.href ||
        (current === "project.html" && item.href === "projects.html");
      return `<a href="${item.href}"${active ? ' aria-current="page"' : ""}>
        <span class="idx">[${pad(i + 1)}]</span>${esc(item.label)}</a>`;
    })
    .join("");

  const swatches = SITE.themes
    .map((t) => `<button class="theme-btn" data-theme-id="${t.id}" title="Theme: ${esc(t.label)}"
      aria-label="Theme: ${esc(t.label)}"
      style="background:linear-gradient(135deg, ${t.swatch[0]} 50%, ${t.swatch[1]} 50%)"></button>`)
    .join("");

  document.querySelector("[data-header]").outerHTML = `
    <header class="site-header">
      <div class="wrap">
        <a class="logo" href="index.html">${esc(SITE.shortName)}</a>
        <div class="header-right">
          <nav class="nav">${links}</nav>
          <div class="themes" role="group" aria-label="Colour theme">${swatches}</div>
        </div>
      </div>
    </header>`;
}

// ── Themes ───────────────────────────────────────────────────
// The chosen theme is stored in the browser (localStorage), and the
// small script in each page's <head> applies it before anything draws.
// Adding ?theme=amber to any URL also works, handy for sharing.

function currentTheme() {
  const saved = document.documentElement.dataset.theme;
  // fall back to the default if the saved theme was removed from the list
  return SITE.themes.some((t) => t.id === saved) ? saved : SITE.themes[0].id;
}

function applyTheme(id) {
  document.documentElement.dataset.theme = id;
  try {
    localStorage.setItem("theme", id);
  } catch (e) {
    // private browsing etc. — theme just won't be remembered
  }
  document.querySelectorAll("[data-theme-id]").forEach((b) =>
    b.setAttribute("aria-pressed", b.dataset.themeId === id)
  );
  const name = document.querySelector("[data-theme-name]");
  const theme = SITE.themes.find((t) => t.id === id);
  if (name && theme) name.textContent = theme.label;
}

function setupThemePicker() {
  document.querySelectorAll("[data-theme-id]").forEach((b) =>
    b.addEventListener("click", () => applyTheme(b.dataset.themeId))
  );
  applyTheme(currentTheme());
}

function renderFooter() {
  const links = SITE.links
    .map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)
    .join("");

  document.querySelector("[data-footer]").outerHTML = `
    <footer class="site-footer">
      <div class="wrap">
        <span>© ${new Date().getFullYear()} ${esc(SITE.name)}</span>
        <nav>${links}</nav>
        <span>THEME <span data-theme-name></span> · LOCAL <span data-clock>--:--</span></span>
      </div>
    </footer>`;

  const clock = document.querySelector("[data-clock]");
  const tick = () => {
    const d = new Date();
    clock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };
  tick();
  setInterval(tick, 30000);
}

// ── Pages ────────────────────────────────────────────────────

const pages = {
  home() {
    const counts = {
      "about.html": `${ABOUT.achievements.length} ACHIEVEMENTS`,
      "projects.html": `${PROJECTS.length} PROJECTS`,
    };
    const items = SITE.nav
      .map((item, i) => `
        <li><a href="${item.href}">
          <span class="idx">[${pad(i + 1)}]</span>
          <span class="name">${esc(item.label)}</span>
          <span class="arrow">${counts[item.href] || ""} →</span>
        </a></li>`)
      .join("");

    return `
      <section class="hero single">
        <div class="hero-text">
          <p class="label">Personal site — index</p>
          <h1 class="display blink">${esc(SITE.name)}</h1>
          <p class="prompt">${esc(SITE.tagline)}</p>
        </div>
      </section>
      <section class="section">
        <ul class="index-list">${items}</ul>
      </section>`;
  },

  about() {
    const [first, ...rest] = ABOUT.bio;
    const facts = ABOUT.facts
      .map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`)
      .join("");
    const links = SITE.links
      .map((l, i) => `<a class="btn${i === 0 ? " primary" : ""}" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)
      .join("");
    const achievements = ABOUT.achievements
      .map((a) => `
        <li>
          <span class="year">${esc(a.year)}</span>
          <div><h3>${esc(a.title)}</h3><p>${esc(a.detail)}</p></div>
          ${a.tag ? `<span class="tag">${esc(a.tag)}</span>` : ""}
        </li>`)
      .join("");

    return `
      <section class="hero">
        ${frame(ABOUT.photo, SITE.name, "", "PORTRAIT")}
        <div class="hero-text">
          <p class="label">[01] About — who is this</p>
          <h1 class="display">About</h1>
          <p class="prompt">${esc(SITE.name)}</p>
          <p class="highlight"><span>${first || ""}</span></p>
          <div class="prose" style="margin-top:24px">${rest.map((p) => `<p>${p}</p>`).join("")}</div>
          <dl class="facts">${facts}</dl>
          <div class="buttons">${links}</div>
        </div>
      </section>
      <section class="section">
        ${rule("Achievements", `${pad(ABOUT.achievements.length)} ENTRIES`)}
        <ul class="timeline">${achievements}</ul>
      </section>`;
  },

  projects() {
    const filterButtons = [{ id: "all", label: "ALL" }, ...CATEGORIES]
      .map((c) => {
        const n = c.id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c.id).length;
        return `<button class="btn" data-filter="${c.id}">${esc(c.label)}<span class="count">${pad(n)}</span></button>`;
      })
      .join("");

    return `
      <section class="hero single">
        <div class="hero-text">
          <p class="label">[02] Projects — things I've built</p>
          <h1 class="display">Projects</h1>
          <p class="prompt">${CATEGORIES.map((c) => c.label).join(" / ")}</p>
          <p class="highlight"><span>Personal projects, sorted by what they are. Pick a category or scroll through all of them.</span></p>
        </div>
      </section>
      <section class="section" style="padding-top:0">
        <div class="filters">${filterButtons}</div>
        <div data-list></div>
      </section>`;
  },

  project() {
    const id = new URLSearchParams(location.search).get("id");
    const p = PROJECTS.find((x) => x.id === id);

    if (!p) {
      return `
        <section class="hero single">
          <div class="hero-text">
            <p class="label">Error — not found</p>
            <h1 class="display">404</h1>
            <p class="prompt">No project with id "${esc(id)}"</p>
            <a class="btn primary" href="projects.html">← All projects</a>
          </div>
        </section>`;
    }

    document.title = `${p.title} — ${SITE.name}`;
    const links = (p.links || [])
      .map((l) => `<a class="btn" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)
      .join("");
    const gallery = (p.images || []).length
      ? `<div class="gallery">${p.images.map((src) => frame(src, p.title, "wide")).join("")}</div>`
      : "";

    return `
      <a class="back" href="projects.html#${p.category}">← ${categoryLabel(p.category)}</a>
      <section class="hero">
        ${frame(p.cover, p.title)}
        <div class="hero-text">
          <p class="label">${categoryLabel(p.category)} — ${esc(p.year)}</p>
          <h1 class="display" style="font-size:clamp(36px,6vw,72px)">${esc(p.title)}</h1>
          <p class="prompt">${esc(p.status)}</p>
          <p class="highlight"><span>${esc(p.summary)}</span></p>
          ${links ? `<div class="buttons">${links}</div>` : ""}
        </div>
      </section>
      <section class="section">
        ${rule("Write-up", `${categoryLabel(p.category)} · ${esc(p.year)}`)}
        <div class="story">${renderStory(p)}</div>
        ${gallery}
      </section>`;
  },
};

// The project list + filter buttons on projects.html.
function setupProjectFilter() {
  const list = document.querySelector("[data-list]");
  const buttons = document.querySelectorAll("[data-filter]");

  function show(filter) {
    const items = PROJECTS.filter((p) => filter === "all" || p.category === filter);
    buttons.forEach((b) => b.setAttribute("aria-pressed", b.dataset.filter === filter));

    if (!items.length) {
      list.innerHTML = `<p class="empty-state">Nothing here yet.</p>`;
      return;
    }

    // number projects within their own category: CARS_01, CARS_02 …
    const seen = {};
    list.innerHTML = items
      .map((p, i) => {
        seen[p.category] = (seen[p.category] || 0) + 1;
        const href = `project.html?id=${encodeURIComponent(p.id)}`;
        const links = (p.links || [])
          .map((l) => `<a class="btn" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)
          .join("");
        return `
          <article class="case">
            ${rule(`Project [${letter(i)}] / ${esc(p.title)}`, `${categoryLabel(p.category)}_${pad(seen[p.category])} · ${esc(p.status)}`)}
            <div class="case-body">
              <div>
                <div class="tags"><span class="on">${categoryLabel(p.category)}</span><span>${esc(p.year)}</span></div>
                <h2><a href="${href}">${esc(p.title)}</a></h2>
                <p class="muted" style="max-width:34em;margin:0">${esc(p.summary)}</p>
                <div class="buttons"><a class="btn primary" href="${href}">Read more →</a>${links}</div>
              </div>
              <a class="frame${p.cover ? "" : " empty"}" href="${href}" ${p.cover ? "" : 'data-empty="NO IMAGE YET"'} aria-label="${esc(p.title)}">
                ${p.cover ? `<img src="${esc(p.cover)}" alt="${esc(p.title)}" loading="lazy">` : ""}
              </a>
            </div>
          </article>`;
      })
      .join("");
  }

  // the filter lives in the URL (projects.html#cars) so it can be linked to
  const fromHash = () => {
    const h = location.hash.slice(1);
    show(CATEGORIES.some((c) => c.id === h) ? h : "all");
  };

  buttons.forEach((b) =>
    b.addEventListener("click", () => {
      const f = b.dataset.filter;
      history.replaceState(null, "", f === "all" ? location.pathname : `#${f}`);
      show(f);
    })
  );
  window.addEventListener("hashchange", fromHash);
  fromHash();
}

// ── Start ────────────────────────────────────────────────────

const page = document.body.dataset.page;
renderHeader();
document.querySelector("main .wrap").innerHTML = pages[page]();
renderFooter();
setupThemePicker();
if (page === "projects") setupProjectFilter();
