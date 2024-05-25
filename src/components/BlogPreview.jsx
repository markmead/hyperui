'use client'

import { useEffect, useRef, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import { blogPreviewHtml, componentPreviewJsx, componentPreviewVue } from '@util/transformers'

import PreviewCode from '@component/PreviewCode'
import PreviewCopy from '@component/PreviewCopy'
import PreviewIframe from '@component/PreviewIframe'
import PreviewView from '@component/PreviewView'
import PreviewType from '@component/PreviewType'

export default function BlogPreview({ previewId, previewTitle, previewContainer }) {
  const refIframe = useRef(null)

  const [previewCode, setPreviewCode] = useState('')
  const [previewHtml, setPreviewHtml] = useState('')
  const [previewJsx, setPreviewJsx] = useState('')
  const [previewVue, setPreviewVue] = useState('')
  const [showPreview, setShowPreview] = useState(true)
  const [isDarkMode] = useState(false)
  const [codeType, setCodeType] = useState('html')

  const componentId = previewId

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

  useEffect(() => {
    codeType === 'html' && setPreviewCode(previewCode)
    codeType === 'jsx' && setPreviewCode(previewJsx)
    codeType === 'vue' && setPreviewCode(previewVue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeType])

  async function fetchHtml() {
    const previewUrl = `/blogs/${previewId}.html`

    const fetchResponse = await fetch(previewUrl)
    const textResponse = await fetchResponse.text()
    const transformedHtml = blogPreviewHtml(textResponse, previewContainer, isDarkMode)
    const transformedJsx = componentPreviewJsx(textResponse)
    const transformedVue = componentPreviewVue(textResponse)

    setPreviewCode(textResponse)
    setPreviewHtml(transformedHtml)
    setPreviewJsx(transformedJsx)
    setPreviewVue(transformedVue)
  }

  return (
    <div className="not-prose space-y-4 lg:-ms-[10ch] lg:w-[85ch]" ref={ref}>
      {previewCode && (
        <div className="flex gap-2 sm:gap-4">
          <PreviewView handleSetShowPreview={setShowPreview} showPreview={showPreview} />

          <PreviewType componentId={componentId} handleSetCodeType={setCodeType} />

          <PreviewCopy componentCode={previewCode} codeType={codeType} />
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
