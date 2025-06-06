#!/bin/bash

# Exit on any error
set -e

echo "Building the project..."
npm run build

echo "Deploying to GitHub Pages..."
# Clean up any existing gh-pages cache
rm -rf node_modules/.cache/gh-pages 2>/dev/null || true
rm -rf .git/worktrees/gh-pages 2>/dev/null || true

# Deploy with minimal options to avoid E2BIG error
cd dist
GIT_DISCOVERY_ACROSS_FILESYSTEM=1 npx gh-pages -d . --dest .
cd ..

echo "Deployment completed successfully!"

