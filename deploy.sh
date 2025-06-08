#!/bin/bash

# Exit on any error
set -e

echo "Building the project..."
npm run build

echo "Deploying to GitHub Pages..."
# Clean up any existing gh-pages cache
rm -rf node_modules/.cache/gh-pages 2>/dev/null || true
rm -rf .git/worktrees/gh-pages 2>/dev/null || true

# Deploy from project root to avoid E2BIG error
# Use --add to avoid removing existing files (reduces file operations)
# Use --nojekyll to add .nojekyll file automatically
TOKENIZERS_PARALLELISM=false npx gh-pages -d dist --add --nojekyll --dotfiles

echo "Deployment completed successfully!"

