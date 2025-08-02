document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const status = document.getElementById('status');
    
    // Get current state from content script
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0] && tabs[0].url.includes('pinterest.com')) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'getState' }, function(response) {
                if (response) {
                    updateUI(response.isUnblocked);
                } else {
                    updateUI(false); // default to blocked
                }
            });
        } else {
            updateUI(false); // default to blocked when not on Pinterest
        }
    });
    
    // Handle toggle click
    toggleSwitch.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs[0] && tabs[0].url.includes('pinterest.com')) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'getState' }, function(response) {
                    const currentUnblocked = response ? response.isUnblocked : false;
                    const newUnblocked = !currentUnblocked;
                    
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: 'toggleUnblock',
                        unblock: newUnblocked
                    }, function(response) {
                        if (response && response.success) {
                            updateUI(response.isUnblocked);
                        }
                    });
                });
            }
        });
    });
    
    function updateUI(isUnblocked) {
        if (isUnblocked) {
            toggleSwitch.classList.add('active');
            status.textContent = 'Content unblocked (session)';
        } else {
            toggleSwitch.classList.remove('active');
            status.textContent = 'Content blocked';
        }
    }
});