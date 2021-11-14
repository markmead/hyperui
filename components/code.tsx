import { FunctionComponent, useEffect, useContext } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import ToastContext from '../context/toast'

import Prism from 'prismjs'

import 'prismjs/themes/prism-okaidia.css'

type Props = {
  code: string | undefined
}

const Code: FunctionComponent<Props> = ({ code }) => {
  let toast = useContext(ToastContext)

  useEffect(() => {
    Prism.highlightAll()
  })

  if (!code) {
    return <div>No code to show</div>
  }

  return (
    <div className="bg-[#272822] p-4 rounded-xl relative">
      <CopyToClipboard text={code} onCopy={() => toast('Copied to Clipboard!')}>
        <button
          type="button"
          className="absolute px-4 py-2 text-xs font-medium text-white uppercase border border-gray-500 rounded-lg top-4 right-4"
        >
          Copy
        </button>
      </CopyToClipboard>

      <pre>
        <code className="language-html">{code}</code>
      </pre>
    </div>
  )
}

export default Code
