import ButtonStyle from '@/components/ButtonStyle'

type Props = {
  isRtl: boolean
  handleSetIsRtl: CallableFunction
}

function PreviewRtl({ isRtl, handleSetIsRtl }: Props) {
  const buttonStyle = isRtl
    ? 'bg-gray-900 text-white dark:bg-gray-700 dark:text-white'
    : ''

  return (
    <button onClick={() => handleSetIsRtl(!isRtl)}>
      <ButtonStyle
        emoji={isRtl ? '👈' : '👉'}
        text={isRtl ? 'RTL' : 'LTR'}
        style={buttonStyle}
      />
    </button>
  )
}

export default PreviewRtl
