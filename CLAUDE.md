# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pinterest Feed Blocker is a browser extension (Chrome/Firefox compatible) that selectively blocks distracting Pinterest content including feeds, recommendations, and related images. The extension features a toggle mechanism allowing users to enable/disable blocking via a popup interface.

## Architecture

### Core Components

**Manifest V3 Extension Structure:**
- `manifest.json` - Extension configuration with Manifest V3 format
- `content.js` - Main content script that runs on Pinterest pages
- `styles.css` - Conditional CSS rules that only apply when blocking is enabled
- `popup.html/popup.js` - Toggle interface for enabling/disabling the extension

### Blocking Mechanism

The extension uses a hybrid approach combining CSS and JavaScript:

1. **CSS-based blocking**: Conditional styles that only apply when `html[data-pinterest-blocker-enabled="true"]`
2. **JavaScript-based blocking**: Dynamic element hiding with tracking for toggle functionality
3. **State management**: Uses Chrome storage API to persist enabled/disabled state

### Toggle System

The extension implements a sophisticated toggle system:
- **HTML attribute control**: Sets `data-pinterest-blocker-enabled` on document root
- **Element tracking**: Maintains a Set of hidden elements for restoration
- **Bidirectional communication**: Popup communicates with content script via `chrome.runtime.onMessage`

### Target Selectors

The blocking targets specific Pinterest UI elements:
- Main feeds: `[data-test-id="homefeed-feed"]`, `[data-test-id="grid"]`, `[data-test-id="masonry"]`
- Board recommendations: `.moreIdeasOnBoard`, `a[href*="more-ideas"]`
- Related content: `[data-test-id="related-pins"]`, `.IdeasYouMightLove`

## Development Commands

### Icon Generation
```bash
magick -background none icon.svg -resize 16x16 icon16.png
magick -background none icon.svg -resize 48x48 icon48.png  
magick -background none icon.svg -resize 128x128 icon128.png
```

### Extension Loading
**Chrome**: Load unpacked from `chrome://extensions/` with Developer mode enabled
**Firefox**: Load temporary add-on from `about:debugging` → This Firefox

## Key Implementation Details

### CSS Conditional Loading
All blocking styles are prefixed with `html[data-pinterest-blocker-enabled="true"]` to ensure they only apply when the extension is active.

### Dynamic Content Handling
Uses `MutationObserver` to handle Pinterest's dynamic content loading with performance throttling (100ms debounce).

### State Persistence
Extension state is stored via `chrome.storage.sync` and defaults to enabled (`true`) if no previous state exists.

### Error Handling
The content script includes fallbacks for XPath operations and graceful handling of missing DOM elements during Pinterest's dynamic loading.