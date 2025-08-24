import Button from '@component/global/Button'
import Tooltip from '@component/global/Tooltip'

export default function PreviewView({ showPreview, handleSetShowPreview }) {
  return (
    <Tooltip tooltipContent={showPreview ? 'Show code view' : 'Show component preview'}>
      <Button
        onClick={() => handleSetShowPreview(!showPreview)}
        aria-pressed={showPreview}
        aria-label={showPreview ? 'Show code view' : 'Show component preview'}
      >
        <span aria-hidden="true">{showPreview ? '👾' : '👀'}</span>
        <span>{showPreview ? 'Code' : 'View'}</span>
      </Button>
    </Tooltip>
  )
}
