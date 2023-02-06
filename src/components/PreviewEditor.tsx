import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

import '@uiw/react-textarea-code-editor/dist.css'

import styles from '@/styles/button.module.css'

const CodeEditor = dynamic(
  () =>
    import('@uiw/react-textarea-code-editor').then(
      (packageModule) => packageModule.default
    ),
  { ssr: false }
)

type Props = {
  componentCode: string
  handleEditCode: CallableFunction
}

export default function PreviewEditor({
  componentCode,
  handleEditCode,
}: Props) {
  const [editCode, setEditCode] = useState('')

  useEffect(() => {
    setEditCode(componentCode)
  }, [])

  return (
    <div className="relative h-[400px] overflow-auto rounded-lg bg-gray-900 ring-2 ring-gray-900 lg:h-[600px]">
      <button
        onClick={() => handleEditCode(editCode)}
        className={`${styles.pill} absolute bottom-4 right-4 z-50 bg-black text-white`}
      >
        <span aria-hidden="true" role="img" className="text-sm">
          💾
        </span>

        <span className="text-xs font-medium">Save</span>
      </button>

      <CodeEditor
        value={editCode}
        language="html"
        onChange={(e) => setEditCode(e.target.value)}
        padding={0}
        style={{
          fontSize: 14,
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        }}
      />
    </div>
  )
}
