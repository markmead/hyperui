import Button from '@component/global/Button'

export default function PreviewRtl({ isRtl, handleSetIsRtl }) {
  return (
    <Button onClick={() => handleSetIsRtl(!isRtl)}>
      <span aria-hidden="true">{isRtl ? '👈' : '👉'}</span>
      <span>{isRtl ? 'RTL' : 'LTR'}</span>
    </Button>
  )
}
