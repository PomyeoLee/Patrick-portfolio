#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Check if gcloud CLI is installed
if ! command -v gcloud &> /dev/null
then
    echo "gcloud CLI could not be found. Please install it to proceed."
    exit 1
fi

PROJECT_ID="text-to-voice-two-people" 
SERVICE_NAME="pengyaoli-portfolio-service" # You can customize your service name
REGION="us-central1" # You can customize your region

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
  --project $PROJECT_ID

echo "Deployment complete!"
echo "You can find your service at: $(gcloud run services describe $SERVICE_NAME --project $PROJECT_ID --platform managed --region $REGION --format 'value(status.url)')"
