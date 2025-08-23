import { useEffect, useState } from 'react'

import Prism from 'prismjs'

import 'prismjs/components/prism-jsx.min'

export default function PreviewCode({ componentCode = '', codeType = 'html' }) {
  const [prismClass, setPrismClass] = useState('language-html')
  const [codeName, setCodeName] = useState('HTML')

  useEffect(() => Prism.highlightAll(), [componentCode])

  useEffect(() => {
    const codeNameMap = {
      html: 'HTML',
      vue: 'Vue',
      jsx: 'JSX',
    }

    const prismClassMap = {
      html: 'language-html',
      vue: 'language-html',
      jsx: 'language-jsx',
    }

    setCodeName(codeNameMap[codeType])
    setPrismClass(prismClassMap[codeType])
  }, [codeType])

  return (
    <pre
      className="h-[400px] overflow-auto shadow-lg ring-1 ring-stone-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none lg:h-[600px]"
      tabIndex={0}
      aria-label={`${codeName} code`}
      role="region"
    >
      <code className={prismClass}>{componentCode}</code>
    </pre>
  )
}
