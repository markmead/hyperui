interface iPreviewIframe {
  componentHtml: string
  componentTitle: string
  previewDark?: boolean
  previewHeight?: string
  previewWidth?: string
  refIframe: React.RefObject<HTMLIFrameElement>
  showPreview: boolean
}

export default function PreviewIframe({
  componentHtml,
  componentTitle,
  previewDark,
  previewHeight = 'h-[400px] lg:h-[600px]',
  previewWidth = '100%',
  refIframe,
  showPreview,
}: iPreviewIframe) {
  const iframeTheme: string = previewDark ? 'bg-gray-950' : 'bg-white'

  return (
    <div
      {...(!showPreview && {
        hidden: true,
      })}
      className="rounded-md bg-[linear-gradient(45deg,_rgb(249_250_251)_25%,_transparent_25%),_linear-gradient(-45deg,_rgb(249_250_251)_25%,_transparent_25%),_linear-gradient(45deg,_transparent_75%,_rgb(249_250_251)_75%),_linear-gradient(-45deg,_transparent_75%,_rgb(249_250_251)_75%)] bg-[length:_20px_20px] [background-position:_0_0,_0_10px,_10px_-10px,_-10px_0px]"
    >
      <iframe
        ref={refIframe}
        className={`w-full rounded-md ring-2 ring-gray-900 lg:transition-all ${iframeTheme} ${previewHeight}`}
        loading="lazy"
        srcDoc={componentHtml}
        style={{ maxWidth: previewWidth }}
        title={`${componentTitle} Component`}
      ></iframe>
    </div>
  )
}
