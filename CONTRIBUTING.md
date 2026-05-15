# Contributing to Markdown to PDF
*Please note this is vibecoded*

Thank you for your interest in contributing to Markdown to PDF! We welcome contributions from the community.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior vs. actual behavior
- Screenshots if applicable
- Your environment (browser, OS, etc.)

### Suggesting Features

We love feature suggestions! Please create an issue with:
- A clear description of the feature
- Use cases and benefits
- Any implementation ideas you might have

### Pull Requests

1. **Fork the repository** and create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Write clean, readable code
   - Follow the existing code style
   - Add comments where necessary

3. **Test your changes**:
   ```bash
   npm run dev  # Test in development
   npm run build  # Ensure it builds successfully
   ```

4. **Commit your changes**:
   ```bash
   git commit -m "Add: Brief description of your changes"
   ```
   
   Use conventional commit messages:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for updates to existing features
   - `Refactor:` for code refactoring
   - `Docs:` for documentation changes

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**:
   - Provide a clear description of the changes
   - Reference any related issues
   - Include screenshots for UI changes

## 📋 Code Guidelines

### JavaScript/React
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable and function names
- Avoid deep nesting

### CSS
- Use CSS variables for theming
- Follow mobile-first approach
- Keep specificity low

### Markdown
- Follow GitHub Flavored Markdown (GFM)
- Use proper heading hierarchy

## 🧪 Testing

Before submitting a PR, please test:
- All major features work (editing, preview, PDF export)
- Both light and dark themes work correctly
- The app works on different browsers (Chrome, Firefox, Safari)
- File import/export functionality works
- Math equations render correctly

## 🎯 Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Markdown-to-PDF.git
   cd Markdown-to-PDF
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Make your changes and test thoroughly

## 📚 Project Structure

```
├── src/
│   ├── App.jsx              # Main application component
│   ├── App.css              # Markdown preview styles
│   ├── index.css            # Global styles and theme
│   ├── default-content.md   # Default editor content
│   ├── katex-helper.js      # Math equation preprocessing
│   └── main.jsx             # Application entry point
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies and scripts
```

## 🔍 Code Review Process

All submissions require review. We'll look at:
- Code quality and readability
- Adherence to project standards
- Test coverage
- Documentation updates

## 💡 Good First Issues

Look for issues labeled `good first issue` for beginner-friendly contributions.

## 📝 Documentation

If you're adding a new feature, please update the relevant documentation:
- README.md for user-facing features
- DEPLOYMENT.md for deployment-related changes
- Code comments for complex logic

## ❓ Questions?

Feel free to create an issue with your question or reach out to the maintainers.

## 🙏 Thank You!

Your contributions help make this project better for everyone. We appreciate your time and effort!
