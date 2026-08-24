# Development Journey — Portfolio Website (no AI, human-paced)

Simulated **3-block** build of the personal portfolio **website only** (no project-detail dashboards / Databricks embeds).

Each folder is a **cumulative code snapshot**: Block 2 includes everything from Block 1; Block 3 includes everything from Block 2.

```
development-journey/
├── README.md                          ← you are here
├── CHANGELOG.md                       ← what changed between blocks
├── block-01-foundation/               ← v0.1.0  (~19.5h)
│   ├── WORK_LOG.md                    ← detailed daily log + debug time
│   ├── VERSION.md
│   └── [runnable Next.js source]
├── block-02-features/                 ← v0.2.0  (~19.0h)  ⊇ block-01
│   ├── WORK_LOG.md
│   ├── VERSION.md
│   └── [runnable Next.js source]
└── block-03-polish-deploy/            ← v0.3.0  (~17.5h)  ⊇ block-02
    ├── WORK_LOG.md
    ├── VERSION.md
    ├── Dockerfile / cloudbuild.yaml / deploy.sh
    └── [runnable Next.js source]
```

## Hours summary

| Block | Focus | Logged hours |
|-------|--------|-------------:|
| 01 | Scaffold, hero, about, experience | 19.5 |
| 02 | Projects, skills, certs, contact, motion | 19.0 |
| 03 | Polish, transcript, Docker, Cloud Run | 17.5 |
| | **Total** | **56.0** |

Each block is intentionally **≤ 20 hours**, with made-up-but-realistic debugging (hydration, Gmail SMTP, Docker PORT, etc.) baked into the logs.

## How to browse like a real project history

1. Open `block-01-foundation` — see the thin first version + read `WORK_LOG.md`.
2. Open `block-02-features` — same tree **plus** features; compare `app/page.tsx` size/sections.
3. Open `block-03-polish-deploy` — full shippable site + deploy scripts.

## How to run a snapshot locally

```bash
cd development-journey/block-0X-...
npm install
npm run dev
```

For Block 2/3 contact form, copy `.env.example` → `.env.local` (Block 3) and set Gmail App Password vars.

## Scope note

This journey covers the **portfolio website shell** only. Project deep-dive pages and embedded analytics dashboards are out of scope here (see main repo if needed).
