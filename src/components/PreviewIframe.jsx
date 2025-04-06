export default function PreviewIframe({
  componentHtml,
  componentTitle,
  previewWidth = '100%',
  previewHeight = 'h-[400px] lg:h-[600px]',
  previewDark = false,
  refIframe,
}) {
  const iframeTheme = previewDark ? 'bg-gray-900' : 'bg-white'

  return (
    <iframe
      className={`w-full rounded-md ring ring-gray-300 duration-500 lg:transition-[max-width] ${iframeTheme} ${previewHeight}`}
      loading="lazy"
      srcDoc={componentHtml}
      style={{ maxWidth: previewWidth }}
      title={componentTitle}
      ref={refIframe}
    ></iframe>
  )
}
