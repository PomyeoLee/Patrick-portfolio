# Pengyao Li — Personal Portfolio

Personal portfolio website built with Next.js 14, showcasing data science and machine learning projects.

**Live site:** https://pengyaoli-portfolio-service-ajp2jwa4ba-uc.a.run.app

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Animation:** Framer Motion
- **Deployment:** Google Cloud Run via Cloud Build + Docker
- **Contact form:** Nodemailer (Gmail SMTP)

## Project Structure

```
├── app/
│   ├── page.tsx                          # Main portfolio page
│   ├── project-detail-covid/             # COVID-19 mobility analysis project
│   └── project-detail-breastcancer/      # Breast cancer classification project
├── components/                           # Reusable UI components
├── public/images/                        # Project images and GIFs
├── information.md                        # Personal info config (edit this to update content)
├── Dockerfile                            # Container config for Cloud Run
├── cloudbuild.yaml                       # Google Cloud Build config
└── deploy.sh                             # One-command deployment script
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000
```

## Updating Content

Edit `information.md` to update name, title, links, bio, and skills. The file is parsed at build time by `lib/information.ts`.

## Deployment

Requires [gcloud CLI](https://cloud.google.com/sdk/docs/install) with an authenticated account.

```bash
bash deploy.sh
```

This will:
1. Submit a Docker build to Google Cloud Build
2. Push the image to Google Container Registry
3. Deploy a new revision to Cloud Run

## Environment Variables

For the contact form to work, set these in Cloud Run (or `.env.local` for local testing):

| Variable | Description |
|---|---|
| `EMAIL_USER` | Gmail address used to send emails |
| `EMAIL_PASS` | Gmail App Password (not your account password) |
