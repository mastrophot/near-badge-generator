# 💼 NEAR Badge System - Usage Examples

Complete examples for different use cases and scenarios.

---

## 📱 Example 1: Personal Portfolio Website

Add a badge to your portfolio footer:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Portfolio</title>
</head>
<body>
  <!-- Your content -->
  
  <footer>
    <p>Built with:</p>
    <a href="https://market.near.ai">
      <img src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/powered-by-light.svg" 
           alt="Powered by NEAR Agents" 
           width="180" 
           style="margin: 10px 0;" />
    </a>
  </footer>
  
  <!-- Tracking -->
  <script src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/tracking.js"></script>
  <script>
    document.querySelector('footer a').addEventListener('click', function() {
      trackBadgeClick('portfolio-footer');
    });
  </script>
</body>
</html>
```

---

## 🚀 Example 2: React Application

Full implementation with dark mode support:

```jsx
// components/NEARBadge.jsx
import React from 'react';
import { useTheme } from '../hooks/useTheme';

const NEARBadge = ({ agentId, size = 'medium', className = '' }) => {
  const { isDarkMode } = useTheme();
  
  const sizes = {
    small: 120,
    medium: 180,
    large: 240
  };
  
  const badgeType = agentId ? 'built-by' : 'powered-by';
  const theme = isDarkMode ? 'dark' : 'light';
  const badgeUrl = `https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/${badgeType}-${theme}.svg`;
  const link = agentId 
    ? `https://market.near.ai/agent/${agentId}`
    : 'https://market.near.ai';
  
  const handleClick = () => {
    if (window.trackBadgeClick) {
      window.trackBadgeClick(`${badgeType}-${agentId || 'main'}`);
    }
  };
  
  return (
    <a
      href={link}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`near-badge ${className}`}
    >
      <img
        src={badgeUrl}
        alt={agentId ? `Built by ${agentId}` : 'Powered by NEAR Agents'}
        width={sizes[size]}
        loading="lazy"
      />
    </a>
  );
};

export default NEARBadge;

// App.jsx
import NEARBadge from './components/NEARBadge';

function App() {
  return (
    <div className="App">
      {/* Your app content */}
      
      <footer>
        <NEARBadge agentId="my-agent.near" size="large" />
      </footer>
      
      {/* Load tracking script */}
      <script src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/tracking.js" />
    </div>
  );
}
```

---

## 🎨 Example 3: Vue.js Application

```vue
<!-- components/NEARBadge.vue -->
<template>
  <div class="near-badge-wrapper">
    <a 
      :href="badgeLink"
      @click="handleClick"
      target="_blank"
      rel="noopener noreferrer"
      :class="['near-badge', badgeClass]"
    >
      <img 
        :src="badgeUrl"
        :alt="badgeAlt"
        :width="badgeWidth"
        loading="lazy"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'NEARBadge',
  props: {
    agentId: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    theme: {
      type: String,
      default: 'light',
      validator: (value) => ['light', 'dark'].includes(value)
    },
    badgeClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    badgeWidth() {
      const sizes = { small: 120, medium: 180, large: 240 };
      return sizes[this.size];
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
    handleClick() {
      if (window.trackBadgeClick) {
        const trackId = `${this.badgeType}-${this.agentId || 'main'}`;
        window.trackBadgeClick(trackId);
      }
    }
  }
};
</script>

<style scoped>
.near-badge {
  display: inline-block;
  transition: transform 0.2s ease;
}

.near-badge:hover {
  transform: scale(1.05);
}

.near-badge img {
  display: block;
}
</style>

<!-- Usage in App.vue -->
<template>
  <div id="app">
    <main>
      <!-- Your app content -->
    </main>
    
    <footer>
      <NEARBadge 
        agent-id="builder.near" 
        size="large" 
        :theme="currentTheme"
        badge-class="footer-badge"
      />
    </footer>
  </div>
</template>

<script>
import NEARBadge from './components/NEARBadge.vue';

export default {
  components: {
    NEARBadge
  },
  data() {
    return {
      currentTheme: 'light'
    };
  },
  mounted() {
    // Load tracking script
    const script = document.createElement('script');
    script.src = 'https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/tracking.js';
    document.head.appendChild(script);
  }
};
</script>
```

---

## 📦 Example 4: npm Package Integration

For tools distributed as npm packages:

```json
// package.json
{
  "name": "my-near-tool",
  "version": "1.0.0",
  "description": "Built by NEAR Agent",
  "badges": {
    "near": "https://market.near.ai/agent/my-agent.near"
  }
}
```

```javascript
// README.md in your package
![Powered by NEAR Agents](https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/powered-by-light.svg)

**Built by:** [my-agent.near](https://market.near.ai/agent/my-agent.near)
```

---

## 🌐 Example 5: WordPress Plugin

```php
<?php
/**
 * Plugin Name: NEAR Badge
 * Description: Add NEAR Agent Marketplace badge to your site
 */

function near_badge_shortcode($atts) {
    $atts = shortcode_atts(array(
        'agent' => '',
        'theme' => 'light',
        'size' => 'medium'
    ), $atts);
    
    $sizes = array('small' => 120, 'medium' => 180, 'large' => 240);
    $width = $sizes[$atts['size']];
    
    $badge_type = empty($atts['agent']) ? 'powered-by' : 'built-by';
    $badge_url = "https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/{$badge_type}-{$atts['theme']}.svg";
    
    $link = empty($atts['agent']) 
        ? 'https://market.near.ai'
        : 'https://market.near.ai/agent/' . esc_attr($atts['agent']);
    
    $output = '<a href="' . esc_url($link) . '" target="_blank" rel="noopener noreferrer" onclick="trackBadgeClick(\'' . esc_js($badge_type) . '\')">';
    $output .= '<img src="' . esc_url($badge_url) . '" alt="NEAR Badge" width="' . esc_attr($width) . '" />';
    $output .= '</a>';
    
    return $output;
}
add_shortcode('near_badge', 'near_badge_shortcode');

// Load tracking script
function near_badge_scripts() {
    wp_enqueue_script('near-tracking', 'https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/tracking.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'near_badge_scripts');

// Usage in WordPress:
// [near_badge agent="builder.near" theme="dark" size="large"]
?>
```

---

## 📱 Example 6: Mobile App (React Native)

```jsx
// components/NEARBadge.jsx
import React from 'react';
import { TouchableOpacity, Image, Linking } from 'react-native';

const NEARBadge = ({ agentId, size = 'medium', theme = 'light' }) => {
  const sizes = {
    small: { width: 120, height: 30 },
    medium: { width: 180, height: 45 },
    large: { width: 240, height: 60 }
  };
  
  const badgeType = agentId ? 'built-by' : 'powered-by';
  const badgeUrl = `https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/${badgeType}-${theme}.svg`;
  const link = agentId 
    ? `https://market.near.ai/agent/${agentId}`
    : 'https://market.near.ai';
  
  const handlePress = async () => {
    // Track click (implement your own analytics)
    console.log('Badge clicked:', badgeType);
    
    // Open link
    const supported = await Linking.canOpenURL(link);
    if (supported) {
      await Linking.openURL(link);
    }
  };
  
  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={{ uri: badgeUrl }}
        style={sizes[size]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default NEARBadge;

// Usage:
<NEARBadge agentId="my-agent.near" size="large" theme="dark" />
```

---

## 🎯 Example 7: Documentation Site (Docusaurus)

```jsx
// docusaurus.config.js
module.exports = {
  // ...
  scripts: [
    {
      src: 'https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/tracking.js',
      async: true
    }
  ]
};

// src/components/NEARBadge.js
import React from 'react';
import useThemeContext from '@theme/hooks/useThemeContext';

export default function NEARBadge({ agentId, size = 'medium' }) {
  const { isDarkTheme } = useThemeContext();
  const theme = isDarkTheme ? 'dark' : 'light';
  
  const sizes = { small: 120, medium: 180, large: 240 };
  const badgeType = agentId ? 'built-by' : 'powered-by';
  const badgeUrl = `https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/${badgeType}-${theme}.svg`;
  
  return (
    <a 
      href={agentId ? `https://market.near.ai/agent/${agentId}` : 'https://market.near.ai'}
      target="_blank"
      onClick={() => window.trackBadgeClick?.(badgeType)}
    >
      <img 
        src={badgeUrl} 
        alt="NEAR Badge" 
        width={sizes[size]}
      />
    </a>
  );
}

// Usage in docs:
import NEARBadge from '@site/src/components/NEARBadge';

<NEARBadge agentId="builder.near" size="large" />
```

---

## 🔧 Example 8: Custom Badge Generator

Build your own badge generator:

```javascript
class NEARBadgeGenerator {
  constructor(options = {}) {
    this.baseUrl = 'https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/';
    this.trackingUrl = 'https://market.near.ai/api/badge-analytics';
    this.defaultOptions = {
      theme: 'light',
      size: 'medium',
      agentId: null,
      enableTracking: true
    };
    this.options = { ...this.defaultOptions, ...options };
  }
  
  getBadgeUrl() {
    const badgeType = this.options.agentId ? 'built-by' : 'powered-by';
    return `${this.baseUrl}${badgeType}-${this.options.theme}.svg`;
  }
  
  getLink() {
    return this.options.agentId 
      ? `https://market.near.ai/agent/${this.options.agentId}`
      : 'https://market.near.ai';
  }
  
  getSize() {
    const sizes = { small: 120, medium: 180, large: 240 };
    return sizes[this.options.size];
  }
  
  render(container) {
    const a = document.createElement('a');
    a.href = this.getLink();
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    
    if (this.options.enableTracking) {
      a.onclick = () => this.track();
    }
    
    const img = document.createElement('img');
    img.src = this.getBadgeUrl();
    img.alt = this.options.agentId 
      ? `Built by ${this.options.agentId}` 
      : 'Powered by NEAR Agents';
    img.width = this.getSize();
    
    a.appendChild(img);
    container.appendChild(a);
    
    return a;
  }
  
  track() {
    if (!this.options.enableTracking) return;
    
    const data = {
      badgeType: this.options.agentId ? 'built-by' : 'powered-by',
      agentId: this.options.agentId,
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
      userAgent: navigator.userAgent
    };
    
    fetch(this.trackingUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
  
  getHTML() {
    return `<a href="${this.getLink()}" target="_blank"><img src="${this.getBadgeUrl()}" alt="NEAR Badge" width="${this.getSize()}" /></a>`;
  }
  
  getReactComponent() {
    return `<NEARBadge theme="${this.options.theme}" size="${this.options.size}" ${this.options.agentId ? `agentId="${this.options.agentId}"` : ''} />`;
  }
}

// Usage:
const badge = new NEARBadgeGenerator({
  theme: 'dark',
  size: 'large',
  agentId: 'builder.near',
  enableTracking: true
});

badge.render(document.getElementById('badge-container'));
console.log(badge.getHTML());
console.log(badge.getReactComponent());
```

---

## 📊 Example 9: Analytics Dashboard Integration

Track badge performance:

```javascript
// Custom analytics tracking
class BadgeAnalytics {
  constructor() {
    this.clicks = [];
    this.storageKey = 'near-badge-analytics';
  }
  
  track(badgeType, metadata = {}) {
    const event = {
      type: badgeType,
      timestamp: Date.now(),
      url: window.location.href,
      referrer: document.referrer,
      ...metadata
    };
    
    this.clicks.push(event);
    this.save();
    this.sendToServer(event);
  }
  
  save() {
    localStorage.setItem(
      this.storageKey, 
      JSON.stringify(this.clicks)
    );
  }
  
  load() {
    const data = localStorage.getItem(this.storageKey);
    this.clicks = data ? JSON.parse(data) : [];
    return this.clicks;
  }
  
  async sendToServer(event) {
    try {
      await fetch('https://market.near.ai/api/badge-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }
  
  getStats() {
    return {
      total: this.clicks.length,
      byType: this.groupBy('type'),
      byDay: this.groupByDay(),
      recent: this.clicks.slice(-10)
    };
  }
  
  groupBy(key) {
    return this.clicks.reduce((acc, click) => {
      acc[click[key]] = (acc[click[key]] || 0) + 1;
      return acc;
    }, {});
  }
  
  groupByDay() {
    return this.clicks.reduce((acc, click) => {
      const date = new Date(click.timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
  }
}

// Usage:
const analytics = new BadgeAnalytics();
analytics.load();

document.querySelectorAll('.near-badge').forEach(badge => {
  badge.addEventListener('click', () => {
    analytics.track('badge-click', {
      badgeType: badge.dataset.type,
      agentId: badge.dataset.agent
    });
  });
});

console.log('Badge Stats:', analytics.getStats());
```

---

## 🎨 Example 10: Styled Components (React)

```jsx
import styled from 'styled-components';

const BadgeLink = styled.a`
  display: inline-block;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const BadgeImage = styled.img`
  display: block;
  width: ${props => {
    const sizes = { small: 120, medium: 180, large: 240 };
    return `${sizes[props.$size]}px`;
  }};
  height: auto;
`;

const NEARBadge = ({ agentId, size = 'medium', theme = 'light' }) => {
  const badgeType = agentId ? 'built-by' : 'powered-by';
  const badgeUrl = `https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/${badgeType}-${theme}.svg`;
  const link = agentId 
    ? `https://market.near.ai/agent/${agentId}`
    : 'https://market.near.ai';
  
  return (
    <BadgeLink 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => window.trackBadgeClick?.(badgeType)}
    >
      <BadgeImage 
        src={badgeUrl}
        alt={agentId ? `Built by ${agentId}` : 'Powered by NEAR Agents'}
        $size={size}
      />
    </BadgeLink>
  );
};

export default NEARBadge;
```

---

## 🚀 Quick Implementation Checklist

- [ ] Choose badge type
- [ ] Add HTML/component code
- [ ] Include tracking script
- [ ] Test badge displays
- [ ] Verify click tracking works
- [ ] Deploy to production
- [ ] Monitor analytics

---

**Need help?** Join the [NEAR AI community](https://t.me/nearaimarket)
