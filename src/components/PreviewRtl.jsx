import ButtonStyle from '@component/ButtonStyle'

export default function PreviewRtl({ isRtl, handleSetIsRtl }) {
  return (
    <button type="button" onClick={() => handleSetIsRtl(!isRtl)}>
      <ButtonStyle buttonEmoji={isRtl ? '👈' : '👉'} buttonText={isRtl ? 'RTL' : 'LTR'} />
    </button>
  )
}
