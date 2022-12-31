import { useState } from 'react'

import styles from '@/styles/button.module.css'

type Props = {
  componentCode: string
}

function Copy({ componentCode }: Props) {
  const [buttonText, setButtonText] = useState('Copy')
  const [buttonEmoji, setButtonEmoji] = useState('📋')

  function copyToClipboard() {
    navigator.clipboard.writeText(componentCode).then(function () {
      setButtonEmoji('✅')
      setButtonText('Copied')

      setTimeout(() => {
        setButtonEmoji('📋')
        setButtonText('Copy')
      }, 3000)
    })
  }

  return (
    <div className="hidden sm:block">
      <button className={styles.pill} onClick={copyToClipboard}>
        <span aria-hidden="true" role="img" className="text-sm">
          {buttonEmoji}
        </span>

        <span className="text-xs font-medium">{buttonText}</span>
      </button>
    </div>
  )
}

export default Copy
