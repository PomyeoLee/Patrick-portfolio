#!/bin/bash
# Block 3 — Cloud Run deploy for portfolio website
set -e

if [ -f ".env.local" ]; then
  set -a
  # shellcheck disable=SC1091
  source ".env.local"
  set +a
fi

if ! command -v gcloud &> /dev/null; then
  echo "gcloud CLI could not be found. Please install it to proceed."
  exit 1
fi

PROJECT_ID="${GCP_PROJECT_ID:-text-to-voice-two-people}"
SERVICE_NAME="pengyaoli-portfolio-service"
REGION="us-central1"

# Optional contact-form env (pass through if present)
ENV_VARS=""
if [ -n "${EMAIL_USER}" ] && [ -n "${EMAIL_PASS}" ]; then
  ENV_VARS="EMAIL_USER=${EMAIL_USER},EMAIL_PASS=${EMAIL_PASS}"
fi

echo "Setting GCP project to $PROJECT_ID..."
gcloud config set project "$PROJECT_ID"

echo "Submitting build to Cloud Build..."
gcloud builds submit --config cloudbuild.yaml .

echo "Deploying service to Cloud Run..."
if [ -n "$ENV_VARS" ]; then
  gcloud run deploy "$SERVICE_NAME" \
    --image "gcr.io/$PROJECT_ID/$SERVICE_NAME:latest" \
    --platform managed \
    --region "$REGION" \
    --allow-unauthenticated \
    --set-env-vars "$ENV_VARS" \
    --project "$PROJECT_ID"
else
  gcloud run deploy "$SERVICE_NAME" \
    --image "gcr.io/$PROJECT_ID/$SERVICE_NAME:latest" \
    --platform managed \
    --region "$REGION" \
    --allow-unauthenticated \
    --project "$PROJECT_ID"
  echo "NOTE: EMAIL_USER / EMAIL_PASS not set — contact form will not send until env is configured."
fi

echo "Deployment complete!"
echo "URL: $(gcloud run services describe $SERVICE_NAME --project $PROJECT_ID --platform managed --region $REGION --format 'value(status.url)')"
