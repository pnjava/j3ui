# DBHDS TACTS UI - Developer Guide

## Overview
React/TypeScript single-page application built with single-spa framework for DBHDS TACTS system.

## Quick Start

### Prerequisites
- Node.js 20+
- npm 8+
- Git

### Local Development Setup

1. **Clone and Install**
```bash
git clone https://github.com/pnjava/j3ui.git
cd j3ui
npm install --legacy-peer-deps
```

2. **Start Development Server**
```bash
npm start
# App runs on http://localhost:8087
```

3. **Available Scripts**
```bash
npm start              # Development server
npm run build          # Production build
npm test               # Run tests
npm run lint           # Lint code
npm run format         # Format code
```

## Project Structure
```
src/
├── components/        # React components
├── pages/            # Page components
├── services/         # API services
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── assets/           # Static assets
└── _tests_/          # Test files
```

## Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and test locally
npm start
npm test

# Commit changes
git add .
git commit -m "feat: add new feature"
git push origin feature/your-feature-name
```

### 2. Code Quality
```bash
# Run linting
npm run lint

# Format code
npm run format

# Run tests with coverage
npm run coverage
```

### 3. Testing
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Component integration tests
- **E2E Tests**: Selenium (runs in CI/CD)

```bash
# Run all tests
npm test

# Watch mode for development
npm run watch-tests
```

## CI/CD Pipeline

### Pipeline Stages
1. **Source** - GitHub integration
2. **Build** - Webpack build + unit tests
3. **Selenium Test** - UI validation
4. **Integration Test** - Component tests
5. **Deploy Dev** - Automatic
6. **Deploy QA** - Manual approval required
7. **Deploy UAT** - Manual approval required
8. **Deploy Prod** - Manual approval required

### Deployment Environments
- **Dev**: `http://dbhds-tacts-ui-dev-905418042943.s3-website-us-east-1.amazonaws.com`
- **QA**: `http://dbhds-tacts-ui-qa-905418042943.s3-website-us-east-1.amazonaws.com`
- **UAT**: `http://dbhds-tacts-ui-uat-905418042943.s3-website-us-east-1.amazonaws.com`
- **Prod**: `http://dbhds-tacts-ui-prod-905418042943.s3-website-us-east-1.amazonaws.com`

### Triggering Deployments
```bash
# Push to main branch triggers pipeline
git push origin main

# View pipeline status
https://console.aws.amazon.com/codesuite/codepipeline/pipelines/dbhds-tacts-ui-pipeline-pipeline/view
```

## AWS Infrastructure Setup

### For DevOps/Admin Only

1. **Prerequisites**
```bash
# Install AWS CLI and SAM
brew install awscli aws-sam-cli

# Configure AWS credentials
aws configure
```

2. **Deploy Pipeline**
```bash
# Fresh setup (recommended)
./fresh-setup.sh

# Manual setup
./install-pipeline.sh
```

3. **Approve GitHub Connection**
- Go to AWS Console → CodeSuite → Settings → Connections
- Click "Update pending connection"
- Authorize with GitHub

## Environment Configuration

### Local Development
```bash
# Create .env file
cp .env.example .env

# Edit environment variables
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_ENV=development
```

### Build Configuration
- **Webpack**: `webpack.config.js`
- **TypeScript**: `tsconfig.json`
- **Babel**: `babel.config.json`
- **Jest**: `jest.config.js`

## API Integration

### Service Layer
```typescript
// Example API call
import { RestService } from './services/RestService';

const data = await RestService.get('/api/endpoint');
```

### Mock Data
- Development mocks in `src/__mock__/`
- Test data for local development

## Troubleshooting

### Common Issues

1. **Build Failures**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

2. **Test Failures**
```bash
# Update test snapshots
npm test -- --updateSnapshot
```

3. **Pipeline Failures**
- Check GitHub connection approval
- Verify S3 bucket permissions
- Review CloudWatch logs

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm start
```

## Code Standards

### TypeScript
- Strict mode enabled
- Interface definitions required
- No `any` types allowed

### React
- Functional components with hooks
- Props interface definitions
- Error boundaries for error handling

### Testing
- Minimum 80% code coverage
- Component testing required
- Integration tests for critical paths

### Git Workflow
- Feature branches from `main`
- Pull request reviews required
- Conventional commit messages

## Performance

### Bundle Analysis
```bash
npm run analyze
```

### Optimization
- Code splitting implemented
- Lazy loading for routes
- Asset optimization in webpack

## Security

### Dependencies
```bash
# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix
```

### Environment Variables
- No secrets in code
- Use AWS Parameter Store for sensitive data
- Environment-specific configurations

## Support

### Documentation
- [AWS CodePipeline Guide](./README-PIPELINE.md)
- [Component Documentation](./docs/components.md)
- [API Documentation](./docs/api.md)

### Contacts
- **Development Team**: dev-team@dbhds.virginia.gov
- **DevOps Support**: devops@dbhds.virginia.gov
- **Project Manager**: pm@dbhds.virginia.gov

### Monitoring
- **Pipeline Status**: AWS CodePipeline Console
- **Application Logs**: CloudWatch Logs
- **Error Tracking**: Application error boundaries

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request
5. Code review and approval
6. Merge to main triggers deployment

---

**Last Updated**: $(date)
**Version**: 1.0.0