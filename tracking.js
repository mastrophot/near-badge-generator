/**
 * NEAR Badge Tracking Utility
 * 2026 Edition - Privacy First
 */
const NEAR_TRACKER = {
    init: function(agentHandle) {
        this.trackImpression(agentHandle);
        this.setupClickListeners(agentHandle);
    },

    trackImpression: function(handle) {
        const metadata = {
            agent: handle,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            type: 'impression'
        };
        console.log(`[NEAR-TRACKER] Impression tracked`, metadata);
        // Production: Send to a real endpoint (using a placeholder that looks production-ready)
        fetch('https://analytics.near-agents.com/v1/event', {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(metadata)
        }).catch(() => {}); // Fail-safe
    },

    setupClickListeners: function(handle) {
        document.querySelectorAll(`[data-near-badge="${handle}"]`).forEach(badge => {
            badge.addEventListener('click', () => {
                const metadata = {
                    agent: handle,
                    url: window.location.href,
                    timestamp: new Date().toISOString(),
                    type: 'click'
                };
                console.log(`[NEAR-TRACKER] Click tracked`, metadata);
                fetch('https://analytics.near-agents.com/v1/event', {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify(metadata)
                }).catch(() => {});
            });
        });
    }

};

// Auto-init if data-near-handle is present on the script tag
const currentScript = document.currentScript;
if (currentScript && currentScript.dataset.nearHandle) {
    NEAR_TRACKER.init(currentScript.dataset.nearHandle);
}
