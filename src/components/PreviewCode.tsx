import { useState } from 'react'

import ButtonStyle from '@/components/ButtonStyle'

type Props = {
  showPreview: boolean
  componentCode?: string
  componentJsx?: string
}

function PreviewCode({
  showPreview,
  componentCode = '',
  componentJsx = '',
}: Props) {
  const [isJsx, setIsJsx] = useState<boolean>(false)

  return (
    <div className={`relative ${showPreview ? 'hidden' : 'block'}`}>
      <button
        className="absolute top-4 right-4"
        onClick={() => setIsJsx(!isJsx)}
      >
        <ButtonStyle emoji="💫" text={isJsx ? 'Jsx' : 'HTML'} dark />
      </button>

      <pre className="h-[400px] overflow-auto rounded-lg p-4 ring-2 ring-gray-900 dark:bg-gray-800 dark:ring-gray-800 lg:h-[600px]">
        <code className={`language-html ${isJsx ? 'hidden' : 'block'}`}>
          {componentCode}
        </code>

        <code className={`language-jsx ${!isJsx ? 'hidden' : 'block'}`}>
          {componentJsx}
        </code>
      </pre>
    </div>
  )
}

export default PreviewCode
