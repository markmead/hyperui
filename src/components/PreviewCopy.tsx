import { useState } from 'react'
import { useCopyToClipboard } from 'react-use'

import ButtonStyle from '@component/ButtonStyle'

interface iProps {
  componentCode: string
}

export default function PreviewCopy({ componentCode = '' }: iProps) {
  const [buttonText, setButtonText] = useState('Copy')
  const [buttonEmoji, setButtonEmoji] = useState('📋')
  const [copyStatus, copyToClipboard] = useCopyToClipboard()

  const buttonActive: boolean = buttonText === 'Copied'

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
    <button
      className="hidden *:-ml-[2px] *:rounded-l-none sm:block"
      onClick={handleCopyToClipboard}
    >
      <ButtonStyle buttonActive={buttonActive} buttonEmoji={buttonEmoji} buttonText={buttonText} />
    </button>
  )
}
