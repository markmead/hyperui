import ButtonStyle from '@component/ButtonStyle'

interface iProps {
  isRtl: boolean
  handleSetIsRtl: (isRtl: boolean) => void
}

export default function PreviewRtl({ isRtl, handleSetIsRtl }: iProps) {
  return (
    <button onClick={() => handleSetIsRtl(!isRtl)}>
      <ButtonStyle
        buttonActive={isRtl}
        buttonEmoji={isRtl ? '👈' : '👉'}
        buttonText={isRtl ? 'RTL' : 'LTR'}
      />
    </button>
  )
}
