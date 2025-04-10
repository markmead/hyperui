import ButtonStyle from '@component/ButtonStyle'

export default function PreviewView({ showPreview, handleSetShowPreview }) {
  return (
    <button type="button" onClick={() => handleSetShowPreview(!showPreview)}>
      <ButtonStyle
        buttonEmoji={showPreview ? '👀' : '👾'}
        buttonText={showPreview ? 'View' : 'Code'}
      />
    </button>
  )
}
