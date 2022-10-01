import { RefObject } from 'react'

type Props = {
  showPreview: boolean
  componentHtml: string
  componentTitle: string
  previewWidth: string
  refIframe: RefObject<HTMLIFrameElement>
}

function PreviewIframe({
  showPreview,
  componentHtml,
  componentTitle,
  previewWidth,
  refIframe,
}: Props) {
  return (
    <div className={showPreview ? 'block' : 'hidden'}>
      <iframe
        className="h-[400px] w-full rounded-lg bg-white ring-2 ring-black lg:h-[600px] lg:transition-all"
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
