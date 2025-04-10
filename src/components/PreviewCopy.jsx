import { useState } from 'react'
import { useCopyToClipboard } from 'react-use'

import ButtonStyle from '@component/ButtonStyle'

export default function PreviewCopy({ componentCode = '' }) {
  const [buttonText, setButtonText] = useState('Copy')
  const [buttonEmoji, setButtonEmoji] = useState('📋')
  const [copyStatus, copyToClipboard] = useCopyToClipboard()

  function handleCopyToClipboard() {
    copyToClipboard(componentCode)

    if (copyStatus.error) {
      setButtonText('Error')
      setButtonEmoji('🚨')

      return
    }

    setButtonText('Copied')
    setButtonEmoji('🎉')

    setTimeout(() => {
      setButtonText('Copy')
      setButtonEmoji('📋')
    }, 3000)
  }

  return (
    <button type="button" onClick={handleCopyToClipboard} className="hidden sm:block">
      <ButtonStyle buttonEmoji={buttonEmoji} buttonText={buttonText} />
    </button>
  )
}
