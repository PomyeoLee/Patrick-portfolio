# Block 03 — Polish & Deploy
**Milestone:** Block 2 + transcript page + visual polish + Cloud Run deploy  
**Version:** `v0.3.0-polish-deploy`  
**Logged hours:** **17.5 h** (target ≤ 20h)  
**Date range (simulated):** Day 10–14  
**Builds on:** `block-02-features` (`v0.2.0-features`) — this folder contains **all** Block 1 + Block 2 code plus final work.

---

## Goal
Ship a production portfolio: polish UX details, add transcript viewer, containerize, deploy to Google Cloud Run, fix production-only bugs, configure email env on the server.

---

## What was carried over from Block 2
- Full homepage sections + motion + contact form
- All assets, configs, content pipeline

## What was added in Block 3
- `/transcript` page + `public/transcript.pdf`
- Experience “View transcript” chip / link polish
- Certification card hover / badge layout polish
- `Dockerfile` (Bun multi-stage) + `cloudbuild.yaml` + `deploy.sh`
- `.env.example` for Cloud Run / local email
- Production README deploy instructions
- Final responsive / Safari / dark-mode fixes

---

## Daily work log

### Day 10 — Visual polish pass (4.0h)

| Time | Task | Hours | Notes |
|------|------|-------|-------|
| AM | Certification cards: badge images, hover overlay, ExternalLink affordance | 1.5 | — |
| AM | Experience publication hover chips (RA publications) | 1.0 | Nested `<a>` inside clickable card caused invalid HTML — reworked |
| PM | **DEBUG:** nested interactive elements / focus rings fighting each other | 1.0 | Split absolute hit-area vs chip links with `z-index` |
| PM | Spacing / typography consistency pass | 0.5 | — |

**Day 10 total: 4.0h**

---

### Day 11 — Transcript page (3.0h)

| Time | Task | Hours | Notes |
|------|------|-------|-------|
| AM | Added `app/transcript/page.tsx` + PDF in `public/` | 1.0 | — |
| AM | Linked from Experience (MS card) | 0.5 | — |
| PM | **DEBUG:** PDF iframe blank on mobile Safari | 1.25 | Added “Open PDF” fallback button; some browsers block embed |
| PM | Dark-mode chrome around iframe | 0.25 | — |

**Day 11 total: 3.0h**

---

### Day 12 — Dockerize (4.5h)

| Time | Task | Hours | Notes |
|------|------|-------|-------|
| AM | Wrote multi-stage `Dockerfile` (install → build → run) | 1.25 | Chose Bun to match local lockfile experiments |
| AM | **DEBUG:** `bun install --frozen-lockfile` failed — lockfile out of sync with package.json | 1.0 | Regenerated lock / temporarily used non-frozen |
| PM | **DEBUG:** container listened on 3000 but Cloud Run expects `$PORT` (8080) | 1.0 | Set `ENV PORT 8080` + `EXPOSE 8080` |
| PM | **DEBUG:** build OOM on small Cloud Build machine once; retried | 0.75 | — |
| PM | `cloudbuild.yaml` image tag wiring | 0.5 | — |

**Day 12 total: 4.5h**

---

### Day 13 — Cloud Run deploy + env (4.0h)

| Time | Task | Hours | Notes |
|------|------|-------|-------|
| AM | gcloud auth / project / APIs enable (Cloud Run, Cloud Build, GCR) | 1.0 | Billing account already existed |
| AM | First `bash deploy.sh` — image builds, service creates | 0.75 | — |
| PM | **DEBUG:** site live but contact form 500 — env vars not on Cloud Run | 1.25 | `.env.local` is local-only; wired `--set-env-vars` in deploy.sh |
| PM | **DEBUG:** cold start + Image 404 for one GIF (case-sensitive path in Linux container) | 0.75 | Filename case mismatch `Xray` vs `xray` |
| PM | Smoke test checklist on live URL | 0.25 | — |

**Day 13 total: 4.0h**

---

### Day 14 — Final QA + wrap (2.0h)

| Time | Task | Hours | Notes |
|------|------|-------|-------|
| AM | Cross-browser: Chrome / Firefox / Safari iOS | 1.0 | Smooth-scroll + sticky nav glitch on iOS — minor |
| AM | Lighthouse quick pass (perf warnings from GIFs — accepted) | 0.5 | — |
| PM | README deploy docs + `.env.example` + tag `v0.3.0-polish-deploy` | 0.5 | — |

**Day 14 total: 2.0h**

---

## Bugs / dead ends (why deploy ate time)

1. **Nested links in Experience cards** (~1.0h).
2. **PDF iframe on iOS** (~1.25h) — fallback link required.
3. **Docker lockfile / Bun** (~1.0h).
4. **PORT 8080 for Cloud Run** (~1.0h) — classic “works on laptop, fails in prod”.
5. **Email env not on Cloud Run** (~1.25h).
6. **Case-sensitive static assets in Linux** (~0.75h).

---

## Diff vs Block 2 (high level)

| Area | Block 2 | Block 3 |
|------|---------|---------|
| Transcript | — | `/transcript` + PDF |
| Experience | Plain MS card | Transcript chip / polish |
| Certs | Basic links | Badge + hover polish |
| Deploy | Local only | Docker + Cloud Build + Cloud Run |
| Env | `.env.local` only | Documented + injected on deploy |

## Exit criteria checklist
- [x] Live Cloud Run URL responds
- [x] All sections + motion OK in prod
- [x] Contact form works with Cloud Run env
- [x] Transcript opens / downloadable
- [x] Mobile acceptable
- [x] Deploy reproducible via `bash deploy.sh`

**Block 3 complete — website shipped.**

---

## Cumulative hours (all blocks)

| Block | Hours |
|-------|------:|
| 01 Foundation | 19.5 |
| 02 Features | 19.0 |
| 03 Polish & Deploy | 17.5 |
| **Total** | **56.0** |
