import {
  FunctionComponent,
  useEffect,
  useContext,
  useState,
  useRef,
} from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Prism from 'prismjs'

import 'prismjs/themes/prism-okaidia.css'

import styles from '../styles/code.module.css'
import ToastContext from '../context/toast'

type Props = {
  code: string | undefined
}

const Code: FunctionComponent<Props> = ({ code }) => {
  let toast = useContext(ToastContext)

  let [open, setOpen] = useState(false)
  let codeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    Prism.highlightAll()
  })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (codeRef.current && !codeRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  if (!code) {
    return <div>No code to show</div>
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={styles.toggle}
      >
        <span role="img" className="mr-1.5">
          👀
        </span>
        Show Code
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/50">
          <div
            className="bg-[#272822] p-4 rounded-xl relative max-w-5xl"
            ref={codeRef}
          >
            <CopyToClipboard
              text={code}
              onCopy={() => toast('Copied to Clipboard!')}
            >
              <button type="button" className={styles.button}>
                <span role="img" className="mr-1.5">
                  📋
                </span>
                Copy
              </button>
            </CopyToClipboard>

            <pre>
              <code className="language-html">{code}</code>
            </pre>
          </div>
        </div>
      )}
    </>
  )
}

export default Code
