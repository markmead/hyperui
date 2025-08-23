import Button from '@component/global/Button'

export default function PreviewView({ showPreview, handleSetShowPreview }) {
  return (
    <Button
      onClick={() => handleSetShowPreview(!showPreview)}
      aria-pressed={showPreview}
      aria-label={showPreview ? 'Show code view' : 'Show component preview'}
    >
      <span aria-hidden="true">{showPreview ? '👀' : '👾'}</span>
      <span>{showPreview ? 'View' : 'Code'}</span>
    </Button>
  )
}
