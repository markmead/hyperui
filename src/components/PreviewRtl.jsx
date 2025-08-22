import Button from '@component/global/Button'

export default function PreviewRtl({ isRtl, handleSetIsRtl }) {
  return (
    <Button
      onClick={() => handleSetIsRtl(!isRtl)}
      aria-pressed={isRtl}
      aria-label="Toggle RTL mode"
    >
      <span aria-hidden="true">{isRtl ? '👈' : '👉'}</span>
      <span>{isRtl ? 'RTL' : 'LTR'}</span>
    </Button>
  )
}
