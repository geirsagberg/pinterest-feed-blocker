# CLAUDE.md

Pinterest Feed Blocker - Chrome/Firefox extension that blocks distracting Pinterest content with toggle functionality.

## Architecture

**Files:**
- `manifest.json` - Manifest V3 extension config
- `content.js` - Main content script
- `styles.css` - CSS blocking rules (blocks by default, unblocks via `data-pinterest-unblock`)
- `popup.html/popup.js` - Toggle interface

**Blocking:** CSS blocks feeds by default. JavaScript adds/removes `data-pinterest-unblock` attribute on document root for toggle functionality.

**Storage:** Uses `chrome.storage.sync` for toggle state persistence.

## Commands

**Icons:**
```bash
magick -background none icon.svg -resize 16x16 icon16.png
magick -background none icon.svg -resize 48x48 icon48.png  
magick -background none icon.svg -resize 128x128 icon128.png
```

**Load:** Chrome: `chrome://extensions/` | Firefox: `about:debugging`