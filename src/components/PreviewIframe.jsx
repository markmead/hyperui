import { useState } from 'react'

import { useEvent } from 'react-use'

export default function PreviewIframe({
  showPreview,
  componentHtml,
  componentTitle,
  previewWidth = '100%',
  refIframe,
  previewDark,
}) {
  const [iframeHeight, setIframeHeight] = useState(0)

  function handleLoad() {
    if (!refIframe.current) return

    // We check if the iframeHeight is already set to avoid
    // it resetting when loading a component variant
    if (iframeHeight) return

    setIframeHeight(refIframe.current.contentWindow.document.body.scrollHeight)
  }

  function handleResize() {
    if (!refIframe.current) return

    setIframeHeight(refIframe.current.contentWindow.document.body.scrollHeight)
  }

  useEvent('resize', handleResize, window, { capture: true })

  return (
    <div className={showPreview ? 'block' : 'hidden'}>
      <iframe
        className={`w-full rounded-lg ring-2 ring-gray-900 lg:transition-all ${
          previewDark ? 'bg-gray-950' : 'bg-white'
        }`}
        loading="lazy"
        srcDoc={componentHtml}
        style={{
          maxWidth: previewWidth,
          height: iframeHeight ? iframeHeight : '400px',
        }}
        title={`${componentTitle} Component`}
        ref={refIframe}
        onLoad={handleLoad}
      ></iframe>
    </div>
  )
}
