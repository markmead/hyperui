import styles from '@/styles/button.module.css'

type Props = {
  showPreview: boolean
  handleSetShowPreview: CallableFunction
}

function PreviewView({ showPreview, handleSetShowPreview }: Props) {
  return (
    <button
      onClick={() => handleSetShowPreview(!showPreview)}
      className={styles.pill}
    >
      <span aria-hidden="true" className="text-sm" role="img">
        👀
      </span>

      <span className="text-xs font-medium">View</span>
    </button>
  )
}

export default PreviewView
