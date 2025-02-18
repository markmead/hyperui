'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { componentPreviewHtml } from '@util/transformers'
import PreviewCode from '@component/PreviewCode'
import PreviewIframe from '@component/PreviewIframe'
import PreviewView from '@component/PreviewView'

interface Props {
  previewId: string
  previewTitle: string
  previewContainer: string
}

export default function BlogPreview({ previewId, previewTitle, previewContainer }: Props) {
  const refIframe = useRef<HTMLIFrameElement | null>(null)

  const [previewCode, setPreviewCode] = useState<string>('')
  const [previewHtml, setPreviewHtml] = useState<string>('')
  const [showPreview, setShowPreview] = useState<boolean>(true)

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

    const fetchResponse: Awaited<Response> = await fetch(previewUrl)
    const textResponse: Awaited<string> = await fetchResponse.text()
    const transformedHtml: string = componentPreviewHtml(textResponse, previewContainer, isDarkMode)

    setPreviewHtml(transformedHtml)
    setPreviewCode(textResponse)
  }

  return (
    <div ref={ref} className="not-prose space-y-4 lg:-ms-[10ch] lg:w-[85ch]">
      {previewCode && (
        <PreviewView handleSetShowPreview={setShowPreview} showPreview={showPreview} />
      )}

      <div className="relative">
        <>
          <PreviewIframe
            showPreview={showPreview}
            componentHtml={previewHtml}
            componentTitle={previewTitle}
            refIframe={refIframe}
            previewDark={isDarkMode}
          />

          <PreviewCode showPreview={showPreview} componentCode={previewCode} />
        </>
      </div>
    </div>
  )
}
