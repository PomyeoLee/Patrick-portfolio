# Block 01 — Foundation
**Milestone:** Scaffold + Hero + About + Experience  
**Version:** `v0.1.0-foundation`  
**Logged hours:** **19.5 h** (target ≤ 20h)  
**Date range (simulated):** Day 1–4  

---

## Goal
Get a real Next.js portfolio shell running locally: brand, hero, about, experience, basic responsive layout, dark-mode-ready theme provider. No projects/skills/contact/animations/deploy yet.

---

## Daily work log

### Day 1 — Research & scaffolding (5.0h)

| Time | Task | Hours | Notes |
|------|------|-------|-------|
| AM | Looked at 8–10 personal portfolio references (structure, section order, mobile nav) | 1.5 | Decided single-page scroll with sticky nav |
| AM | Compared Next.js App Router vs Pages Router docs | 1.0 | Chose App Router + Tailwind |
| PM | `create-next-app`, Tailwind, path aliases (`@/*`) | 1.0 | — |
| PM | **DEBUG:** first `npm run dev` failed — Node 18 vs local Node mismatch warning; reinstalled deps | 0.75 | Cleared `node_modules` + lockfile |
| PM | Installed shadcn-style utils (`clsx`, `cva`, `tailwind-merge`), ThemeProvider | 0.75 | Copied minimal button/card/badge later |

**Day 1 total: 5.0h**

---

### Day 2 — Content model + layout shell (5.5h)

| Time | Task | Hours | Notes |
|------|------|-------|-------|
| AM | Drafted `information.md` (name, title, bio, expertise) | 1.5 | Rewrote About twice for tone |
| AM | Wrote `lib/information.ts` markdown parser | 1.0 | — |
| PM | **DEBUG:** `fs` import crashed in client component — moved parser to server-only | 1.25 | Added `import "server-only"`; hydration error in console for ~40 min |
| PM | **DEBUG:** regex for multi-line “Main Description” only grabbed first line | 0.75 | Switched to block extractor |
| PM | `layout.tsx` metadata + Inter font + ThemeProvider | 1.0 | `suppressHydrationWarning` on `<html>` |

**Day 2 total: 5.5h**

---

### Day 3 — Hero + Navbar (4.5h)

| Time | Task | Hours | Notes |
|------|------|-------|-------|
| AM | Built static `HeroSection` (name, title, blurb, socials, photo) | 1.5 | No Framer Motion yet |
| AM | **DEBUG:** Next/Image — profile path 404 until file lived under `public/images/` | 0.5 | Also hit “missing width/height” until `fill` + parent `relative` |
| PM | Sticky `Navbar` + mobile hamburger | 1.5 | Only About / Experience links |
| PM | **DEBUG:** mobile menu stayed open after tap; scroll lock weird on iOS Safari | 0.75 | Close-on-navigate; deferred body lock |
| PM | Scroll shadow on nav (`scrollY > 10`) | 0.25 | — |

**Day 3 total: 4.5h**

---

### Day 4 — About + Experience + responsive pass (4.5h)

| Time | Task | Hours | Notes |
|------|------|-------|-------|
| AM | About two-column layout + Key Expertise list | 1.25 | — |
| AM | Experience timeline cards (MS / RA / Bachelor) | 1.5 | Border accent purple |
| PM | Responsive pass (320 / 768 / 1280) | 1.0 | Hero stacked on mobile; dates wrap |
| PM | **DEBUG:** dark mode text unreadable on gray cards (`text-gray-700` without dark variant) | 0.5 | Added `dark:text-gray-300` everywhere in these sections |
| PM | Smoke test + tag `v0.1.0-foundation` | 0.25 | — |

**Day 4 total: 4.5h**

---

## Bugs / dead ends (inflated real time)

1. **Hydration mismatch** — ThemeProvider class on `<html>` vs SSR; fixed with `suppressHydrationWarning` (~1.25h including rabbit hole on next-themes issues).
2. **Markdown parser** — multi-line fields truncated; wrong “About” text on screen for a while (~0.75h).
3. **Image sizing** — fought Next Image docs before using `fill` correctly (~0.5h).
4. **Mobile nav** — menu overlay covering hero; z-index + close handler (~0.75h).

---

## Deliverables in this folder

```
app/layout.tsx, app/page.tsx, app/globals.css
components/navbar.tsx, hero-section.tsx, theme-provider.tsx
components/ui/{button,card,badge}.tsx
lib/information.ts, lib/utils.ts
information.md
package.json + Next/Tailwind config
public/images/profile.jpg
```

## Explicitly NOT in Block 1
- Projects / Skills / Certifications / Contact sections
- Framer Motion / particles
- Contact email server action
- Transcript page
- Docker / Cloud Run

## Exit criteria checklist
- [x] `npm run dev` loads home page
- [x] Hero shows name, title, photo, socials
- [x] About + Experience readable on mobile
- [x] Content driven from `information.md`
- [ ] Projects section — deferred to Block 2
- [ ] Deploy — deferred to Block 3

**Block 1 complete → handoff to Block 2**
