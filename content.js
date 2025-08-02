// Pinterest Feed Blocker Content Script
(function() {
    'use strict';

    let isEnabled = true;

    // Function to toggle blocking state
    function toggleBlocking(enabled) {
        isEnabled = enabled;
        // Set the HTML attribute to control CSS blocking
        document.documentElement.setAttribute('data-pinterest-blocker-enabled', enabled.toString());
    }

    // Set blocking enabled by default immediately (before storage loads)
    document.documentElement.setAttribute('data-pinterest-blocker-enabled', 'true');

    // Load initial state from storage and update if needed
    chrome.storage.sync.get(['enabled'], function(result) {
        isEnabled = result.enabled !== false; // default to true
        document.documentElement.setAttribute('data-pinterest-blocker-enabled', isEnabled.toString());
    });

    // Listen for messages from popup
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === 'toggleBlocking') {
            toggleBlocking(request.enabled);
            sendResponse({ success: true });
        }
    });
})();