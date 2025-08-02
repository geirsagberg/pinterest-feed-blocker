document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const status = document.getElementById('status');
    
    // Load current state
    chrome.storage.sync.get(['enabled'], function(result) {
        const isEnabled = result.enabled !== false; // default to true
        updateUI(isEnabled);
    });
    
    // Handle toggle click
    toggleSwitch.addEventListener('click', function() {
        chrome.storage.sync.get(['enabled'], function(result) {
            const currentState = result.enabled !== false;
            const newState = !currentState;
            
            chrome.storage.sync.set({ enabled: newState }, function() {
                updateUI(newState);
                
                // Send message to content script to update blocking
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    if (tabs[0] && tabs[0].url.includes('pinterest.com')) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            action: 'toggleBlocking',
                            enabled: newState
                        });
                    }
                });
            });
        });
    });
    
    function updateUI(enabled) {
        if (enabled) {
            toggleSwitch.classList.add('active');
            status.textContent = 'Blocking enabled';
        } else {
            toggleSwitch.classList.remove('active');
            status.textContent = 'Blocking disabled';
        }
    }
});