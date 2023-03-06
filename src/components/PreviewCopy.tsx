import { useState } from 'react'

import styles from '@/styles/button.module.css'
import { settingsState } from '@/services/store/slices/settings'
import { useAppSelector } from '@/services/hooks/useStore'

type Props = {
  componentCode: string
}

function Copy({ componentCode }: Props) {
  const { useJsx } = useAppSelector(settingsState)

  const [buttonText, setButtonText] = useState(useJsx ? 'Copy JSX' : 'Copy')
  const [buttonEmoji, setButtonEmoji] = useState('📋')

  function copyToClipboard() {
    const finalComponentCode = useJsx
      ? componentCode.replaceAll(/class="/gi, 'className="')
      : componentCode

    navigator.clipboard.writeText(finalComponentCode).then(function () {
      setButtonEmoji('✅')
      setButtonText('Copied')

      setTimeout(() => {
        setButtonEmoji('📋')
        setButtonText(useJsx ? 'Copy JSX' : 'Copy')
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
