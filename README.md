# Vikrant Kulkarni — Portfolio

A cinematic, dark-themed personal portfolio built with React + Vite + Tailwind CSS.

## Tech Stack
- **React 18** — UI framework
- **Vite** — Build tool
- **Tailwind CSS** — Utility-first styling
- **Lucide React** — Icons

## Features
- Interstellar particle canvas background
- 3D tilt cards with flashlight hover effect
- Cinematic scroll-reveal animations
- Rotating text taglines
- Responsive across all devices

---

## 🚀 Running Locally

\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:5173

## 📦 Building for Production

\`\`\`bash
npm run build
\`\`\`

Output goes to \`dist/\` folder.

---

## 📤 Deploying to GitHub Pages

### Step 1 — Push to GitHub

\`\`\`bash
git init
git add .
git commit -m "Initial commit: Portfolio v1"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
\`\`\`

### Step 2 — Install gh-pages

\`\`\`bash
npm install --save-dev gh-pages
\`\`\`

### Step 3 — Update vite.config.js

Change \`base: './',\` to \`base: '/YOUR_REPO_NAME/',\` in vite.config.js.

### Step 4 — Add deploy scripts to package.json

\`\`\`json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
\`\`\`

### Step 5 — Deploy

\`\`\`bash
npm run deploy
\`\`\`

Then go to **GitHub → your repo → Settings → Pages → Source → gh-pages branch**.

---

## ⚡ Deploying to Netlify (Easiest)

1. Push to GitHub (Step 1 above)
2. Go to https://netlify.com → **Add new site → Import from Git**
3. Connect your GitHub repo
4. Build command: \`npm run build\`
5. Publish directory: \`dist\`
6. Click **Deploy** — done!

---

## ✏️ Customizing

All personal data is in one place at the top of \`src/App.jsx\`:

\`\`\`js
const PORTFOLIO_DATA = {
  personal: { name, email, profileImage, taglines, about ... },
  links:    { github, linkedin, ... },
  skills:   { Programming: [...], Engineering: [...], ... },
  projects: [ { title, description, tags, link, isFlagship } ],
  achievements: [...],
  certifications: [...]
}
\`\`\`
