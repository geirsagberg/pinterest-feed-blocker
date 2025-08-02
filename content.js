// Pinterest Feed Blocker Content Script
;(function () {
  'use strict'

  let isUnblocked = false

  // Function to set the unblock attribute
  function setUnblockAttribute() {
    if (isUnblocked) {
      document.documentElement.setAttribute('data-pinterest-unblock', 'true')
    } else {
      document.documentElement.removeAttribute('data-pinterest-unblock')
    }
  }

  // Function to toggle unblock state
  function toggleUnblock(unblock) {
    isUnblocked = unblock
    setUnblockAttribute()
  }

  // By default, content is blocked (no attribute set)
  // Content only shows when data-pinterest-unblock="true" is present

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.action === 'toggleUnblock') {
      toggleUnblock(request.unblock)
      sendResponse({ success: true, isUnblocked: isUnblocked })
    } else if (request.action === 'getState') {
      sendResponse({ isUnblocked: isUnblocked })
    }
  })
})()
