#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Load local env (optional). Cloud Run does NOT read .env.local automatically.
# This lets you deploy with the same env vars you use locally.
if [ -f ".env.local" ]; then
  set -a
  # shellcheck disable=SC1091
  source ".env.local"
  set +a
fi

# Check if gcloud CLI is installed
if ! command -v gcloud &> /dev/null
then
    echo "gcloud CLI could not be found. Please install it to proceed."
    exit 1
fi

PROJECT_ID="text-to-voice-two-people" 
SERVICE_NAME="pengyaoli-portfolio-service" # You can customize your service name
REGION="us-central1" # You can customize your region

required_env_vars=(
  "DATABRICKS_WORKSPACE_URL"
  "DATABRICKS_WORKSPACE_ID"
  "DATABRICKS_DASHBOARD_ID"
  "DATABRICKS_CLIENT_ID"
  "DATABRICKS_CLIENT_SECRET"
)

missing=0
for v in "${required_env_vars[@]}"; do
  if [ -z "${!v}" ]; then
    echo "Missing required env var: $v"
    missing=1
  fi
done

if [ "$missing" -ne 0 ]; then
  echo ""
  echo "Fix:"
  echo "- Set these in your shell, OR create a .env.local with them (do not commit it)."
  echo "- Cloud Run needs them via --set-env-vars / Secret Manager; it won't read .env.local on its own."
  exit 1
fi

ENV_VARS="DATABRICKS_WORKSPACE_URL=${DATABRICKS_WORKSPACE_URL},DATABRICKS_WORKSPACE_ID=${DATABRICKS_WORKSPACE_ID},DATABRICKS_DASHBOARD_ID=${DATABRICKS_DASHBOARD_ID},DATABRICKS_CLIENT_ID=${DATABRICKS_CLIENT_ID},DATABRICKS_CLIENT_SECRET=${DATABRICKS_CLIENT_SECRET}"

# Optional vars
if [ -n "${DATABRICKS_EXTERNAL_VIEWER_ID}" ]; then
  ENV_VARS="${ENV_VARS},DATABRICKS_EXTERNAL_VIEWER_ID=${DATABRICKS_EXTERNAL_VIEWER_ID}"
fi
if [ -n "${DATABRICKS_EXTERNAL_VALUE}" ]; then
  ENV_VARS="${ENV_VARS},DATABRICKS_EXTERNAL_VALUE=${DATABRICKS_EXTERNAL_VALUE}"
fi

echo "Setting GCP project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

echo "Submitting build to Cloud Build..."
gcloud builds submit --config cloudbuild.yaml .

echo "Deploying service to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME:latest \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars "$ENV_VARS" \
  --project $PROJECT_ID

echo "Deployment complete!"
echo "You can find your service at: $(gcloud run services describe $SERVICE_NAME --project $PROJECT_ID --platform managed --region $REGION --format 'value(status.url)')"
