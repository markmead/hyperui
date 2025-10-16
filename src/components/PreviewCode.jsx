import { useEffect, useMemo } from 'react'

import Prism from 'prismjs'

import 'prismjs/components/prism-jsx.min'

const CODE_TYPE_CONFIG = {
  html: { codeLabel: 'HTML', prismClass: 'language-html' },
  vue: { codeLabel: 'Vue', prismClass: 'language-html' },
  jsx: { codeLabel: 'JSX', prismClass: 'language-jsx' },
}

export default function PreviewCode({ componentCode = '', codeType = 'html' }) {
  const { codeLabel, prismClass } = useMemo(() => CODE_TYPE_CONFIG[codeType])

  useEffect(() => Prism.highlightAll(), [componentCode])

  return (
    <pre
      className="h-[400px] overflow-auto shadow-lg ring-1 ring-stone-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none lg:h-[600px]"
      tabIndex={0}
      aria-label={`${codeLabel} code`}
      role="region"
    >
      <code className={prismClass}>{componentCode}</code>
    </pre>
  )
}
