export default function PreviewIframe({
  componentHtml,
  componentTitle,
  previewWidth = '100%',
  previewHeight = 'h-[400px] lg:h-[600px]',
  previewDark = false,
  iframeRef,
}) {
  const iframeTheme = previewDark ? 'bg-gray-900' : 'bg-white'

  return (
    <iframe
      className={`w-full rounded-lg shadow-md ring ring-stone-300 duration-300 lg:transition-[max-width] ${iframeTheme} ${previewHeight}`}
      loading="lazy"
      srcDoc={componentHtml}
      style={{ maxWidth: previewWidth }}
      title={componentTitle}
      ref={iframeRef}
    ></iframe>
  )
}
