const API_BASE = "https://market.near.ai/v1";

document.addEventListener('DOMContentLoaded', () => {
    const badgeType = document.getElementById('badge-type');
    const agentHandle = document.getElementById('agent-handle');
    const themeSelect = document.getElementById('theme');
    const formatSelect = document.getElementById('format');
    const previewArea = document.getElementById('preview-area');
    const codeOutput = document.getElementById('code-output');
    const copyBtn = document.getElementById('copy-btn');
    const handleGroup = document.getElementById('handle-group');

    // State
    let currentSVG = "";
    let earningsData = null;

    // Listeners
    [badgeType, agentHandle, themeSelect, formatSelect].forEach(el => {
        el.addEventListener('input', updateGenerator);
    });

    copyBtn.addEventListener('click', copyToClipboard);

    async function updateGenerator() {
        const type = badgeType.value;
        const handle = agentHandle.value || 'agent.near';
        const theme = themeSelect.value;
        const format = formatSelect.value;

        // Toggle visibility of handle input
        handleGroup.style.display = (type === 'powered-by') ? 'none' : 'block';

        // Load Template
        try {
            const fileName = `assets/badges/${type}-${theme}.svg`;
            const response = await fetch(fileName);
            let svgText = await response.text();

            // Customization
            if (type === 'built-by') {
                svgText = svgText.replace('{HANDLE}', handle.toUpperCase());
            } else if (type === 'earnings') {
                const amount = await getEarnings(handle);
                svgText = svgText.replace('{AMOUNT}', amount);
            }

            currentSVG = svgText;
            previewArea.innerHTML = svgText;
            previewArea.className = `badge-preview-area ${theme}`;

            generateCode(format, handle);

        } catch (e) {
            console.error(e);
            previewArea.innerHTML = "<span style='color:red'>Template not found</span>";
        }
    }

    async function getEarnings(handle) {
        // In a real app, we'd fetch from market.near.ai/v1/agents/{handle}
        // Mocking for now to avoid CORS/API limits during demo
        return "847.2"; 
    }

    function generateCode(format, handle) {
        const baseUrl = window.location.origin + window.location.pathname;
        const imgUrl = `${baseUrl}assets/badges/${badgeType.value}-${themeSelect.value}.svg`;
        const linkUrl = `https://market.near.ai/agents/${handle}`;

        let code = "";
        const trackingAttr = `data-near-badge="${handle}"`;
        const scriptTag = `<script src="${baseUrl}tracking.js" data-near-handle="${handle}" async></script>`;

        if (format === 'html') {
            code = `<a href="${linkUrl}" target="_blank" ${trackingAttr}>\n  <img src="${imgUrl}" alt="NEAR Badge" />\n</a>\n${scriptTag}`;
        } else if (format === 'markdown') {
            code = `[![NEAR Badge](${imgUrl})](${linkUrl})`;
        } else if (format === 'react') {
            code = `const NearBadge = () => (\n  <>\n    <a href="${linkUrl}" target="_blank" ${trackingAttr}>\n      <img src="${imgUrl}" alt="NEAR Badge" />\n    </a>\n    <script src="${baseUrl}tracking.js" data-near-handle="${handle}" async />\n  </>\n);`;
        }

        codeOutput.textContent = code;
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(codeOutput.textContent).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('success');
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.classList.remove('success');
            }, 2000);
        });
    }

    // Initial load
    updateGenerator();
});
