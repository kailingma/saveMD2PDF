# Deployment Guide

This guide covers deploying the Markdown to PDF application to GitHub Pages and other hosting platforms.

## 📤 Deploy to GitHub Pages

GitHub Pages is the recommended hosting solution for this application.

### Prerequisites

- A GitHub account
- Git installed on your machine
- Node.js and npm installed

### Step-by-Step Deployment

1. **Create a new repository on GitHub**
   
   Create a repository named `Markdown-to-PDF` (or any name you prefer)

2. **Update Vite Configuration**
   
   Update the `base` in `vite.config.js` to match your repository name:
   ```js
   base: '/your-repo-name/',
   ```
   
   For example, if your repo is named `my-markdown-editor`:
   ```js
   base: '/my-markdown-editor/',
   ```

3. **Initialize Git and Push Your Code**
   
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
   git push -u origin main
   ```

4. **Deploy to GitHub Pages**
   
   ```bash
   npm run deploy
   ```
   
   This command will:
   - Build your application for production
   - Push the built files to the `gh-pages` branch

5. **Enable GitHub Pages**
   
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select the `gh-pages` branch
   - Click **Save**

6. **Access Your Application**
   
   Your app will be available at:
   ```
   https://YOUR_USERNAME.github.io/your-repo-name/
   ```
   
   It may take a few minutes for the site to become available after the first deployment.

### Updating Your Deployment

To update your deployed application after making changes:

```bash
npm run deploy
```

This will rebuild and redeploy your application automatically.

## 🌐 Alternative Hosting Options

### Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to complete deployment

### Netlify

1. Build your application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder via:
   - Netlify CLI: `netlify deploy --prod`
   - Drag and drop to Netlify's web interface

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages

2. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

## 🔧 Configuration Notes

### Base URL

The `base` configuration in `vite.config.js` is crucial for proper routing:
- For GitHub Pages: Set to `'/your-repo-name/'`
- For custom domain or root deployment: Set to `'/'`

### Environment Variables

If you need to add environment variables:

1. Create a `.env` file (add to `.gitignore`)
2. Use `VITE_` prefix for variables to be included in the build
3. Access them via `import.meta.env.VITE_VARIABLE_NAME`

## 🐛 Troubleshooting

### 404 Errors on Refresh

This is a single-page application. If you encounter 404 errors when refreshing on routes other than the home page, ensure your hosting platform is configured to serve `index.html` for all routes.

### Assets Not Loading

If images or other assets aren't loading after deployment, check that:
- The `base` path in `vite.config.js` is correct
- Asset paths in your code are relative

### Build Failures

If the build fails:
- Clear the cache: `rm -rf node_modules package-lock.json && npm install`
- Check for any TypeScript or ESLint errors
- Ensure all dependencies are installed

## 📝 Notes

- The `deploy` script in `package.json` uses `gh-pages` to deploy to GitHub Pages
- Ensure the `gh-pages` package is installed: `npm install --save-dev gh-pages`
- The build process creates static files in the `dist` directory
