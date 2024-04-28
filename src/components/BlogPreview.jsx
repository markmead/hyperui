'use client'

import { useEffect, useRef, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import { blogPreviewHtml } from '@util/transformers'

import PreviewCode from '@component/PreviewCode'
import PreviewCopy from '@component/PreviewCopy'
import PreviewIframe from '@component/PreviewIframe'
import PreviewView from '@component/PreviewView'

export default function BlogPreview({ previewId, previewTitle, previewContainer }) {
  const refIframe = useRef(null)

  const [previewCode, setPreviewCode] = useState('')
  const [previewHtml, setPreviewHtml] = useState('')
  const [showPreview, setShowPreview] = useState(true)
  const [isDarkMode] = useState(false)

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

  useEffect(() => {
    if (inView) {
      fetchHtml()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode])

  async function fetchHtml() {
    const previewUrl = `/blogs/${previewId}.html`

    const fetchResponse = await fetch(previewUrl)
    const textResponse = await fetchResponse.text()
    const transformedHtml = blogPreviewHtml(textResponse, previewContainer, isDarkMode)

    setPreviewCode(textResponse)
    setPreviewHtml(transformedHtml)
  }

  return (
    <div className="not-prose space-y-4 lg:-ms-[10ch] lg:w-[85ch]" ref={ref}>
      {previewCode && (
        <div className="flex gap-4">
          <PreviewView handleSetShowPreview={setShowPreview} showPreview={showPreview} />

          <PreviewCopy componentCode={previewCode} />
        </div>
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
