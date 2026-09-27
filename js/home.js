/* Homepage only: audience switch + animated CareerDNA helix */

const AUDIENCES = {
  student: {
    acc: "#6d4aff",
    title: "Discover yourself. Explore possibilities.",
    text: "Play through challenges, unlock your CareerDNA and explore career worlds that actually fit you.",
    cta: "Start your journey", href: "students.html",
    mini: [["gamepad", "Interactive challenges"], ["planet", "3D career universe"], ["map", "Your roadmap"]],
  },
  parent: {
    acc: "#12a594",
    title: "Understand your child beyond marks.",
    text: "See your child's strengths, interests and personality — and have better career conversations at home.",
    cta: "Try the 2-minute Parent Mirror", href: "parents.html",
    mini: [["brain", "5 key dimensions"], ["file", "Clear report"], ["chat", "Conversation guide"]],
  },
  school: {
    acc: "#e0891f",
    title: "Structured career guidance, at scale.",
    text: "Run a career discovery experience for a whole grade — with a counsellor dashboard and parent reports.",
    cta: "Book a school demo", href: "schools.html",
    mini: [["users", "Grade-wide rollout"], ["chart", "Counsellor dashboard"], ["mail", "Parent reports"]],
  },
};

function initAudienceSwitch() {
  const seg = document.querySelector(".seg");
  const preview = document.getElementById("aud-preview");
  if (!seg || !preview) return;
  const thumb = seg.querySelector(".thumb");
  const btns = [...seg.querySelectorAll("button")];

  const show = (key) => {
    const a = AUDIENCES[key];
    btns.forEach((b) => b.setAttribute("aria-selected", b.dataset.aud === key));
    const active = btns.find((b) => b.dataset.aud === key);
    thumb.style.left = active.offsetLeft + "px";
    thumb.style.width = active.offsetWidth + "px";
    thumb.style.background = a.acc;
    preview.style.setProperty("--acc", a.acc);
    preview.innerHTML = `
      <div class="preview-body">
        <h3>${a.title}</h3>
        <p>${a.text}</p>
        <div class="row">
          <a class="btn btn--dyn btn--sm" href="${a.href}">${a.cta} ${ICONS.arrow}</a>
          <div class="mini">${a.mini.map(([i, t]) => `<span>${ICONS[i]}${t}</span>`).join("")}</div>
        </div>
      </div>`;
  };
  btns.forEach((b) => b.addEventListener("click", () => show(b.dataset.aud)));
  window.addEventListener("resize", () => show(btns.find((b) => b.getAttribute("aria-selected") === "true").dataset.aud));
  if (document.fonts) document.fonts.ready.then(() => show(btns.find((b) => b.getAttribute("aria-selected") === "true").dataset.aud));
  show("student");
}

function initHelix() {
  const svg = document.getElementById("helix");
  if (!svg) return;
  const NS = "http://www.w3.org/2000/svg";
  const COLORS = ["#6d4aff", "#12a594", "#f59e0b", "#2563eb", "#f2545b"];
  const N = 19, CX = 230, TOP = 24, GAP = 28, AMP = 112;
  const rungs = [];
  for (let i = 0; i < N; i++) {
    const line = document.createElementNS(NS, "line");
    const a = document.createElementNS(NS, "circle");
    const b = document.createElementNS(NS, "circle");
    line.setAttribute("stroke-width", "3.5"); line.setAttribute("stroke-linecap", "round");
    const col = COLORS[i % COLORS.length];
    line.setAttribute("stroke", col); a.setAttribute("fill", col); b.setAttribute("fill", "#14213d");
    svg.append(line, a, b);
    rungs.push({ line, a, b });
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let t = 0;
  const draw = () => {
    rungs.forEach((r, i) => {
      const ph = t + i * 0.42;
      const s = Math.sin(ph), c = Math.cos(ph);
      const y = TOP + i * GAP;
      const x1 = CX + AMP * s, x2 = CX - AMP * s;
      const front = c > 0;
      r.line.setAttribute("x1", x1); r.line.setAttribute("x2", x2);
      r.line.setAttribute("y1", y); r.line.setAttribute("y2", y);
      r.line.setAttribute("opacity", 0.25 + 0.35 * Math.abs(s));
      r.a.setAttribute("cx", x1); r.a.setAttribute("cy", y); r.a.setAttribute("r", front ? 9 : 5.5);
      r.b.setAttribute("cx", x2); r.b.setAttribute("cy", y); r.b.setAttribute("r", front ? 5.5 : 9);
      r.a.setAttribute("opacity", front ? 1 : 0.55);
      r.b.setAttribute("opacity", front ? 0.55 : 0.9);
    });
  };
  if (reduce) { draw(); return; }
  const loop = () => { t += 0.012; draw(); requestAnimationFrame(loop); };
  loop();
}

document.addEventListener("DOMContentLoaded", () => { initAudienceSwitch(); initHelix(); });
