import { FunctionComponent, useState } from 'react'

import styles from '../../../styles/button.module.css'

type Props = {
  code: string
}

const Copy: FunctionComponent<Props> = ({ code }) => {
  let [text, setText] = useState('Copy')
  let [emoji, setEmoji] = useState('📋')
  let [error, setError] = useState(false)

  function copyToClipboard() {
    navigator.clipboard.writeText(code).then(
      function () {
        setError(false)

        setEmoji('✅')
        setText('Copied')

        setTimeout(() => {
          setEmoji('📋')
          setText('Copy')
        }, 3000)
      },
      function () {
        setError(true)
      }
    )
  }

  return (
    <>
      <button className={styles.pill} onClick={copyToClipboard}>
        <span aria-hidden="true" className="text-sm mr-1.5" role="img">
          {emoji}
        </span>

        <span className="text-xs font-medium">{text}</span>
      </button>

      {error && (
        <span className="text-xs text-red-600 font-medium">
          🚨 Failed copying to clipboard 🚨
        </span>
      )}
    </>
  )
}

export default Copy
