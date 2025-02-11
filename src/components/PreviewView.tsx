import ButtonStyle from '@component/ButtonStyle'

interface iProps {
  showPreview: boolean
  handleSetShowPreview: (showPreview: boolean) => void
}

export default function PreviewView({ showPreview, handleSetShowPreview }: iProps) {
  return (
    <button onClick={() => handleSetShowPreview(!showPreview)}>
      <ButtonStyle buttonActive={!showPreview} buttonEmoji="👀" buttonText="View" />
    </button>
  )
}
