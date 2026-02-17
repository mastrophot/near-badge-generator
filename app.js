const API_BASE = "https://market.near.ai/v1";

document.addEventListener("DOMContentLoaded", () => {
  const badgeType = document.getElementById("badge-type");
  const agentHandle = document.getElementById("agent-handle");
  const themeSelect = document.getElementById("theme");
  const sizeSelect = document.getElementById("badge-size");
  const formatSelect = document.getElementById("format");
  const previewArea = document.getElementById("preview-area");
  const codeOutput = document.getElementById("code-output");
  const copyBtn = document.getElementById("copy-btn");
  const handleGroup = document.getElementById("handle-group");

  const SIZE_MAP = {
    small: { width: 120, height: 28 },
    medium: { width: 200, height: 36 },
    large: { width: 300, height: 48 },
  };

  // State
  let currentSVG = "";
  let earningsData = null;

  // Listeners
  [badgeType, agentHandle, themeSelect, sizeSelect, formatSelect].forEach(
    (el) => {
      el.addEventListener("input", updateGenerator);
    },
  );

  copyBtn.addEventListener("click", copyToClipboard);

  async function updateGenerator() {
    const type = badgeType.value;
    const handle = agentHandle.value || "agent.near";
    const theme = themeSelect.value;
    const size = sizeSelect.value;
    const format = formatSelect.value;
    const dims = SIZE_MAP[size];

    // Toggle visibility of handle input
    handleGroup.style.display = type === "powered-by" ? "none" : "block";

    // Load Template
    try {
      const fileName = `assets/badges/${type}-${theme}.svg`;
      const response = await fetch(fileName);
      let svgText = await response.text();

      // Customization
      if (type === "built-by") {
        svgText = svgText.replace("{HANDLE}", handle.toUpperCase());
      } else if (type === "earnings") {
        const amount = await getEarnings(handle);
        svgText = svgText.replace("{AMOUNT}", amount);
      }

      // Apply size — update SVG width/height attributes
      svgText = svgText.replace(/width="[^"]*"/, `width="${dims.width}"`);
      svgText = svgText.replace(/height="[^"]*"/, `height="${dims.height}"`);

      currentSVG = svgText;
      previewArea.innerHTML = svgText;
      previewArea.className = `badge-preview-area ${theme}`;

      generateCode(format, handle);
    } catch (e) {
      console.error(e);
      previewArea.innerHTML =
        "<span style='color:red'>Template not found</span>";
    }
  }

  async function getEarnings(handle) {
    try {
      const response = await fetch(`${API_BASE}/agents/${handle}`);
      if (!response.ok) throw new Error("Agent not found");
      const data = await response.json();
      return (Number(data.earned || 0)).toFixed(1);
    } catch (e) {
      console.warn("Falling back to local data for", handle);
      return "0.0";
    }
  }


  function generateCode(format, handle) {
    const baseUrl = window.location.origin + window.location.pathname;
    const imgUrl = `${baseUrl}assets/badges/${badgeType.value}-${themeSelect.value}.svg`;
    const linkUrl = `https://market.near.ai/agents/${handle}`;
    const dims = SIZE_MAP[sizeSelect.value];

    let code = "";
    const trackingAttr = `data-near-badge="${handle}"`;
    const sizeAttr = `width="${dims.width}" height="${dims.height}"`;
    const scriptTag = `<script src="${baseUrl}tracking.js" data-near-handle="${handle}" async></script>`;

    if (format === "html") {
      code = `<a href="${linkUrl}" target="_blank" ${trackingAttr}>\n  <img src="${imgUrl}" ${sizeAttr} alt="NEAR Badge" />\n</a>\n${scriptTag}`;
    } else if (format === "markdown") {
      code = `[![NEAR Badge](${imgUrl})](${linkUrl})`;
    } else if (format === "react") {
      code = `const NearBadge = () => (\n  <>\n    <a href="${linkUrl}" target="_blank" ${trackingAttr}>\n      <img src="${imgUrl}" ${sizeAttr} alt="NEAR Badge" />\n    </a>\n    <script src="${baseUrl}tracking.js" data-near-handle="${handle}" async />\n  </>\n);`;
    }

    codeOutput.textContent = code;
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(codeOutput.textContent).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      copyBtn.classList.add("success");
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.classList.remove("success");
      }, 2000);
    });
  }

  // Initial load
  updateGenerator();
});
