import { useState } from 'react'
import { useCopyToClipboard } from 'react-use'

import ButtonStyle from '@component/ButtonStyle'

interface Props {
  componentCode: string
}

export default function PreviewCopy({ componentCode = '' }: Props) {
  const [buttonText, setButtonText] = useState<string>('Copy')
  const [buttonEmoji, setButtonEmoji] = useState<string>('📋')
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
      type="button"
      onClick={handleCopyToClipboard}
    >
      <ButtonStyle buttonActive={buttonActive} buttonEmoji={buttonEmoji} buttonText={buttonText} />
    </button>
  )
}
