import ButtonStyle from '@component/ButtonStyle'

interface Props {
  showPreview: boolean
  handleSetShowPreview: (showPreview: boolean) => void
}

export default function PreviewView({ showPreview, handleSetShowPreview }: Props) {
  return (
    <button type="button" onClick={() => handleSetShowPreview(!showPreview)}>
      <ButtonStyle buttonActive={!showPreview} buttonEmoji="👀" buttonText="View" />
    </button>
  )
}
