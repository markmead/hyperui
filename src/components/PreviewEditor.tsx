import dynamic from 'next/dynamic'

import { useEffect, useState } from 'react'

import sanitizeHtml from 'sanitize-html'

import '@uiw/react-textarea-code-editor/dist.css'

import styles from '@/styles/button.module.css'

import { sanitizeOptions } from '@/utils/sanitizeOptions'

const CodeEditor = dynamic(
  // @ts-ignore
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
  const [staticCode, setStaticCode] = useState<string>('')
  const [editCode, setEditCode] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    setEditCode(componentCode)
    setStaticCode(componentCode)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!errorMessage) {
      return
    }

    setTimeout(() => setErrorMessage(''), 3000)
  }, [errorMessage])

  function saveCode() {
    const trimmedCode = editCode.trim()

    if (!trimmedCode) {
      setEditCode(staticCode)
      setErrorMessage('You cannot save empty code 🙅‍♀️')

      return
    }

    handleEditCode(sanitizeHtml(editCode, sanitizeOptions))
  }

  return (
    <div className="relative h-[400px] overflow-auto rounded-lg bg-gray-900 ring-2 ring-gray-900 lg:h-[600px]">
      <button
        onClick={() => saveCode()}
        className={`${styles.pill} absolute bottom-4 right-4 z-50 bg-black text-white`}
      >
        <span aria-hidden="true" role="img" className="text-sm">
          💾
        </span>

        <span className="text-xs font-medium">Save</span>
      </button>

      {errorMessage && (
        <div className="absolute inset-0 z-50 grid place-content-center bg-gray-900">
          <p className="font-medium text-red-600">{errorMessage}</p>
        </div>
      )}

      <CodeEditor
        // @ts-ignore
        value={editCode}
        language="html"
        // @ts-ignore
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
