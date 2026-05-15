# Markdown to PDF

A beautiful, modern markdown editor with live preview and PDF export capabilities. Built with React and designed for GitHub Pages hosting.

## ✨ Features

- **📝 Live Preview** - Split-pane editor with instant markdown rendering
- **🌙 Dark/Light Mode** - Auto-detects system preference with manual toggle
- **🖨️ Print to PDF** - Use ⌘+P (or Ctrl+P) or click the Print button
- **📂 Load & Save** - Import/export your markdown files
- **🎨 Beautiful Typography** - GitHub-inspired styling
- **💻 Syntax Highlighting** - Support for 190+ programming languages
- **📊 Tables** - Full GFM table support
- **🔢 Math Equations** - LaTeX math via KaTeX ($inline$ and $$block$$)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📤 Deploy to GitHub Pages

1. Create a new repository on GitHub named `Markdown-to-PDF`

2. Update the `base` in `vite.config.js` if your repo name is different:
   ```js
   base: '/your-repo-name/',
   ```

3. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/Markdown-to-PDF.git
   git push -u origin main
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in your repo settings (Source: `gh-pages` branch)

Your app will be available at: `https://YOUR_USERNAME.github.io/Markdown-to-PDF/`

## 🎨 Customization

### Default Content
Edit `src/default-content.md` to change the initial markdown content.

### Styling
- `src/index.css` - App layout and theme variables
- `src/App.css` - Markdown rendering styles

## 📄 License

MIT License - Feel free to use and modify!
