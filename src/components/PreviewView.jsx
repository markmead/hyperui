import Button from '@component/Button'

export default function PreviewView({ showPreview, handleSetShowPreview }) {
  return (
    <Button onClick={() => handleSetShowPreview(!showPreview)}>
      <span aria-hidden="true">{showPreview ? '👀' : '👾'}</span>
      <span>{showPreview ? 'View' : 'Code'}</span>
    </Button>
  )
}
