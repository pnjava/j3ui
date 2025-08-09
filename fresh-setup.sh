#!/bin/bash

set -e

ACCOUNT_ID=905418042943
REGION=us-east-1

echo "🚀 Fresh pipeline setup..."

# 1. Create new GitHub connection
echo "📱 Creating GitHub connection..."
CONNECTION_OUTPUT=$(aws codestar-connections create-connection \
    --provider-type GitHub \
    --connection-name dbhds-tacts-ui-$(date +%s) \
    --region $REGION)

CONNECTION_ARN=$(echo $CONNECTION_OUTPUT | jq -r '.ConnectionArn')
echo "Connection ARN: $CONNECTION_ARN"

# 2. Delete existing stack
echo "🗑️ Deleting existing stack..."
aws cloudformation delete-stack --stack-name dbhds-tacts-ui-pipeline --region $REGION || true
echo "Waiting for stack deletion..."
aws cloudformation wait stack-delete-complete --stack-name dbhds-tacts-ui-pipeline --region $REGION || true

# 3. Deploy new pipeline
echo "🚀 Deploying fresh pipeline..."
sam deploy --template-file pipeline.yaml \
    --stack-name dbhds-tacts-ui-pipeline \
    --capabilities CAPABILITY_IAM \
    --region $REGION \
    --parameter-overrides \
        GitHubConnectionArn=$CONNECTION_ARN \
        ArtifactBucketName=dbhds-tacts-ui-artifacts-$ACCOUNT_ID \
        DevBucketName=dbhds-tacts-ui-dev-$ACCOUNT_ID \
        QABucketName=dbhds-tacts-ui-qa-$ACCOUNT_ID \
        UATBucketName=dbhds-tacts-ui-uat-$ACCOUNT_ID \
        ProdBucketName=dbhds-tacts-ui-prod-$ACCOUNT_ID \
    --no-confirm-changeset

echo "✅ Pipeline deployed!"
echo "🔗 IMPORTANT: Approve GitHub connection at:"
echo "   https://console.aws.amazon.com/codesuite/settings/connections"
echo "   Connection ARN: $CONNECTION_ARN"