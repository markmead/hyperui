import { useEffect, useState } from 'react'
import Prism from 'prismjs'

import 'prismjs/components/prism-jsx.min'

interface Props {
  codeType?: string
  componentCode: string
  showPreview: boolean
}

export default function PreviewCode({ codeType = 'html', componentCode = '', showPreview }: Props) {
  const [prismClass, setPrismClass] = useState<string>('language-html')

  useEffect(() => Prism.highlightAll(), [componentCode])

  useEffect(() => {
    const languageMap = {
      html: 'language-html',
      vue: 'language-html',
      jsx: 'language-jsx',
    }

    setPrismClass(languageMap[codeType])
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
