# Pinterest Feed Blocker

A browser extension that blocks distracting Pinterest content including the main feed, board recommendations, and related images.

## Installation

### Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select this folder
4. The extension will be active on Pinterest

### Firefox
1. Open Firefox and go to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from this folder
5. The extension will be active on Pinterest

## What it blocks

- Main Pinterest feed on the homepage
- "Find some ideas for this board" recommendations
- Related images and suggestions on individual pin pages
- Similar pins and "Ideas you might love" sections

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main blocking logic
- `styles.css` - CSS rules for hiding elements