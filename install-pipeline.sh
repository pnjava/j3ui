#!/bin/bash

# Installation script for dbhds-tacts-ui CodePipeline
# Run this after setting up AWS credentials

set -e

echo "🚀 Installing dbhds-tacts-ui CodePipeline..."

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install it first."
    exit 1
fi

# Check SAM CLI
if ! command -v sam &> /dev/null; then
    echo "❌ SAM CLI not found. Please install it first."
    exit 1
fi

# Get AWS account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION=$(aws configure get region || echo "us-east-1")

echo "📋 Account ID: $ACCOUNT_ID"
echo "📋 Region: $REGION"

# Create S3 buckets
echo "📦 Creating S3 buckets..."
aws s3 mb s3://dbhds-tacts-ui-artifacts-${ACCOUNT_ID} --region $REGION || true
aws s3 mb s3://dbhds-tacts-ui-dev-${ACCOUNT_ID} --region $REGION || true
aws s3 mb s3://dbhds-tacts-ui-qa-${ACCOUNT_ID} --region $REGION || true
aws s3 mb s3://dbhds-tacts-ui-uat-${ACCOUNT_ID} --region $REGION || true
aws s3 mb s3://dbhds-tacts-ui-prod-${ACCOUNT_ID} --region $REGION || true

# Create GitHub connection (manual step required)
echo "🔗 Creating GitHub connection..."
CONNECTION_ARN=$(aws codestar-connections create-connection \
    --provider-type GitHub \
    --connection-name dbhds-tacts-ui-github-$(date +%s) \
    --query ConnectionArn --output text)

echo "⚠️  IMPORTANT: Go to AWS Console and complete the GitHub connection:"
echo "   https://console.aws.amazon.com/codesuite/settings/connections"
echo "   Connection ARN: $CONNECTION_ARN"
echo ""
read -p "Press Enter after completing the GitHub connection setup..."

# Deploy pipeline
echo "🚀 Deploying pipeline..."
sam deploy \
    --template-file pipeline.yaml \
    --stack-name dbhds-tacts-ui-pipeline \
    --capabilities CAPABILITY_IAM \
    --region $REGION \
    --parameter-overrides \
        GitHubConnectionArn="$CONNECTION_ARN" \
        ArtifactBucketName="dbhds-tacts-ui-artifacts-${ACCOUNT_ID}" \
        DevBucketName="dbhds-tacts-ui-dev-${ACCOUNT_ID}" \
        QABucketName="dbhds-tacts-ui-qa-${ACCOUNT_ID}" \
        UATBucketName="dbhds-tacts-ui-uat-${ACCOUNT_ID}" \
        ProdBucketName="dbhds-tacts-ui-prod-${ACCOUNT_ID}" \
    --confirm-changeset

echo "✅ Pipeline installed successfully!"
echo "🌐 View at: https://console.aws.amazon.com/codesuite/codepipeline/pipelines/dbhds-tacts-ui-pipeline-pipeline/view"