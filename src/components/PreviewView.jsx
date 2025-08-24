import Button from '@component/global/Button'
import Tooltip from '@component/global/Tooltip'

export default function PreviewView({ showPreview, handleSetShowPreview }) {
  const descriptiveContent = showPreview ? 'Show code view' : 'Show component preview'

  return (
    <Tooltip tooltipContent={descriptiveContent}>
      <Button
        onClick={() => handleSetShowPreview(!showPreview)}
        aria-pressed={showPreview}
        aria-label={descriptiveContent}
      >
        <span aria-hidden="true">{showPreview ? '👾' : '👀'}</span>
        <span>{showPreview ? 'Code' : 'View'}</span>
      </Button>
    </Tooltip>
  )
}
