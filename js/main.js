/* =========================================================
   myCareerDNA — shared behaviour (no build step)
   - Injects header + footer into every page
   - Replaces <i data-icon="name"></i> with inline SVG icons
   - Tabs, mobile nav, scroll reveal, demo form
   ========================================================= */

const P = (d) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

const ICONS = {
  arrow: P('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  cap: P('<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/>'),
  family: P('<circle cx="7" cy="6" r="2.5"/><circle cx="17" cy="6" r="2.5"/><circle cx="12" cy="11" r="2"/><path d="M3 20v-4a4 4 0 0 1 4-4h0a4 4 0 0 1 3 1.4M21 20v-4a4 4 0 0 0-4-4h0a4 4 0 0 0-3 1.4M9 20v-2.5a3 3 0 0 1 6 0V20"/>'),
  school: P('<path d="M3 21h18M5 21V10l7-5 7 5v11"/><path d="M9 21v-5h6v5M9 12h.01M12 12h.01M15 12h.01"/><path d="M12 5V2l3 1.5-3 1.5"/>'),
  planet: P('<circle cx="12" cy="12" r="5"/><path d="M4.5 16.5c-2 2-2.7 3.8-1.9 4.6 1.6 1.6 7.4-1.8 12.9-7.3s8.9-11.3 7.3-12.9c-.8-.8-2.6-.1-4.6 1.9"/>'),
  gamepad: P('<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 11v3M5.5 12.5h3M15.5 12h.01M18 13.5h.01"/>'),
  user: P('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
  brain: P('<path d="M9.5 3A2.5 2.5 0 0 0 7 5.5v.3A3 3 0 0 0 4.5 9a3 3 0 0 0 .6 4.8A3 3 0 0 0 7 18.5 2.5 2.5 0 0 0 12 19V5.5A2.5 2.5 0 0 0 9.5 3z"/><path d="M14.5 3A2.5 2.5 0 0 1 17 5.5v.3A3 3 0 0 1 19.5 9a3 3 0 0 1-.6 4.8A3 3 0 0 1 17 18.5 2.5 2.5 0 0 1 12 19"/>'),
  heart: P('<path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>'),
  chat: P('<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"/>'),
  chart: P('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 15l3-4 3 3 4-6"/>'),
  users: P('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2a5 5 0 0 1 5.5 5.8"/>'),
  search: P('<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/>'),
  lightbulb: P('<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>'),
  compass: P('<circle cx="12" cy="12" r="9"/><path d="M16 8l-2.5 5.5L8 16l2.5-5.5z"/>'),
  target: P('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
  map: P('<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>'),
  puzzle: P('<path d="M10 3h4v2a2 2 0 1 0 4 0V3h3v7h-2a2 2 0 1 0 0 4h2v7h-7v-2a2 2 0 1 0-4 0v2H3v-7h2a2 2 0 1 0 0-4H3V3z"/>'),
  sparkles: P('<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>'),
  scale: P('<path d="M12 3v18M5 21h14M3 7h18"/><path d="M6 7l-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z"/>'),
  book: P('<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5A2.5 2.5 0 0 1 6.5 19H20v3H6.5"/>'),
  file: P('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>'),
  expert: P('<circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/><path d="M17 3.5l1.2 1.2L21 2"/>'),
  check: P('<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/>'),
  x: P('<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>'),
  shield: P('<path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'),
  lock: P('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
  clipboard: P('<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 2h6v4H9zM9 12h6M9 16h4"/>'),
  key: P('<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/>'),
  mail: P('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
  building: P('<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01M10 21v-3h4v3"/>'),
  rocket: P('<path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9s-2.1-.8-2.9-.1z"/><path d="M12 15l-3-3a15 15 0 0 1 11-9 15 15 0 0 1-8 12z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/>'),
  calendar: P('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'),
  clock: P('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  layers: P('<path d="M12 2l10 5-10 5L2 7z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>'),
  eye: P('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  send: P('<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>'),
};

function renderIcons(root = document) {
  root.querySelectorAll("i[data-icon]").forEach((el) => {
    const svg = ICONS[el.dataset.icon];
    if (svg) el.outerHTML = svg;
  });
}

const LOGO_SVG = `
<svg viewBox="0 0 48 48" aria-hidden="true">
  <rect width="48" height="48" rx="14" fill="#14213d"/>
  <path d="M16 9c0 10 16 10 16 15s-16 5-16 15" fill="none" stroke="#9b7bff" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M32 9c0 10-16 10-16 15s16 5 16 15" fill="none" stroke="#2dd4bf" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M19 14h10M19 34h10" stroke="#f59e0b" stroke-width="2.4" stroke-linecap="round"/>
</svg>`;

const LOGO = (href = "index.html") => `
<a class="logo" href="${href}" aria-label="myCareerDNA home">
  ${LOGO_SVG}
  <div><div class="logo-name">myCareer<span>DNA</span></div><div class="logo-tag">Discover. Explore. Build Your Future.</div></div>
</a>`;

function headerHTML(active) {
  const links = [
    ["students.html", "For Students", "students"],
    ["parents.html", "For Parents", "parents"],
    ["schools.html", "For Schools", "schools"],
    ["index.html#method", "Our Method", "method"],
    ["index.html#how", "How It Works", "how"],
    ["https://amrita-portfolio-wine.vercel.app/", "About", "about"],
  ];
  return `
  <header class="site-header">
    <div class="container nav">
      ${LOGO()}
      <nav class="nav-links" aria-label="Main">
        ${links.map(([h, t, k]) => `<a href="${h}" class="${k === active ? "active" : ""}"${h.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${t}</a>`).join("")}
      </nav>
      <a class="btn btn--navy nav-cta" href="schools.html#contact">Bring Career Discovery to Your School <i data-icon="arrow"></i></a>
      <button class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </header>`;
}

function footerHTML() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="foot-grid">
        <div>
          ${LOGO()}
          <p style="margin-top:18px;max-width:320px">Helping students understand themselves — and parents and schools understand them better — before the big decisions.</p>
        </div>
        <div><h5>Explore</h5><ul>
          <li><a href="students.html">For Students</a></li><li><a href="parents.html">For Parents</a></li><li><a href="schools.html">For Schools</a></li>
        </ul></div>
        <div><h5>Company</h5><ul>
          <li><a href="index.html#method">Our Method</a></li><li><a href="https://amrita-portfolio-wine.vercel.app/" target="_blank" rel="noopener">About the Founder</a></li><li><a href="index.html#stories">Stories</a></li>
        </ul></div>
        <div><h5>Get in touch</h5><ul>
          <li><a href="schools.html#contact">Book a school demo</a></li><li><a href="mailto:hello@mycareerdna.in">hello@mycareerdna.in</a></li><li>India</li>
        </ul></div>
      </div>
      <div class="foot-bottom"><span>© ${new Date().getFullYear()} myCareerDNA. All rights reserved.</span><span>Privacy · Terms · Data protection</span></div>
    </div>
  </footer>`;
}

function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach((wrap) => {
    const tabs = wrap.querySelectorAll(".tab");
    const panels = wrap.querySelectorAll(".panel");
    const select = (name) => {
      tabs.forEach((t) => t.setAttribute("aria-selected", t.dataset.tab === name));
      panels.forEach((p) => p.classList.toggle("active", p.dataset.panel === name));
    };
    tabs.forEach((t) => t.addEventListener("click", () => select(t.dataset.tab)));
    // keyboard arrows
    wrap.querySelector(".tabs").addEventListener("keydown", (e) => {
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      const arr = [...tabs];
      const i = arr.findIndex((t) => t.getAttribute("aria-selected") === "true");
      const n = arr[(i + (e.key === "ArrowRight" ? 1 : arr.length - 1)) % arr.length];
      n.focus(); select(n.dataset.tab);
    });
  });
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
}

function initNav() {
  const header = document.querySelector(".site-header");
  const toggle = header.querySelector(".nav-toggle");
  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  header.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => header.classList.remove("open")));
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
}

function initForms() {
  document.querySelectorAll("form[data-demo]").forEach((f) => {
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      // TODO: connect to a real backend / Google Form / email service
      f.querySelector(".form-ok").style.display = "block";
      f.reset();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const active = document.body.dataset.page || "home";
  document.body.insertAdjacentHTML("afterbegin", headerHTML(active));
  document.body.insertAdjacentHTML("beforeend", footerHTML());
  renderIcons();
  initNav(); initTabs(); initReveal(); initForms();
});
