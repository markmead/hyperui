import styles from '@/styles/button.module.css'

type Props = {
  showEditor: boolean
  handleSetShowEditor: CallableFunction
}

function PreviewEditor({ showEditor, handleSetShowEditor }: Props) {
  return (
    <button
      onClick={() => handleSetShowEditor(!showEditor)}
      className={`${styles.pill} ${
        showEditor ? 'bg-black text-white' : 'text-black'
      }`}
    >
      <span aria-hidden="true" role="img" className="text-sm">
        🧼
      </span>

      <span className="text-xs font-medium">Editor</span>
    </button>
  )
}

export default PreviewEditor
