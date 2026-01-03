import { useState, useEffect, useCallback, useRef } from 'react'
import { marked } from 'marked'
import hljs from 'highlight.js'
import DOMPurify from 'dompurify'
import katex from 'katex'
import defaultContent from './default-content.md?raw'
import { FileText, FolderOpen, Save, Printer, Sun, Moon, RefreshCw, Edit3, Eye } from 'lucide-react'
import './App.css'

// Math rendering extension for marked
const mathExtension = {
  name: 'math',
  level: 'block',
  start(src) { return src.match(/^\$\$/)?.index },
  tokenizer(src) {
    const match = src.match(/^\$\$([\s\S]+?)\$\$/)
    if (match) {
      return {
        type: 'math',
        raw: match[0],
        text: match[1].trim()
      }
    }
  },
  renderer(token) {
    try {
      return katex.renderToString(token.text, {
        displayMode: true,
        throwOnError: false
      })
    } catch (e) {
      return token.raw
    }
  }
}

// Inline math extension
const inlineMathExtension = {
  name: 'inlineMath',
  level: 'inline',
  start(src) { return src.match(/\$/)?.index },
  tokenizer(src) {
    const match = src.match(/^\$([^\n$]+)\$/)
    if (match) {
      return {
        type: 'inlineMath',
        raw: match[0],
        text: match[1].trim()
      }
    }
  },
  renderer(token) {
    try {
      return katex.renderToString(token.text, {
        displayMode: false,
        throwOnError: false
      })
    } catch (e) {
      return token.raw
    }
  }
}

// Configure marked with syntax highlighting and math
marked.use({ extensions: [mathExtension, inlineMathExtension] })
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch (e) {}
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
  gfm: true,
})

function App() {
  const [markdown, setMarkdown] = useState(defaultContent)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('md-pdf-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const editorRef = useRef(null)
  const previewRef = useRef(null)
  const isScrollingSyncRef = useRef(false)

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      if (!localStorage.getItem('md-pdf-theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('md-pdf-theme', newTheme)
  }

  const resetToSystemTheme = () => {
    localStorage.removeItem('md-pdf-theme')
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  }

  const getHtml = useCallback(() => {
    const rawHtml = marked(markdown)
    return DOMPurify.sanitize(rawHtml)
  }, [markdown])

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Markdown.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleLoad = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setMarkdown(event.target?.result || '')
      }
      reader.readAsText(file)
    }
  }

  // Bidirectional scroll sync
  const handleEditorScroll = useCallback(() => {
    if (isScrollingSyncRef.current) {
      isScrollingSyncRef.current = false
      return
    }
    
    if (editorRef.current && previewRef.current) {
      const editorScrollPercentage = 
        editorRef.current.scrollTop / 
        (editorRef.current.scrollHeight - editorRef.current.clientHeight)
      
      const previewScrollTop = 
        editorScrollPercentage * 
        (previewRef.current.scrollHeight - previewRef.current.clientHeight)
      
      isScrollingSyncRef.current = true
      previewRef.current.scrollTop = previewScrollTop
    }
  }, [])

  const handlePreviewScroll = useCallback(() => {
    if (isScrollingSyncRef.current) {
      isScrollingSyncRef.current = false
      return
    }
    
    if (editorRef.current && previewRef.current) {
      const previewScrollPercentage = 
        previewRef.current.scrollTop / 
        (previewRef.current.scrollHeight - previewRef.current.clientHeight)
      
      const editorScrollTop = 
        previewScrollPercentage * 
        (editorRef.current.scrollHeight - editorRef.current.clientHeight)
      
      isScrollingSyncRef.current = true
      editorRef.current.scrollTop = editorScrollTop
    }
  }, [])

  return (
    <div className="app">
      <header className="toolbar no-print">
        <div className="toolbar-left">
          <FileText size={24} />
          <h1>Markdown Editor & PDF Export</h1>
        </div>
        <div className="toolbar-right">
          <label className="btn btn-secondary">
            <FolderOpen size={18} />
            Load
            <input type="file" accept=".md,.txt" onChange={handleLoad} hidden />
          </label>
          <button className="btn btn-secondary" onClick={handleDownload}>
            <Save size={18} />
            Save
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Printer size={18} />
            Print / Save to PDF
          </button>
          <button className="btn btn-icon" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="btn btn-icon btn-small" onClick={resetToSystemTheme} title="Reset to system theme">
            <RefreshCw size={16} />
          </button>
        </div>
      </header>

      <main className="editor-container">
        <section className="editor-pane no-print">
          <div className="pane-header">
            <span>
              <Edit3 size={16} />
              Editor
            </span>
            <span className="char-count">{markdown.length} chars</span>
          </div>
          <textarea
            ref={editorRef}
            className="editor"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            onScroll={handleEditorScroll}
            placeholder="Write your markdown here..."
            spellCheck="false"
          />
        </section>

        <div className="divider no-print" />

        <section className="preview-pane">
          <div className="pane-header no-print">
            <span>
              <Eye size={16} />
              Preview
            </span>
          </div>
          <div 
            ref={previewRef}
            className="preview-scroll"
            onScroll={handlePreviewScroll}
          >
            <article 
              className="preview-content markdown-body"
              dangerouslySetInnerHTML={{ __html: getHtml() }}
            />
          </div>
        </section>
      </main>

      <footer className="footer no-print">
        <span>Press <kbd>⌘</kbd>+<kbd>P</kbd> to print/save as PDF</span>
        <span>•</span>
        <span>Supports GFM, tables, code highlighting, and math</span>
      </footer>
    </div>
  )
}

export default App
