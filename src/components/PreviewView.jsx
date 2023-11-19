import ButtonStyle from '@component/ButtonStyle'

export default function PreviewView({ showPreview, handleSetShowPreview }) {
  return (
    <button onClick={() => handleSetShowPreview(!showPreview)}>
      <ButtonStyle buttonEmoji="👀" buttonText="View" buttonActive={!showPreview} />
    </button>
  )
}
