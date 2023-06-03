export default function PreviewIframe({
  showPreview,
  componentHtml,
  componentTitle,
  previewWidth = '100%',
  refIframe,
  previewDark,
}) {
  const iframeTheme = previewDark ? 'bg-gray-950' : 'bg-white'

  return (
    <div
      {...(!showPreview && {
        hidden: true,
      })}
    >
      <iframe
        className={`h-[400px] w-full rounded-lg ring-2 ring-gray-900 lg:h-[600px] lg:transition-all ${iframeTheme}`}
        loading="lazy"
        srcDoc={componentHtml}
        style={{ maxWidth: previewWidth }}
        title={`${componentTitle} Component`}
        ref={refIframe}
      ></iframe>
    </div>
  )
}
