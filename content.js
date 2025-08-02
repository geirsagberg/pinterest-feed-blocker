// Pinterest Feed Blocker Content Script
(function() {
    'use strict';

    // Function to hide elements
    function hideElement(element) {
        if (element) {
            element.style.display = 'none !important';
            element.style.visibility = 'hidden !important';
        }
    }

    // Function to block main feed
    function blockMainFeed() {
        // Main feed container selectors
        const feedSelectors = [
            '[data-test-id="homefeed-feed"]',
            '[data-test-id="grid"]',
            '[data-test-id="masonry"]',
            '.mainContainer',
            '.appContent .homefeedContainer',
            '.ReactVirtualized__Grid',
            '.gridCentered'
        ];

        feedSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(hideElement);
        });
    }

    // Function to block "Find some ideas" recommendations
    function blockFindIdeas() {
        // Specific selectors based on HTML structure
        const recommendationSelectors = [
            '.moreIdeasOnBoard',
            '[data-test-id="board-recommendations"]',
            '[data-test-id="board-ideas"]',
            '.boardRecommendations',
            '.ideaRecommendations',
            '.recommendationsContainer'
        ];

        recommendationSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(hideElement);
        });

        // Find elements by text content - more targeted approach
        const textSelectors = [
            'h3[title*="Find some ideas"]',
            'h3:contains("Find some ideas")',
            '*[title*="Find some ideas"]'
        ];

        textSelectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    // Hide the entire section container
                    let container = element.closest('.moreIdeasOnBoard') || 
                                  element.closest('.gcw') || 
                                  element.closest('a[href*="more-ideas"]');
                    if (container) {
                        hideElement(container);
                    }
                });
            } catch (e) {
                // Ignore CSS selector errors
            }
        });

        // XPath approach for text content
        try {
            const xpath = '//h3[contains(@title, "Find some ideas")]';
            const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (let i = 0; i < result.snapshotLength; i++) {
                const element = result.snapshotItem(i);
                const container = element.closest('.moreIdeasOnBoard') || 
                                element.closest('.gcw') || 
                                element.closest('a[href*="more-ideas"]');
                if (container) {
                    hideElement(container);
                }
            }
        } catch (e) {
            // Fallback for browsers that don't support XPath
        }

        // Additional fallback - look for links to more-ideas
        const moreIdeasLinks = document.querySelectorAll('a[href*="more-ideas"]');
        moreIdeasLinks.forEach(link => {
            const container = link.closest('.gcw') || link.closest('div');
            if (container) {
                hideElement(container);
            }
        });
    }

    // Function to block related images on pin pages
    function blockRelatedImages() {
        // Selectors for related/similar pins
        const relatedSelectors = [
            '[data-test-id="related-pins"]',
            '[data-test-id="more-ideas"]',
            '[data-test-id="similar-pins"]',
            '.relatedPins',
            '.moreLikeThis',
            '.similarPins',
            '.closeupRecommendations',
            '.IdeasYouMightLove'
        ];

        relatedSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(hideElement);
        });

        // Find "Ideas you might love" and similar text
        const textPatterns = [
            'Ideas you might love',
            'More like this',
            'Similar ideas',
            'Related pins'
        ];

        textPatterns.forEach(pattern => {
            const xpath = `//text()[contains(., '${pattern}')]/ancestor::div[1]`;
            const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (let i = 0; i < result.snapshotLength; i++) {
                hideElement(result.snapshotItem(i));
            }
        });
    }

    // Function to run all blocking functions
    function runBlocking() {
        blockMainFeed();
        blockFindIdeas();
        blockRelatedImages();
    }

    // Run blocking on page load
    runBlocking();

    // Create observer to handle dynamic content
    const observer = new MutationObserver(function(mutations) {
        let shouldRun = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldRun = true;
            }
        });
        if (shouldRun) {
            setTimeout(runBlocking, 100);
        }
    });

    // Start observing when DOM is ready
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        // Wait for document.body to be available
        const checkBody = setInterval(() => {
            if (document.body) {
                clearInterval(checkBody);
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
        }, 10);
    }

    // Run blocking periodically for any missed content
    setInterval(runBlocking, 1000);
})();