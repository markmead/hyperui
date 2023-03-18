import ButtonStyle from '@/components/ButtonStyle'

type Props = {
  showPreview: boolean
  handleSetShowPreview: CallableFunction
}

function PreviewView({ showPreview, handleSetShowPreview }: Props) {
  return (
    <button onClick={() => handleSetShowPreview(!showPreview)}>
      <ButtonStyle emoji="👀" text="View" />
    </button>
  )
}

export default PreviewView
