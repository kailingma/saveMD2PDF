import katex from 'katex'

// Simple math renderer - finds $...$ and $$...$$ patterns
export function renderMathInElement(element) {
  if (!element) return

  const walkText = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || ''
      
      // Check for math patterns (use [\s\S] to match newlines)
      const blockMathRegex = /\$\$([\s\S]+?)\$\$/g
      const inlineMathRegex = /\$([^$\n]+)\$/g
      
      let hasMatch = blockMathRegex.test(text) || inlineMathRegex.test(text)
      if (!hasMatch) return

      const span = document.createElement('span')
      let html = text

      // Block math first (reset regex)
      html = html.replace(/\$\$([\s\S]+?)\$\$/g, (match, math) => {
        try {
          return katex.renderToString(math.trim(), { 
            displayMode: true,
            throwOnError: false 
          })
        } catch (e) {
          return match
        }
      })

      // Then inline math
      html = html.replace(/\$([^$\n]+)\$/g, (match, math) => {
        try {
          return katex.renderToString(math.trim(), { 
            displayMode: false,
            throwOnError: false 
          })
        } catch (e) {
          return match
        }
      })

      span.innerHTML = html
      node.parentNode?.replaceChild(span, node)
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Don't process code blocks
      if (node.tagName === 'CODE' || node.tagName === 'PRE') return
      
      // Process children (copy to array first since we modify the DOM)
      Array.from(node.childNodes).forEach(walkText)
    }
  }

  walkText(element)
}
