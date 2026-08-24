# Changelog across development blocks

## v0.1.0-foundation → v0.2.0-features

### Added
- Projects section (feature cards + images/GIFs)
- Technical Skills section (6 category cards)
- Certifications section (external verify links)
- Contact form + `app/actions.ts` (Zod validation, Nodemailer)
- Framer Motion animation system (`animated-*`, `client-animations`)
- Particle background + animated gradient background
- Scroll indicator + smooth scroll helpers
- Toast notifications for form feedback
- Nav links: Projects, Skills, Contact

### Changed
- Hero upgraded from static markup to motion-driven entrance
- Navbar uses Framer Motion + AnimatePresence mobile menu
- `package.json` gains framer-motion, zod, nodemailer, toast deps
- `layout.tsx` mounts `<Toaster />`

### Still missing (→ Block 3)
- Transcript page
- Docker / Cloud Run deploy
- Final certification / experience hover polish

---

## v0.2.0-features → v0.3.0-polish-deploy

### Added
- `app/transcript/page.tsx` + `public/transcript.pdf`
- Experience “View transcript” entry point
- `Dockerfile`, `cloudbuild.yaml`, `deploy.sh`
- `.env.example` for production email env
- Project README with live deploy instructions

### Changed
- Certification cards: badge imagery + hover polish
- Experience cards: publication chips / focus handling cleaned up
- Contact section retains form + socials (from Block 2)
- `package.json` version → `0.3.0`

### Fixed (see WORK_LOG)
- Nested interactive elements in experience cards
- PDF iframe blank on some mobile browsers (Open PDF fallback)
- Container PORT 8080 for Cloud Run
- Email env vars missing on Cloud Run
- Case-sensitive static asset paths in Linux image

---

## File growth (approx.)

| Snapshot | Notable `app/page.tsx` | New major modules |
|----------|------------------------|-------------------|
| Block 01 | ~220 lines, 2 content sections after hero | navbar, hero, information parser |
| Block 02 | ~1000+ lines, full sections | contact form, actions, motion, particles |
| Block 03 | ~1000+ lines + `/transcript` | Dockerfile, deploy.sh, transcript |
