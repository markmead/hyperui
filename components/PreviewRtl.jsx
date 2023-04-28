import ButtonStyle from '@component/ButtonStyle'

export default function PreviewRtl({ isRtl, handleSetIsRtl }) {
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