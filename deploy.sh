#!/bin/bash

# Deploy script for dbhds-tacts-ui CodePipeline
# Usage: ./deploy.sh [stack-name] [region]

set -e

STACK_NAME=${1:-"dbhds-tacts-ui-pipeline"}
REGION=${2:-"us-east-1"}

echo "Deploying CodePipeline stack: $STACK_NAME in region: $REGION"

# Validate template
echo "Validating CloudFormation template..."
aws cloudformation validate-template \
    --template-body file://pipeline.yaml \
    --region $REGION

# Deploy with SAM
echo "Deploying pipeline..."
sam deploy \
    --template-file pipeline.yaml \
    --stack-name $STACK_NAME \
    --capabilities CAPABILITY_IAM \
    --region $REGION \
    --parameter-overrides \
        GitHubConnectionArn="arn:aws:codestar-connections:${REGION}:ACCOUNT_ID:connection/CONNECTION_ID" \
        ArtifactBucketName="dbhds-tacts-ui-artifacts-${REGION}" \
        DevBucketName="dbhds-tacts-ui-dev-${REGION}" \
        QABucketName="dbhds-tacts-ui-qa-${REGION}" \
        UATBucketName="dbhds-tacts-ui-uat-${REGION}" \
        ProdBucketName="dbhds-tacts-ui-prod-${REGION}" \
    --confirm-changeset

echo "Pipeline deployed successfully!"
echo "View pipeline at: https://console.aws.amazon.com/codesuite/codepipeline/pipelines/${STACK_NAME}-pipeline/view"