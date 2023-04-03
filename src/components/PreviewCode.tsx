import { useEffect } from 'react'

import Prism from 'prismjs'
require('prismjs/components/prism-jsx.min')

import ButtonStyle from '@/components/ButtonStyle'

type Props = {
  showPreview: boolean
  componentCode?: string
  handleSetIsJsx?: CallableFunction
  showToggle?: boolean
  isJsx?: boolean
}

function PreviewCode({
  showPreview,
  componentCode = '',
  handleSetIsJsx,
  showToggle = false,
  isJsx = false,
}: Props) {
  useEffect(() => Prism.highlightAll(), [componentCode])

  return (
    <div className={`relative ${showPreview ? 'hidden' : 'block'}`}>
      {showToggle && handleSetIsJsx && (
        <button
          className="absolute top-4 right-4"
          onClick={() => handleSetIsJsx(!isJsx)}
        >
          <ButtonStyle emoji="💫" text={isJsx ? 'JSX' : 'HTML'} dark />
        </button>
      )}

      <pre className="h-[400px] overflow-auto rounded-lg p-4 ring-2 ring-gray-900 dark:bg-gray-800 dark:ring-gray-800 lg:h-[600px]">
        <code className={`${isJsx ? 'language-jsx' : 'language-html'}`}>
          {componentCode}
        </code>
      </pre>
    </div>
  )
}

export default PreviewCode
