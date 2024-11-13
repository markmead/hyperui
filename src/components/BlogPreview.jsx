'use client'

import { useEffect, useRef, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import { blogPreviewHtml } from '@util/transformers'

import PreviewCode from '@component/PreviewCode'
import PreviewIframe from '@component/PreviewIframe'
import PreviewView from '@component/PreviewView'

export default function BlogPreview({ previewId, previewTitle, previewContainer }) {
  const refIframe = useRef(null)

  const [previewCode, setPreviewCode] = useState('')
  const [previewHtml, setPreviewHtml] = useState('')
  const [showPreview, setShowPreview] = useState(true)

  const isDarkMode = false

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      fetchHtml()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  async function fetchHtml() {
    const previewUrl = `/blogs/${previewId}.html`

    const fetchResponse = await fetch(previewUrl)
    const textResponse = await fetchResponse.text()
    const transformedHtml = blogPreviewHtml(textResponse, previewContainer, isDarkMode)

    setPreviewHtml(transformedHtml)
    setPreviewCode(textResponse)
  }

  return (
    <div className="not-prose space-y-4 lg:-ms-[10ch] lg:w-[85ch]" ref={ref}>
      {previewCode && (
        <PreviewView handleSetShowPreview={setShowPreview} showPreview={showPreview} />
      )}

      <div className="relative">
        <div>
          <PreviewIframe
            showPreview={showPreview}
            componentHtml={previewHtml}
            componentTitle={previewTitle}
            refIframe={refIframe}
            previewDark={isDarkMode}
          />

          <PreviewCode showPreview={showPreview} componentCode={previewCode} />
        </div>
      </div>
    </div>
  )
}
