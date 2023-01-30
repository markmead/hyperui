import IconLoading from '@/components/IconLoading'

type Props = {
  previewWidth: string
  isDarkMode: boolean
}

function PreviewLoading({ previewWidth, isDarkMode }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 grid place-content-center rounded-lg ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}
      style={{ maxWidth: previewWidth }}
    >
      <IconLoading />
    </div>
  )
}

export default PreviewLoading
