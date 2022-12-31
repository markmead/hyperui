import { RefObject } from 'react'

type Props = {
  showPreview: boolean
  componentHtml: string | undefined
  componentTitle: string
  previewWidth: string
  refIframe: RefObject<HTMLIFrameElement>
  isLoading: boolean
}

function PreviewIframe({
  showPreview,
  componentHtml,
  componentTitle,
  previewWidth,
  refIframe,
  isLoading,
}: Props) {
  return (
    <div className={showPreview ? 'block' : 'hidden'}>
      <iframe
        className={`h-[400px] w-full rounded-lg bg-white ring-2 ring-black lg:h-[600px] ${
          !isLoading && 'lg:transition-all'
        }`}
        loading="lazy"
        srcDoc={componentHtml}
        style={{ maxWidth: previewWidth }}
        title={`${componentTitle} Component`}
        ref={refIframe}
      ></iframe>
    </div>
  )
}

export default PreviewIframe
