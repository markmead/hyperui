export default function PreviewIframe({
  showPreview,
  componentHtml,
  componentTitle,
  previewWidth = '100%',
  previewHeight = 'h-[400px] lg:h-[600px]',
  previewDark = false,
  refIframe,
}) {
  const iframeTheme = previewDark ? 'bg-gray-900' : 'bg-white'

  return (
    <div
      {...(!showPreview && {
        hidden: true,
      })}
      className="rounded-md"
    >
      <iframe
        className={`w-full rounded-md ring-2 ring-gray-900 duration-300 lg:transition-[max-width] ${iframeTheme} ${previewHeight}`}
        loading="lazy"
        srcDoc={componentHtml}
        style={{ maxWidth: previewWidth }}
        title={componentTitle}
        ref={refIframe}
      ></iframe>
    </div>
  )
}
