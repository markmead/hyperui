import { useEffect, useState } from 'react'

import { useMeasure } from 'react-use'

export default function PreviewIframe({
  showPreview,
  componentHtml,
  componentTitle,
  previewWidth = '100%',
  refIframe,
  previewDark,
}) {
  const [iframeHeight, setIframeHeight] = useState(0)

  const [localRefIframe, { width }] = useMeasure()

  useEffect(() => {
    handleResize()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

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

  function setRefs(iframeEl) {
    localRefIframe(iframeEl)

    refIframe.current = iframeEl
  }

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
        ref={(iframeEl) => setRefs(iframeEl)}
        onLoad={handleLoad}
      ></iframe>
    </div>
  )
}
