import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

import sanitizeHtml from 'sanitize-html'

import '@uiw/react-textarea-code-editor/dist.css'

import styles from '@/styles/button.module.css'

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
  const [editCode, setEditCode] = useState('')

  useEffect(() => {
    setEditCode(componentCode)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative h-[400px] overflow-auto rounded-lg bg-gray-900 ring-2 ring-gray-900 lg:h-[600px]">
      <button
        onClick={() =>
          handleEditCode(
            sanitizeHtml(editCode, {
              allowedTags: [
                'address',
                'article',
                'aside',
                'footer',
                'header',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'main',
                'nav',
                'section',
                'blockquote',
                'dd',
                'div',
                'dl',
                'dt',
                'figcaption',
                'figure',
                'img',
                'hr',
                'li',
                'main',
                'ol',
                'p',
                'pre',
                'ul',
                'a',
                'br',
                'cite',
                'code',
                'em',
                'small',
                'span',
                'strong',
                'sub',
                'sup',
                'time',
                'table',
                'tbody',
                'td',
                'tfoot',
                'th',
                'thead',
                'tr',
              ],
              allowedAttributes: {
                '*': ['class', 'id', 'href', 'data-*', 'disabled', 'aria-*'],
                img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
              },
            })
          )
        }
        className={`${styles.pill} absolute bottom-4 right-4 z-50 bg-black text-white`}
      >
        <span aria-hidden="true" role="img" className="text-sm">
          💾
        </span>

        <span className="text-xs font-medium">Save</span>
      </button>

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
