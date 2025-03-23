import { useEffect, useState } from 'react'

import Prism from 'prismjs'

import 'prismjs/components/prism-jsx.min'

export default function PreviewCode({ componentCode = '', codeType = 'html' }) {
  const [prismClass, setPrismClass] = useState('language-html')

  useEffect(() => Prism.highlightAll(), [componentCode])

  useEffect(() => {
    codeType === 'html' && setPrismClass('language-html')
    codeType === 'vue' && setPrismClass('language-html')
    codeType === 'jsx' && setPrismClass('language-jsx')
  }, [codeType])

  return (
    <pre className="h-[400px] overflow-auto lg:h-[600px]">
      <code className={prismClass}>{componentCode}</code>
    </pre>
  )
}
