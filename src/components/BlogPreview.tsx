import { useEffect, useRef, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import Prism from 'prismjs'

import { blogHtml } from '@/services/utils/transformers'

import Loading from '@/components/PreviewLoading'
import ViewSwitcher from '@/components/PreviewView'
import CopyCode from '@/components/PreviewCopy'

type Props = {
  previewId: string
  previewTitle: string
}

function BlogPreview({ previewId, previewTitle }: Props) {
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
  }, [inView])

  async function fetchHtml() {
    const previewUrl = `/blogs/${previewId}.html`

    const fetchResponse = await fetch(previewUrl)
    const textResponse = await fetchResponse.text()
    const transformedHtml = blogHtml(textResponse)

    setPreviewCode(textResponse)
    setPreviewHtml(transformedHtml)

    setTimeout(() => setIsLoading(false), 350)
  }

  return (
    <div className="not-prose space-y-4 lg:-ml-[10ch] lg:w-[85ch]" ref={ref}>
      {previewCode && (
        <div className="flex justify-end gap-4">
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
          <div className={showPreview ? 'block' : 'hidden'}>
            <iframe
              className="h-[500px] w-full rounded-lg bg-white ring-2 ring-black"
              loading="lazy"
              srcDoc={previewHtml}
              title={previewTitle}
              ref={refIframe}
            ></iframe>
          </div>

          <div className={showPreview ? 'hidden' : 'block'}>
            <pre className="h-[500px] overflow-auto rounded-lg p-4 ring-2 ring-black">
              <code className="language-html">{previewCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPreview
