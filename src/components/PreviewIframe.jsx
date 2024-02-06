export default function PreviewIframe({
  showPreview,
  componentHtml,
  componentTitle,
  previewWidth = '100%',
  previewHeight = 'h-[400px] lg:h-[600px]',
  refIframe,
  previewDark,
}) {
  const iframeTheme = previewDark ? 'bg-gray-950' : 'bg-white'

  return (
    <div
      {...(!showPreview && {
        hidden: true,
      })}
      className="rounded-md bg-white bg-[linear-gradient(45deg,_rgb(249_250_251)_25%,_transparent_25%),_linear-gradient(-45deg,_rgb(249_250_251)_25%,_transparent_25%),_linear-gradient(45deg,_transparent_75%,_rgb(249_250_251)_75%),_linear-gradient(-45deg,_transparent_75%,_rgb(249_250_251)_75%)] bg-[length:_20px_20px] [background-position:_0_0,_0_10px,_10px_-10px,_-10px_0px] "
    >
      <iframe
        className={`w-full rounded-md ring-2 ring-gray-900 lg:transition-all ${iframeTheme} ${previewHeight}`}
        loading="lazy"
        srcDoc={componentHtml}
        style={{ maxWidth: previewWidth }}
        title={`${componentTitle} Component`}
        ref={refIframe}
      ></iframe>
    </div>
  )
}
