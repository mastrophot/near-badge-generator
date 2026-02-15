# ⚡ NEAR Badge System - Quick Start

**Get your badge running in 60 seconds!**

---

## 🚀 Option 1: Copy-Paste HTML (30 seconds)

### Light Theme Badge
```html
<a href="https://market.near.ai">
  <img src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/powered-by-light.svg" 
       alt="Powered by NEAR Agents" 
       width="180" />
</a>
```

### Dark Theme Badge
```html
<a href="https://market.near.ai">
  <img src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/powered-by-dark.svg" 
       alt="Powered by NEAR Agents" 
       width="180" />
</a>
```

**✅ Done! Badge is live.**

---

## 📊 Option 2: With Analytics (60 seconds)

### Step 1: Add tracking script
```html
<script src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/tracking.js"></script>
```

### Step 2: Add badge with tracking
```html
<a href="https://market.near.ai" 
   onclick="trackBadgeClick('my-badge')">
  <img src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/powered-by-light.svg" 
       alt="Powered by NEAR Agents" 
       width="180" />
</a>
```

**✅ Done! Badge with analytics is live.**

---

## 👤 Option 3: Agent Attribution (45 seconds)

Show which agent built your tool:

```html
<a href="https://market.near.ai/agent/YOUR_AGENT_ID">
  <img src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/built-by-light.svg" 
       alt="Built by YOUR_AGENT_ID" 
       width="180" />
</a>
```

Replace `YOUR_AGENT_ID` with your agent name (e.g., `builder.near`)

**✅ Done! Attribution badge is live.**

---

## 💻 For React Developers

```bash
# Copy this component
curl https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/EXAMPLES.md | grep -A 50 "React Component"
```

Or use this minimal version:

```jsx
const NEARBadge = () => (
  <a href="https://market.near.ai">
    <img 
      src="https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/powered-by-light.svg"
      alt="Powered by NEAR Agents" 
      width={180} 
    />
  </a>
);
```

---

## 🎨 Customize Size

```html
<!-- Small (120px) -->
<img src="..." width="120" />

<!-- Medium (180px) - DEFAULT -->
<img src="..." width="180" />

<!-- Large (240px) -->
<img src="..." width="240" />
```

---

## 📦 All Badge URLs

Copy the URL you need:

**Light Theme:**
```
https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/powered-by-light.svg
```

**Dark Theme:**
```
https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/powered-by-dark.svg
```

**Agent Attribution (Light):**
```
https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/built-by-light.svg
```

**Agent Attribution (Dark):**
```
https://raw.githubusercontent.com/mastrophot/near-badge-generator/main/assets/badges/built-by-dark.svg
```

---

## ✅ Verification Checklist

After adding your badge:

- [ ] Badge displays correctly
- [ ] Link opens https://market.near.ai
- [ ] Badge size looks good
- [ ] Theme matches your site
- [ ] (Optional) Tracking works

---

## 🆘 Troubleshooting

**Badge not showing?**
- Check image URL is correct
- Verify width attribute is set
- Try opening badge URL directly in browser

**Link not working?**
- Verify `href` is: `https://market.near.ai`
- Check for typos

**Tracking not working?**
- Confirm tracking.js is loaded
- Check browser console for errors
- Verify `trackBadgeClick()` is called on click

---

## 📚 Need More?

- **Full Documentation:** See [README.md](./README.md)
- **Code Examples:** See [EXAMPLES.md](./EXAMPLES.md)
- **Support:** https://t.me/nearaimarket

---

**That's it! Your badge is live! 🎉**
