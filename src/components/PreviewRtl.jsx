import Button from '@component/global/Button'

export default function PreviewRtl({ isRtl, handleSetIsRtl }) {
  return (
    <Button
      onClick={() => handleSetIsRtl(!isRtl)}
      aria-pressed={isRtl}
      aria-label={
        isRtl ? 'Switch to left-to-right (LTR) layout' : 'Switch to right-to-left (RTL) layout'
      }
    >
      <span aria-hidden="true">{isRtl ? '👈' : '👉'}</span>
      <span>{isRtl ? 'RTL' : 'LTR'}</span>
    </Button>
  )
}
