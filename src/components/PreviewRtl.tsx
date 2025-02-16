import ButtonStyle from '@component/ButtonStyle'

interface Props {
  isRtl: boolean
  handleSetIsRtl: (isRtl: boolean) => void
}

export default function PreviewRtl({ isRtl, handleSetIsRtl }: Props) {
  const buttonEmoji: string = isRtl ? '👈' : '👉'
  const buttonText: string = isRtl ? 'RTL' : 'LTR'

  return (
    <button type="button" onClick={() => handleSetIsRtl(!isRtl)}>
      <ButtonStyle buttonActive={isRtl} buttonEmoji={buttonEmoji} buttonText={buttonText} />
    </button>
  )
}
