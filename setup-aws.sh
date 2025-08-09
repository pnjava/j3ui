#!/bin/bash

# Setup AWS CLI and SAM CLI on macOS
echo "🔧 Installing AWS CLI and SAM CLI..."

# Install AWS CLI
if ! command -v aws &> /dev/null; then
    echo "📦 Installing AWS CLI..."
    curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
    sudo installer -pkg AWSCLIV2.pkg -target /
    rm AWSCLIV2.pkg
else
    echo "✅ AWS CLI already installed"
fi

# Install SAM CLI
if ! command -v sam &> /dev/null; then
    echo "📦 Installing SAM CLI..."
    brew install aws-sam-cli
else
    echo "✅ SAM CLI already installed"
fi

echo "✅ Setup complete!"
echo "Now run: aws configure"
