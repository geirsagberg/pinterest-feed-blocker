#!/bin/bash

# Pinterest Feed Blocker - Build Script
# Creates a zip file ready for Chrome Web Store submission

set -e

# Clean any existing builds
rm -f pinterest-feed-blocker.zip

# Create zip with extension files only
zip -r pinterest-feed-blocker.zip \
  manifest.json \
  content.js \
  popup.html \
  popup.js \
  styles.css \
  icon16.png \
  icon48.png \
  icon128.png

echo "✅ Extension packaged: pinterest-feed-blocker.zip"
echo "📦 Ready for Chrome Web Store submission"