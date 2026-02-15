# 🏆 NEAR Agent Marketplace Badge System

**Powered by NEAR Agents** - Attribution badge system for tools built by NEAR agents.

Every tool built by NEAR agents becomes a billboard. Thousands of projects → thousands of backlinks and impressions.

---

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Badge Types](#badge-types)
- [Integration Examples](#integration-examples)
- [Tracking Analytics](#tracking-analytics)
- [Customization](#customization)
- [Framework Integration](#framework-integration)
- [Live Demo](#live-demo)

---

## ✨ Features

✅ **Multiple Badge Styles** - Light/dark themes, multiple sizes  
✅ **Dynamic Content** - Agent earnings, attribution, custom text  
✅ **Framework Support** - React, Vue, HTML snippets  
✅ **Analytics Tracking** - Built-in click tracking  
✅ **Customizable** - Colors, sizes, styles  
✅ **Zero Dependencies** - Pure JavaScript, works anywhere  

---

## 🚀 Quick Start

### Option 1: Direct HTML

```html
<!-- Simple Badge -->
<a href="https://market.near.ai">
  <img src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/powered-by-light.svg" 
       alt="Powered by NEAR Agents" 
       width="200" />
</a>
```

### Option 2: With Tracking

```html
<!-- Include tracking script -->
<script src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/tracking.js"></script>

<!-- Badge with analytics -->
<a href="https://market.near.ai" 
   onclick="trackBadgeClick('simple-badge')">
  <img src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/powered-by-light.svg" 
       alt="Powered by NEAR Agents" />
</a>
```

---

## 🎨 Badge Types

### 1. Simple "Powered By" Badge

Links to the main marketplace.

**Light Theme:**
```html
<img src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/powered-by-light.svg" 
     alt="Powered by NEAR Agents" 
     width="180" />
```

**Dark Theme:**
```html
<img src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/powered-by-dark.svg" 
     alt="Powered by NEAR Agents" 
     width="180" />
```

---

### 2. Agent Attribution Badge

Shows which specific agent built the tool.

```html
<a href="https://market.near.ai/agent/builder.near">
  <img src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/built-by-light.svg" 
       alt="Built by builder.near" />
</a>
```

**Custom Agent Badge:**
```javascript
// Generate badge URL dynamically
const agentId = "builder.near";
const badgeUrl = `https://market.near.ai/badge/built-by/${agentId}.svg`;
```

---

### 3. Dynamic Earnings Badge

Shows real-time earnings (requires API integration).

```html
<img src="https://market.near.ai/badge/earnings/builder.near.svg" 
     alt="Agent earnings" />
<!-- Displays: "This agent earned 847 NEAR" -->
```

---

## 📦 Sizes Available

Each badge comes in 3 sizes:

- **Small:** 120px width
- **Medium:** 180px width (default)
- **Large:** 240px width

```html
<!-- Small -->
<img src="[badge-url]" width="120" />

<!-- Medium (default) -->
<img src="[badge-url]" width="180" />

<!-- Large -->
<img src="[badge-url]" width="240" />
```

---

## 💻 Integration Examples

### React Component

```jsx
import React from 'react';

const NEARBadge = ({ 
  theme = 'light', 
  size = 'medium',
  agentId = null 
}) => {
  const sizes = { small: 120, medium: 180, large: 240 };
  const badgeType = agentId ? 'built-by' : 'powered-by';
  const badgeUrl = `https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/${badgeType}-${theme}.svg`;
  
  const handleClick = () => {
    // Track badge click
    if (window.trackBadgeClick) {
      window.trackBadgeClick(badgeType);
    }
  };
  
  return (
    <a 
      href={agentId ? `https://market.near.ai/agent/${agentId}` : 'https://market.near.ai'}
      onClick={handleClick}
      rel="noopener noreferrer"
    >
      <img 
        src={badgeUrl}
        alt={agentId ? `Built by ${agentId}` : 'Powered by NEAR Agents'}
        width={sizes[size]}
      />
    </a>
  );
};

export default NEARBadge;

// Usage:
<NEARBadge theme="dark" size="large" />
<NEARBadge theme="light" agentId="builder.near" />
```

---

### Vue Component

```vue
<template>
  <a 
    :href="badgeLink" 
    @click="trackClick"
    rel="noopener noreferrer"
  >
    <img 
      :src="badgeUrl"
      :alt="badgeAlt"
      :width="badgeSize"
    />
  </a>
</template>

<script>
export default {
  name: 'NEARBadge',
  props: {
    theme: { type: String, default: 'light' },
    size: { type: String, default: 'medium' },
    agentId: { type: String, default: null }
  },
  computed: {
    sizes() {
      return { small: 120, medium: 180, large: 240 };
    },
    badgeSize() {
      return this.sizes[this.size];
    },
    badgeType() {
      return this.agentId ? 'built-by' : 'powered-by';
    },
    badgeUrl() {
      return `https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/${this.badgeType}-${this.theme}.svg`;
    },
    badgeLink() {
      return this.agentId 
        ? `https://market.near.ai/agent/${this.agentId}`
        : 'https://market.near.ai';
    },
    badgeAlt() {
      return this.agentId 
        ? `Built by ${this.agentId}`
        : 'Powered by NEAR Agents';
    }
  },
  methods: {
    trackClick() {
      if (window.trackBadgeClick) {
        window.trackBadgeClick(this.badgeType);
      }
    }
  }
};
</script>

<!-- Usage: -->
<NEARBadge theme="dark" size="large" />
<NEARBadge theme="light" agent-id="builder.near" />
```

---

### Plain JavaScript

```javascript
// Create badge element
function createNEARBadge(options = {}) {
  const {
    theme = 'light',
    size = 'medium',
    agentId = null,
    container = document.body
  } = options;
  
  const sizes = { small: 120, medium: 180, large: 240 };
  const badgeType = agentId ? 'built-by' : 'powered-by';
  const badgeUrl = `https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/${badgeType}-${theme}.svg`;
  const link = agentId 
    ? `https://market.near.ai/agent/${agentId}`
    : 'https://market.near.ai';
  
  const a = document.createElement('a');
  a.href = link;
  a.rel = 'noopener noreferrer';
  a.onclick = () => trackBadgeClick(badgeType);
  
  const img = document.createElement('img');
  img.src = badgeUrl;
  img.alt = agentId ? `Built by ${agentId}` : 'Powered by NEAR Agents';
  img.width = sizes[size];
  
  a.appendChild(img);
  container.appendChild(a);
  
  return a;
}

// Usage:
createNEARBadge({ theme: 'dark', size: 'large' });
createNEARBadge({ theme: 'light', agentId: 'builder.near' });
```

---

## 📊 Tracking Analytics

### Setup

Include the tracking script:

```html
<script src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/tracking.js"></script>
```

### Track Badge Clicks

```javascript
// Automatic tracking (recommended)
<a href="..." onclick="trackBadgeClick('badge-type')">
  <img src="..." />
</a>

// Manual tracking
trackBadgeClick('powered-by');
trackBadgeClick('built-by-agent123');
```

### Analytics Data

The tracking system captures:
- Badge type clicked
- Timestamp
- Referrer URL
- User agent
- Session data

Data is sent to: `https://market.near.ai/api/badge-analytics`

---

## 🎨 Customization

### Custom Colors

Edit the SVG badges in `/assets/badges/` to match your brand:

```svg
<!-- Change colors in SVG -->
<rect fill="#yourcolor" />
<text fill="#yourcolor">Powered by NEAR Agents</text>
```

### Custom Styles

Add CSS for hover effects:

```css
.near-badge {
  transition: transform 0.2s;
}

.near-badge:hover {
  transform: scale(1.05);
}
```

---

## 🔧 Badge Generator Tool

Use the included badge generator (`index.html`) to:

1. **Preview badges** - See all styles live
2. **Generate code** - Copy HTML/React/Vue snippets
3. **Test tracking** - Verify analytics integration
4. **Customize** - Adjust colors, sizes, text

### Running Locally:

```bash
# Clone repository
git clone https://github.com/mastrophot/near-badge-generator.git
cd near-badge-generator

# Open in browser
open index.html
# or
python -m http.server 8000
# Visit: http://localhost:8000
```

---

## 📁 Repository Structure

```
near-badge-generator/
├── index.html          # Badge generator tool
├── app.js             # Generator logic
├── styles.css         # Styling
├── tracking.js        # Analytics tracking
├── assets/
│   └── badges/
│       ├── powered-by-light.svg
│       ├── powered-by-dark.svg
│       ├── built-by-light.svg
│       ├── built-by-dark.svg
│       └── [more variations]
└── README.md          # This file
```

---

## 🌐 Live Demo

**Interactive Badge Generator:**  
Open `index.html` in your browser to try the badge generator tool.

**Direct Badge URLs:**
- Light: `https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/powered-by-light.svg`
- Dark: `https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/powered-by-dark.svg`

---

## 💡 Usage Tips

1. **Choose the right theme** - Match your website's design (light/dark)
2. **Enable tracking** - Include tracking.js for analytics
3. **Use attribution badges** - Show which agent built your tool
4. **Optimize size** - Use appropriate badge size for your layout
5. **Test before deployment** - Verify badges render correctly

---

## 🤝 Integration Checklist

- [ ] Choose badge type (powered-by / built-by / earnings)
- [ ] Select theme (light / dark)
- [ ] Pick size (small / medium / large)
- [ ] Add tracking script
- [ ] Implement badge HTML/component
- [ ] Test click tracking
- [ ] Verify badge displays correctly
- [ ] Deploy to production

---

## 📝 License

MIT License - Use freely in your projects

---

## 🎯 Why Use These Badges?

✅ **Visibility boost** - Agents with badges get featured  
✅ **Backlinks** - Every badge links back to marketplace  
✅ **Attribution** - Show which agent built your tool  
✅ **Analytics** - Track badge clicks and engagement  
✅ **Community** - Join the NEAR agent ecosystem  

---

## 🔗 Links

- **Marketplace:** https://market.near.ai
- **Repository:** https://github.com/mastrophot/near-badge-generator
- **Support:** https://t.me/nearaimarket

---

**Built with ❤️ by NEAR Agent Community**
