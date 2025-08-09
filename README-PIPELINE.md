# AWS CodePipeline Setup for dbhds-tacts-ui

## Overview
Complete CI/CD pipeline for the React/TypeScript UI with multi-environment deployment (Dev → QA → UAT → Prod).

## Pipeline Stages
1. **Source** - GitHub integration via CodeStar connection
2. **Build** - Webpack build + unit tests
3. **Selenium Test** - Headless browser UI validation
4. **Integration Test** - Component integration tests
5. **Deploy Dev** - Automatic deployment to Dev environment
6. **Deploy QA** - Automatic deployment to QA environment
7. **Manual Approval** - Gate before UAT deployment
8. **Deploy UAT** - Deployment to UAT environment
9. **Manual Approval** - Gate before Production deployment
10. **Deploy Prod** - Production deployment

## Prerequisites

### 1. AWS Setup
```bash
# Create S3 buckets for each environment
aws s3 mb s3://dbhds-tacts-ui-artifacts-us-east-1
aws s3 mb s3://dbhds-tacts-ui-dev-us-east-1
aws s3 mb s3://dbhds-tacts-ui-qa-us-east-1
aws s3 mb s3://dbhds-tacts-ui-uat-us-east-1
aws s3 mb s3://dbhds-tacts-ui-prod-us-east-1
```

### 2. GitHub Connection
```bash
# Create CodeStar connection to GitHub
aws codestar-connections create-connection \
    --provider-type GitHub \
    --connection-name dbhds-tacts-ui-github
```

### 3. Update Parameters
Edit `deploy.sh` with your actual:
- AWS Account ID
- CodeStar Connection ID
- Bucket names (if different)

## Deployment

### Quick Deploy
```bash
chmod +x deploy.sh
./deploy.sh
```

### Manual Deploy
```bash
sam deploy \
    --template-file pipeline.yaml \
    --stack-name dbhds-tacts-ui-pipeline \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides \
        GitHubConnectionArn="arn:aws:codestar-connections:us-east-1:ACCOUNT:connection/ID" \
        ArtifactBucketName="your-artifacts-bucket" \
        DevBucketName="your-dev-bucket" \
        QABucketName="your-qa-bucket" \
        UATBucketName="your-uat-bucket" \
        ProdBucketName="your-prod-bucket"
```

## Testing

### Selenium Tests
- Validates UI renders correctly
- Checks for "DAP Dashboard" text
- Verifies no severe browser errors
- Runs in headless Chrome

### Integration Tests
- Uses existing Jest/Vitest setup
- Tests React components
- Validates service integrations

## Environment Configuration

Each environment bucket can serve static files via:
- S3 Static Website Hosting
- CloudFront distribution
- Application Load Balancer

## Security Features
- IAM roles with minimal permissions
- Manual approvals for UAT/Prod
- Artifact encryption in S3
- No hardcoded credentials

## Monitoring
- CloudWatch logs for all builds
- Pipeline execution history
- Build artifacts versioning
- Email notifications on failures

## Troubleshooting

### Common Issues
1. **GitHub Connection**: Ensure CodeStar connection is approved
2. **Permissions**: Verify IAM roles have S3 access
3. **Bucket Names**: Must be globally unique
4. **Node Version**: Pipeline uses Node.js 20

### Logs Location
- Build logs: CloudWatch → CodeBuild
- Pipeline logs: CodePipeline console
- Test results: Build artifacts