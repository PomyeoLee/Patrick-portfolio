# Block 02 — Features
**Milestone:** Block 1 + Projects + Skills + Certifications + Contact + Motion  
**Version:** `v0.2.0-features`  
**Logged hours:** **19.0 h** (target ≤ 20h)  
**Date range (simulated):** Day 5–9  
**Builds on:** `block-01-foundation` (`v0.1.0-foundation`) — this folder contains **all** Block 1 code plus new work.

---

## Goal
Turn the shell into a full portfolio page: featured project cards, skill badges, certifications, working contact form (Nodemailer), Framer Motion scroll/hero animations, particle/gradient backgrounds.

---

## What was carried over from Block 1 (unchanged intent)
- Next.js App Router scaffold, Tailwind, theme provider
- `information.md` + parser
- Hero / Navbar / About / Experience structure

## What was added in Block 2
- Projects grid (cards + GIFs/images)
- Technical Skills multi-column badges
- Certifications section (links + badges)
- Contact form + `app/actions.ts` (Zod + Nodemailer)
- Framer Motion wrappers (`animated-*`, `client-animations`)
- Particle + gradient backgrounds, scroll indicator, smooth scroll
- Expanded nav links (Projects / Skills / Contact)

---

## Daily work log

### Day 5 — Motion system + hero upgrade (4.5h)

| Time | Task | Hours | Notes |
|------|------|-------|-------|
| AM | Added `framer-motion`; researched `useInView` patterns | 1.0 | — |
| AM | Built `AnimatedSection` / `AnimatedCard` / `AnimatedText` | 1.5 | — |
| PM | **DEBUG:** SSR crash — `window` / motion in RSC. Switched to `dynamic(..., { ssr: false })` in `client-animations.tsx` | 1.25 | Error: “Text content does not match server-rendered HTML” |
| PM | Upgraded hero to use `ClientMotion` + staggered text | 0.75 | — |

**Day 5 total: 4.5h**

---

### Day 6 — Projects + assets (4.0h)

| Time | Task | Hours | Notes |
|------|------|-------|-------|
| AM | Wrote project blurbs (AI-Podcast, X-ray, COVID, Breast Cancer, Market Intel) | 1.25 | Edited for length 3× |
| AM | Exported / compressed GIFs into `public/images/` | 0.75 | Large GIF made page laggy |
| PM | Project card grid with badges + hover | 1.25 | — |
| PM | **DEBUG:** Next/Image + GIF layout shift; fixed aspect-video container | 0.75 | Also wrong query-string `?height=` did nothing |

**Day 6 total: 4.0h**

---

### Day 7 — Skills + certifications (3.5h)

| Time | Task | Hours | Notes |
|------|------|-------|-------|
| AM | Skills cards (6 categories × badge grid) | 1.5 | Reorganized labels after reading own resume |
| PM | Certifications section with external verify links | 1.25 | — |
| PM | **DEBUG:** Accredible badge images blocked / slow; added `referrerPolicy` + lazy load | 0.75 | One badge 404 until corrected credential URL |

**Day 7 total: 3.5h**

---

### Day 8 — Contact form + email (4.5h)

| Time | Task | Hours | Notes |
|------|------|-------|-------|
| AM | Built `ContactForm` UI + toast feedback | 1.25 | — |
| AM | Server action `sendContactEmail` + Zod schema | 1.0 | — |
| PM | **DEBUG:** Gmail “Invalid login” — normal password rejected | 1.5 | Had to enable 2FA + App Password; waited for Google account settings |
| PM | **DEBUG:** form submitted twice on slow network; disabled button while `isSubmitting` | 0.5 | — |
| PM | Wired contact section: form + social links side-by-side | 0.25 | — |

**Day 8 total: 4.5h**

---

### Day 9 — Particles, polish, regression (2.5h)

| Time | Task | Hours | Notes |
|------|------|-------|-------|
| AM | Particle background + animated gradient | 1.0 | — |
| AM | **DEBUG:** particles tanked FPS on laptop; reduced particle count + pause when tab hidden | 0.75 | — |
| PM | Mobile regression (nav + project cards + form) | 0.5 | Contact form fields too narrow on 320px — fixed grid |
| PM | Tag `v0.2.0-features` | 0.25 | — |

**Day 9 total: 2.5h**

---

## Bugs / dead ends (why this block took ~19h)

1. **Framer Motion + RSC / hydration** (~1.25h) — dynamic import with `ssr: false`.
2. **Gmail SMTP auth** (~1.5h) — App Passwords, wrong env var names (`EMAIL_PASS` vs `EMAIL_PASSWORD`).
3. **Particle performance** (~0.75h) — too many particles, forced reflow.
4. **GIF weight / CLS** (~0.75h) — aspect ratio wrappers.
5. **Badge image CDN flakiness** (~0.75h).

---

## Diff vs Block 1 (high level)

| Area | Block 1 | Block 2 |
|------|---------|---------|
| Sections | Hero, About, Experience | + Projects, Skills, Certs, Contact |
| Motion | None | Framer Motion + particles |
| Contact | — | Form + Nodemailer server action |
| Nav links | About, Experience | + Projects, Skills, Contact |
| Deps | Minimal | + framer-motion, zod, nodemailer, toast |

## Explicitly NOT in Block 2
- Transcript PDF viewer page
- Production Docker / Cloud Run deploy script
- Final certification hover polish / transcript chip on Experience
- Env wiring on Cloud Run

## Exit criteria checklist
- [x] All main sections on one page
- [x] Animations work without hydration errors
- [x] Contact form validates + sends (local `.env.local`)
- [x] Mobile usable
- [ ] Live production URL — deferred to Block 3
- [ ] Transcript page — deferred to Block 3

**Block 2 complete → handoff to Block 3**
