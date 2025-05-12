import ButtonStyle from '@component/ButtonStyle'

export default function PreviewView({ showPreview, handleSetShowPreview }) {
  return (
    <button onClick={() => handleSetShowPreview(!showPreview)}>
      <ButtonStyle
        buttonEmoji={showPreview ? '👾' : '👀'}
        buttonText={showPreview ? 'Code' : 'View'}
      />
    </button>
  )
}