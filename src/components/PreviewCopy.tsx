import { useState } from 'react'

import ButtonStyle from '@/components/ButtonStyle'

type Props = {
  componentCode?: string
}

function Copy({ componentCode = '' }: Props) {
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
    <button className="hidden sm:block" onClick={copyToClipboard}>
      <ButtonStyle emoji={buttonEmoji} text={buttonText} />
    </button>
  )
}

export default Copy
