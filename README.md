# Smmservice.co.uk (smmservice.co.uk)

> Enterprise SMM Growth, KYC-Verified Business Accounts, Google 5-Star Reviews & Digital Marketing Infrastructure Marketplace.

Built with **React 19**, **Vite 6**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 GitHub Pages & Custom Domain Setup (`smmservice.co.uk`)

This repository is already configured with:
1. `public/CNAME` -> `smmservice.co.uk`
2. `public/404.html` -> Single-Page Application (SPA) redirect support for GitHub Pages
3. `.github/workflows/deploy.yml` -> Automated GitHub Actions workflow for building and publishing to GitHub Pages on every push.

---

### Step 1: Push Repository to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Smmservice.co.uk production release"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

---

### Step 2: Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub: `https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO`.
2. Click on **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select `GitHub Actions`.
4. Under **Custom domain**:
   - Enter: `smmservice.co.uk`
   - Click **Save**.
   - Check **Enforce HTTPS** (once DNS certificate verifies).

---

### Step 3: Configure DNS Records at your Domain Registrar (Namecheap / Cloudflare / GoDaddy)

Log into your DNS management provider for `smmservice.co.uk` and add the following records:

#### 1. A Records for Apex Domain (`@` or `smmservice.co.uk`):
| Type | Host / Name | Value / IP Address | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `185.199.108.153` | Automatic / 3600 |
| **A** | `@` | `185.199.109.153` | Automatic / 3600 |
| **A** | `@` | `185.199.110.153` | Automatic / 3600 |
| **A** | `@` | `185.199.111.153` | Automatic / 3600 |

#### 2. CNAME Record for `www`:
| Type | Host / Name | Value / Target | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `YOUR_GITHUB_USERNAME.github.io.` | Automatic / 3600 |

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server on http://localhost:3000
npm run dev

# Compile and typecheck
npm run lint

# Build production static bundle (dist/)
npm run build
```

---

## 🛡️ License & Trademarks
All rights reserved © 2026 **Smmservice.co.uk** / **smmservice.co.uk**.
