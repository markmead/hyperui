import { useEffect, useState } from 'react'

import Prism from 'prismjs'

import 'prismjs/components/prism-jsx.min'

export default function PreviewCode({ showPreview, componentCode = '', codeType = 'html' }) {
  const [prismClass, setPrismClass] = useState('language-html')

  useEffect(() => Prism.highlightAll(), [componentCode])

  useEffect(() => {
    codeType === 'html' && setPrismClass('language-html')
    codeType === 'vue' && setPrismClass('language-vue')
    codeType === 'jsx' && setPrismClass('language-jsx')
  }, [codeType])

  return (
    <div
      {...(showPreview && {
        hidden: true,
      })}
    >
      <pre className="h-[400px] overflow-auto rounded-md p-4 ring-2 ring-gray-900 lg:h-[600px]">
        <code className={prismClass}>{componentCode}</code>
      </pre>
    </div>
  )
}
