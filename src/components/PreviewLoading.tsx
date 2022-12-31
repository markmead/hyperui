import IconLoading from '@/components/IconLoading'

type Props = {
  previewWidth: string
}

function PreviewLoading({ previewWidth }: Props) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 grid place-content-center rounded-lg bg-white"
      style={{ maxWidth: previewWidth }}
    >
      <IconLoading />
    </div>
  )
}

export default PreviewLoading
