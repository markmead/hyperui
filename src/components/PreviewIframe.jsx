export default function PreviewIframe({
  showPreview,
  componentHtml,
  componentTitle,
  previewWidth = '100%',
  refIframe,
  previewDark,
}) {
  return (
    <div className={showPreview ? 'block' : 'hidden'}>
      <iframe
        className={`h-[400px] w-full rounded-lg ring-2 ring-gray-900 lg:h-[600px] lg:transition-all ${
          previewDark ? 'bg-gray-950' : 'bg-white'
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
