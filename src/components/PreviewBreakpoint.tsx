import styles from '@/styles/button.module.css'

type Props = {
  breakpointActive: boolean
  breakpointEmoji: string
  handleSetPreviewWidth: CallableFunction
  breakpointWidth: string
  breakpointText: string
}

function PreviewBreakpoint({
  breakpointActive,
  breakpointEmoji,
  handleSetPreviewWidth,
  breakpointWidth,
  breakpointText,
}: Props) {
  return (
    <button
      onClick={() => handleSetPreviewWidth(breakpointWidth)}
      className={`${styles.pill} ${
        breakpointActive ? 'bg-black text-white' : 'text-black'
      }`}
    >
      <span aria-hidden="true" role="img" className="text-sm">
        {breakpointEmoji}
      </span>

      <span className="text-xs font-medium">{breakpointText}</span>
    </button>
  )
}

export default PreviewBreakpoint
