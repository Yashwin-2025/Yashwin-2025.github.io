# Yashwin S - Portfolio Website

This is a premium, high-fidelity portfolio website built with modern glassmorphic design aesthetics, tailored for an **AI Backend & RAG Engineer**.

## Live Preview
Once deployed, the website will be available at:
`https://Yashwin-2025.github.io` (or your chosen repository name)

---

## 🛠️ Tech Stack & Features
- **Frontend Core**: Vanilla HTML5, CSS3, ES6 JavaScript. No heavy framework dependencies for instant loading times.
- **Styling**: Modern, responsive CSS Grid/Flexbox layout. Fully optimized for Mobile, Tablet, and Desktop.
- **Themes**: Both **Dark Theme** (default neon tech accent) and **Light Theme** (indigo/violet accent) with a transition-smooth switcher.
- **Interactions**:
  - Scroll Reveal animations using `IntersectionObserver`.
  - Active navigation highlights synchronized with scrolling.
  - Interactive skill categorization filters.
  - Collapsible timeline details for the Professional Experience section.
  - Smooth custom scroll behaviors.
  - Interactive contact form.

---

## 💻 Running Locally

To preview your website locally:
1. Open PowerShell or Terminal in this folder.
2. Spin up a lightweight Python web server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to:
   [http://localhost:8000](http://localhost:8000)

---

## 🚀 Pushing to GitHub Pages (Deployment)

Follow these steps to deploy this website to your GitHub Pages:

### Step 1: Create a GitHub Repository
1. Go to your GitHub account.
2. Create a new public repository.
3. **Important**: Name it exactly `Yashwin-2025.github.io` (replace `Yashwin-2025` with your actual GitHub username if different).
4. Do **NOT** initialize it with a README, gitignore, or license. Keep it completely empty.

### Step 2: Initialize Git and Push Locally
Open PowerShell or your command prompt in this directory (`c:\Users\91984\YASHWIN_S\Yashwin-2025.github.io`) and execute the following commands:

```bash
# Initialize local git repository
git init

# Set the default branch to main
git branch -M main

# Add all files to staging
git add .

# Create the initial commit
git commit -m "feat: initial commit of portfolio website"

# Link your local repo to GitHub (replace with your repository url if different)
git remote add origin https://github.com/Yashwin-2025/Yashwin-2025.github.io.git

# Push the changes to GitHub
git push -u origin main
```

### Step 3: Verify GitHub Pages Settings
1. Go to your repository settings page on GitHub.
2. Click on **Pages** in the left sidebar.
3. Under **Build and deployment**, ensure **Source** is set to `Deploy from a branch`.
4. Ensure the **Branch** is set to `main` and the folder is `/ (root)`. Click **Save**.
5. Wait 1–2 minutes, and your site will be live at `https://Yashwin-2025.github.io`!
