import styles from '@/styles/button.module.css'

type Props = {
  isRtl: boolean
  handleSetIsRtl: CallableFunction
}

function PreviewRtl({ isRtl, handleSetIsRtl }: Props) {
  return (
    <button
      onClick={() => handleSetIsRtl(!isRtl)}
      className={`${styles.pill} ${
        isRtl ? 'bg-black text-white' : 'text-black'
      } disabled:pointer-events-none disabled:opacity-25`}
    >
      <span aria-hidden="true" role="img" className="text-sm">
        {isRtl ? '👈' : '👉'}
      </span>

      <span className="text-xs font-medium">{isRtl ? 'RTL' : 'LTR'}</span>
    </button>
  )
}

export default PreviewRtl
