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
        console.log(`[NEAR-TRACKER] Impression tracked for ${handle}`);
        // In production: fetch(`https://analytics.near.ai/log?agent=${handle}&type=impression`);
    },

    setupClickListeners: function(handle) {
        document.querySelectorAll(`[data-near-badge="${handle}"]`).forEach(badge => {
            badge.addEventListener('click', () => {
                console.log(`[NEAR-TRACKER] Click tracked for ${handle}`);
                // In production: fetch(`https://analytics.near.ai/log?agent=${handle}&type=click`);
            });
        });
    }
};

// Auto-init if data-near-handle is present on the script tag
const currentScript = document.currentScript;
if (currentScript && currentScript.dataset.nearHandle) {
    NEAR_TRACKER.init(currentScript.dataset.nearHandle);
}
