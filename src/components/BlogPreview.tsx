import { useEffect, useRef, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import Prism from 'prismjs'

import { blogPreviewHtml } from '@/services/utils/transformers'

import { useAppSelector } from '@/services/hooks/useStore'
import { settingsState } from '@/services/store/slices/settings'

import Code from '@/components/PreviewCode'
import CopyCode from '@/components/PreviewCopy'
import Iframe from '@/components/PreviewIframe'
import ViewSwitcher from '@/components/PreviewView'

type Props = {
  previewId: string
  previewTitle: string
  previewContainer?: string
}

function BlogPreview({ previewId, previewTitle, previewContainer }: Props) {
  const refIframe = useRef(null)

  const { dark } = useAppSelector(settingsState)

  const [previewCode, setPreviewCode] = useState<string>()
  const [previewHtml, setPreviewHtml] = useState<string>()
  const [showPreview, setShowPreview] = useState<boolean>(true)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  useEffect(() => setIsDarkMode(dark), [dark])
  useEffect(() => Prism.highlightAll(), [previewHtml])

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
  }, [isDarkMode])

  async function fetchHtml() {
    const previewUrl = `/blogs/${previewId}.html`

    const fetchResponse = await fetch(previewUrl)
    const textResponse = await fetchResponse.text()
    const transformedHtml = blogPreviewHtml(
      textResponse,
      previewContainer,
      isDarkMode
    )

    setPreviewCode(textResponse)
    setPreviewHtml(transformedHtml)
  }

  return (
    <div className="not-prose space-y-4 lg:-ml-[10ch] lg:w-[85ch]" ref={ref}>
      {previewCode && (
        <div className="flex gap-4">
          <ViewSwitcher
            handleSetShowPreview={setShowPreview}
            showPreview={showPreview}
          />

          <CopyCode componentCode={previewCode} />
        </div>
      )}

      <div className="relative">
        <div>
          <Iframe
            showPreview={showPreview}
            componentHtml={previewHtml}
            componentTitle={previewTitle}
            refIframe={refIframe}
            previewDark={isDarkMode}
          />

          <Code showPreview={showPreview} componentCode={previewCode} />
        </div>
      </div>
    </div>
  )
}

export default BlogPreview
