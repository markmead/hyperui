import { useState } from 'react'

import styles from '@/styles/button.module.css'

type Props = {
  componentCode: string
}

function Copy({ componentCode }: Props) {
  const [buttonText, setButtonText] = useState('Copy')
  const [buttonEmoji, setButtonEmoji] = useState('📋')
  const [hasError, setHasError] = useState(false)

  function copyToClipboard() {
    navigator.clipboard.writeText(componentCode).then(
      function () {
        setHasError(false)

        setButtonEmoji('✅')
        setButtonText('Copied')

        setTimeout(() => {
          setButtonEmoji('📋')
          setButtonText('Copy')
        }, 3000)
      },
      function () {
        setHasError(true)
      }
    )
  }

  return (
    <>
      <button className={styles.pill} onClick={copyToClipboard}>
        <span aria-hidden="true" className="text-sm" role="img">
          {buttonEmoji}
        </span>

        <span className="text-xs font-medium">{buttonText}</span>
      </button>

      {hasError && (
        <span className="text-xs font-medium text-red-600">
          🚨 Failed copying to clipboard 🚨
        </span>
      )}
    </>
  )
}

export default Copy
