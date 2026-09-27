# myCareerDNA — marketing website (v1)

Static, zero-build site: plain HTML + CSS + vanilla JS. Open `index.html` directly in a browser, or run
`python -m http.server` in this folder and visit http://localhost:8000.

## Pages
| Page | Purpose |
|---|---|
| `index.html` | Home: "Who are you exploring for?" chooser → audience cards → Methodology (DISCOVER → UNDERSTAND → EXPLORE → DECIDE → PLAN) + 5 assessment dimensions → student & parent benefits → "More than a career test" (why parents trust) → Student/Parent/School tabs → school model flow → testimonials → founder's story → CTA |
| `parents.html` | Parent landing page (convince parents): problem, 2-Minute Parent Mirror, sample report, trust, plans, FAQ |
| `students.html` | Student landing page: journey, what you'll discover, career universe, school-code / on-your-own start |
| `schools.html` | School landing page: 6-step school model, counsellor dashboard, features, 4-week rollout, demo request form, FAQ |

## Structure
- `css/styles.css` — all styles (design tokens at the top)
- `js/home.js` — homepage-only: audience switch + animated CareerDNA helix
- `js/main.js` — shared header/footer, icon set (`<i data-icon="name">`), tabs, mobile nav, scroll reveal, demo forms
- `assets/` — placeholder images cropped from the design mockup (low-res — replace with real photography)

## Pending inputs from client (placeholders on the site)
- [ ] **Assessment tools** — confirm with Alisha which instruments are used (DISC, Holland/RIASEC, aptitude, values, learning style…). Update the `.dim-tool` tags in `index.html` (#method).
- [ ] **Testimonials** — currently SAMPLE quotes with placeholder names. Replace with real, consented feedback.
- [x] **Founder** — About section (index.html #founder) built from Amrita Joshi's portfolio (amrita-portfolio-wine.vercel.app). Photo loads from that site; to self-host, save it as `assets/amrita.jpg` and update the `src`.
- [ ] **Confirm years of experience** — client brief said "17 years in the corporate world"; portfolio says 14+ years in L&D. Site currently uses 14+.
- [ ] **Pricing** for parent plans (parents.html #start) — shown as "₹ —".
- [ ] **Assessment duration** (FAQ on parents & schools pages).
- [ ] **Contact email** (footer uses hello@mycareerdna.in as a placeholder) and form backend (forms are demo-only; see `initForms` in main.js).
- [ ] Hi-res photos for hero, student, parent, school.
