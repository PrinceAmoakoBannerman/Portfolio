# 🖤 Dark Editorial Portfolio — React

A professional developer portfolio with a dark editorial aesthetic.

## ✏️ Customize Your Content

All your personal content lives in one place:

```
src/data.js
```

Edit that file to update:
- Your name, email, GitHub, LinkedIn
- The typing animation phrases
- Stats (years experience, projects, etc.)
- Project cards (title, description, tech stack, links)
- Skills (categories, icons, items)
- Contact section copy

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

This creates a `build/` folder ready to deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── index.html          # HTML shell
├── src/
│   ├── data.js             # ← Edit this to customize content
│   ├── index.css           # Global styles & CSS variables
│   ├── index.js            # React entry point
│   ├── App.js              # Root component
│   └── components/
│       ├── Navbar.js       # Sticky navigation
│       ├── Hero.js         # Hero with typing animation
│       ├── Stats.js        # Stats strip
│       ├── Projects.js     # Project cards grid
│       ├── Skills.js       # Skills grid
│       ├── Contact.js      # Contact section
│       └── Footer.js       # Footer
└── package.json
```

---

## 🎨 Design Tokens

Colors and fonts are defined as CSS variables in `src/index.css`:

```css
--bg: #0A0A0F          /* background */
--surface: #1A1A2E     /* card background */
--border: #2A2A42      /* borders & dividers */
--text: #E8E8F0        /* primary text */
--muted: #7070A0       /* secondary text */
--accent: #4F8EF7      /* electric blue accent */
```

Change `--accent` to update the entire color theme instantly.

---

## 🌐 Deploying

**Vercel (recommended):**
```bash
npx vercel
```

**Netlify:**
Drag the `build/` folder to [netlify.com/drop](https://netlify.com/drop)

**GitHub Pages:**
```bash
npm install gh-pages --save-dev
# Add to package.json scripts: "deploy": "gh-pages -d build"
npm run build && npm run deploy
```
