# Agent Dashboard — Complete Setup & Deploy

## Pre-Flight Checklist

You'll need:
- GitHub account (free)
- Node.js installed on your computer ([download here](https://nodejs.org) — use the LTS version)

---

## Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `agent-dashboard`
3. **Make it PUBLIC** (required for GitHub Pages)
4. Click "Create repository"
5. **Copy the HTTPS URL** from the green Code button — you'll need it in 10 seconds

---

## Step 2: Clone & Set Up Project Locally

Open your terminal/command prompt and run:

```bash
# Clone the repo (replace the URL with yours from Step 1)
git clone https://github.com/YOUR_USERNAME/agent-dashboard.git
cd agent-dashboard

# Create the folder structure
mkdir -p src public

# Copy files into the right places
# ⚠️ Important: Rename as you copy:
# - public_index.html → public/index.html
# - src_index.js → src/index.js
# - App.js → src/App.js
# - App.css → src/App.css
# - GroupDashboard.jsx → src/GroupDashboard.jsx
# - AgentDetail.jsx → src/AgentDetail.jsx
# - data.json → public/data.json
```

**On macOS/Linux:**
```bash
mv public_index.html public/index.html
mv src_index.js src/index.js
mv App.js src/App.js
mv App.css src/App.css
mv GroupDashboard.jsx src/GroupDashboard.jsx
mv AgentDetail.jsx src/AgentDetail.jsx
mv data.json public/data.json
```

**On Windows (PowerShell):**
```powershell
ren public_index.html index.html
move index.html public\
ren src_index.js index.js
move index.js src\
move App.js src\
move App.css src\
move GroupDashboard.jsx src\
move AgentDetail.jsx src\
move data.json public\
```

---

## Step 3: Update `package.json`

**CRITICAL:** Edit `package.json` and change the `homepage` line:

```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/agent-dashboard",
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username (e.g., `saanika` if your profile is `github.com/saanika`)

---

## Step 4: Install Dependencies & Build

```bash
npm install
npm run build
```

This takes 1-2 minutes. You'll see a `build/` folder appear when done.

---

## Step 5: Deploy to GitHub Pages

```bash
npm run deploy
```

This pushes the `build/` folder to the `gh-pages` branch on GitHub.

---

## Step 6: Enable GitHub Pages

1. Go to your repo on GitHub: `github.com/YOUR_USERNAME/agent-dashboard`
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment" → Source, select **Deploy from a branch**
5. Select branch **gh-pages** and folder **/root**
6. Click Save

**Your dashboard is now live at:**
```
https://YOUR_GITHUB_USERNAME.github.io/agent-dashboard
```

Give it 1-2 min for GitHub to publish, then visit that URL.

---

## Step 7: Set Up Daily Data Updates (Cowork)

Once the dashboard is live, we'll configure Cowork to:
1. Run your Looker query daily at 10am
2. Generate fresh `data.json`
3. Push to `public/data.json` in your repo

Just let me know the dashboard URL is working, and we'll set that up next.

---

## Making Changes Later

**To update the dashboard code:**
```bash
# Edit components in src/
# Then rebuild and redeploy:
npm run build
npm run deploy
```

**To update data (before Cowork automation):**
- Edit `public/data.json` 
- Commit and push to main branch (`git add public/data.json && git commit && git push`)
- Dashboard auto-refreshes

---

## Troubleshooting

**"npm: command not found"**
→ Node.js not installed. Download from nodejs.org and restart your terminal.

**"gh-pages not found"**
→ Run `npm install` again, make sure it completes without errors.

**Dashboard shows "Loading..." forever**
→ Check browser console (F12) for errors. Likely missing `data.json` in public folder.

**404 on GitHub Pages**
→ Go back to Step 6. Make sure Pages is set to deploy from `gh-pages` branch.

---

## Next: Cowork Automation

Once your dashboard is live, reply with the URL and we'll set up Cowork to:
- Query Looker daily at 10am
- Format results as JSON
- Auto-push to your repo

This is the final piece that makes it fully automated.
