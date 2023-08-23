import { useEffect, useState } from 'react'

import Prism from 'prismjs'
require('prismjs/components/prism-jsx.min')

export default function PreviewCode({
  showPreview,
  componentCode = '',
  handleSetType,
  showToggle = false,
  codeType = 'html',
}) {
  const [prismClass, setPrismClass] = useState('language-html')

  useEffect(() => Prism.highlightAll(), [componentCode])

  useEffect(() => {
    codeType === 'html' && setPrismClass('language-html')
    codeType === 'vue' && setPrismClass('language-html')
    codeType === 'jsx' && setPrismClass('language-jsx')
  }, [codeType])

  return (
    <div
      className="relative"
      {...(showPreview && {
        hidden: true,
      })}
    >
      {showToggle && (
        <div className="absolute right-4 top-4">
          <label htmlFor="CodeType" className="sr-only">
            Code Type
          </label>

          <select
            id="CodeType"
            onInput={(e) => handleSetType(e.target.value)}
            className="w-32 rounded-lg border-gray-700 bg-gray-800 text-white sm:text-sm"
          >
            <option value="html">HTML</option>
            <option value="jsx">JSX</option>
            <option value="vue">Vue</option>
          </select>
        </div>
      )}

      <pre className="h-[400px] overflow-auto rounded-lg p-4 ring-2 ring-gray-900 lg:h-[600px]">
        <code className={prismClass}>{componentCode}</code>
      </pre>
    </div>
  )
}
