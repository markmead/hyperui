import { useEffect } from 'react'

import Prism from 'prismjs'
require('prismjs/components/prism-jsx.min')

import ButtonStyle from '@component/ButtonStyle'

export default function PreviewCode({
  showPreview,
  componentCode = '',
  handleSetIsJsx,
  showToggle = false,
  isJsx = false,
}) {
  useEffect(() => Prism.highlightAll(), [componentCode])

  return (
    <div
      className="relative"
      {...(showPreview && {
        hidden: true,
      })}
    >
      {showToggle && handleSetIsJsx && (
        <button
          className="absolute right-4 top-4"
          onClick={() => handleSetIsJsx(!isJsx)}
        >
          <ButtonStyle
            buttonEmoji="💫"
            buttonText={isJsx ? 'JSX' : 'HTML'}
            buttonActive={isJsx}
            isDark
          />
        </button>
      )}

      <pre className="h-[400px] overflow-auto rounded-lg p-4 ring-2 ring-gray-900 lg:h-[600px]">
        <code className={`${isJsx ? 'language-jsx' : 'language-html'}`}>
          {componentCode}
        </code>
      </pre>
    </div>
  )
}
