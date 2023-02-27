import { useEffect, useRef, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import Prism from 'prismjs'

import { blogPreviewHtml } from '@/services/utils/transformers'

import Code from '@/components/PreviewCode'
import CopyCode from '@/components/PreviewCopy'
import Iframe from '@/components/PreviewIframe'
import Loading from '@/components/PreviewLoading'
import ViewSwitcher from '@/components/PreviewView'

type Props = {
  previewId: string
  previewTitle: string
  previewContainer?: string
}

function BlogPreview({ previewId, previewTitle, previewContainer }: Props) {
  const refIframe = useRef(null)

  const [previewCode, setPreviewCode] = useState<string>()
  const [previewHtml, setPreviewHtml] = useState<string>()
  const [showPreview, setShowPreview] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  useEffect(() => Prism.highlightAll(), [previewHtml])

  useEffect(() => {
    async function loadPreview() {
      await fetchHtml()
    }

    if (inView) {
      loadPreview()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  async function fetchHtml() {
    const previewUrl = `/blogs/${previewId}.html`

    const fetchResponse = await fetch(previewUrl)
    const textResponse = await fetchResponse.text()
    const transformedHtml = blogPreviewHtml(textResponse, previewContainer)

    setPreviewCode(textResponse)
    setPreviewHtml(transformedHtml)

    setTimeout(() => setIsLoading(false), 350)
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
        {isLoading && <Loading />}

        <div>
          <Iframe
            showPreview={showPreview}
            componentHtml={previewHtml}
            componentTitle={previewTitle}
            refIframe={refIframe}
          />

          <Code showPreview={showPreview} componentCode={previewCode} />
        </div>
      </div>
    </div>
  )
}

export default BlogPreview
