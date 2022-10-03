import { RefObject, useState } from 'react'

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
  const [previewHeight, setPreviewHeight] = useState<string>('400px')

  function handleIframeLoaded(targetEl: EventTarget) {
    const iframeEl = targetEl as HTMLIFrameElement
    const iframeElHeight =
      iframeEl?.contentWindow?.document.body.scrollHeight ?? 0

    iframeElHeight > 800
      ? setPreviewHeight('800px')
      : setPreviewHeight(`${iframeElHeight}px`)
  }

  return (
    <div className={showPreview ? 'block' : 'hidden'}>
      <iframe
        className="w-full rounded-lg bg-white ring-2 ring-black lg:transition-all"
        loading="lazy"
        srcDoc={componentHtml}
        style={{ maxWidth: previewWidth, minHeight: previewHeight }}
        title={`${componentTitle} Component`}
        ref={refIframe}
        onLoad={(e) => handleIframeLoaded(e.target)}
      ></iframe>
    </div>
  )
}

export default PreviewIframe
