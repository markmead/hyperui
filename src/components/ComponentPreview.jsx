import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import {
  componentPreviewHtml,
  componentPreviewJsx,
  componentPreviewVue,
} from '@service/transformers'

import PreviewBreakpoint from '@component/PreviewBreakpoint'
import PreviewCode from '@component/PreviewCode'
import PreviewCopy from '@component/PreviewCopy'
import PreviewContributors from '@component/PreviewContributors'
import PreviewPlugins from '@component/PreviewPlugins'
import PreviewIframe from '@component/PreviewIframe'
import PreviewRtl from '@component/PreviewRtl'
import PreviewTitle from '@component/PreviewTitle'
import FavoriteButton from '@component/FavoriteButton'
import PreviewType from '@component/PreviewType'
import PreviewView from '@component/PreviewView'

export default function ComponentPreview({ componentData }) {
  const iframeRef = useRef(null)

  const [codeType, setCodeType] = useState('html')
  const [componentCode, setComponentCode] = useState('')
  const [componentHtml, setComponentHtml] = useState('')
  const [componentJsx, setComponentJsx] = useState('')
  const [componentVue, setComponentVue] = useState('')
  const [isRtl, setIsRtl] = useState(false)
  const [previewCode, setPreviewCode] = useState('')
  const [previewWidth, setPreviewWidth] = useState('100%')
  const [showPreview, setShowPreview] = useState(true)
  const [shareUrl, setShareUrl] = useState('')

  const [previewRef] = useAutoAnimate()

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  const {
    id: componentId,
    title: componentTitle,
    slug: componentSlug,
    category: categorySlug,
    container: componentSpace,
    wrapper: componentHeight,
    contributors: componentContributors,
    dark: componentDark,
    plugins: componentPlugins,
  } = componentData

  const previewBreakpoints = [
    { name: 'Mobile', emoji: '📱', width: '340px' },
    { name: 'Small', emoji: '🐛', width: '640px' },
    { name: 'Medium', emoji: '🦭', width: '768px' },
    { name: 'Large', emoji: '🐴', width: '1024px' },
    { name: 'Full', emoji: '🌕', width: '100%' },
  ]

  const componentHash = `component-${componentId}`

  useEffect(() => {
    const searchQuery = new URLSearchParams(globalThis.location.search)

    const searchHash = globalThis.location.hash
    const componentHashFromSearch = searchHash.split('#').at(-1)

    if (componentHash !== componentHashFromSearch) {
      return
    }

    const codeTypeParam = searchQuery.get('codeType')
    const isRtlParam = searchQuery.get('isRtl') === 'true'
    const previewWidthParam = searchQuery.get('previewWidth')

    codeTypeParam && setCodeType(codeTypeParam)
    isRtlParam && setIsRtl(isRtlParam)
    previewWidthParam && setPreviewWidth(previewWidthParam)
  }, [])

  useEffect(() => {
    if (!inView) {
      return
    }

    fetchHtml()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  useEffect(() => {
    if (!inView) {
      return
    }

    const transformedHtml = componentPreviewHtml(componentCode, componentSpace, isRtl)

    setComponentHtml(transformedHtml)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRtl])

  useEffect(() => {
    const codeMap = {
      html: componentCode,
      jsx: componentJsx,
      vue: componentVue,
    }

    setPreviewCode(codeMap[codeType])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeType])

  useEffect(() => {
    const pageUrl = new URL(globalThis.location.href)

    pageUrl.hash = componentHash

    pageUrl.searchParams.set('codeType', codeType)
    pageUrl.searchParams.set('isRtl', isRtl)
    pageUrl.searchParams.set('previewWidth', previewWidth)

    setShareUrl(pageUrl.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeType, isRtl, previewWidth])

  async function fetchHtml() {
    const componentUrl = `/components/${categorySlug}/${componentSlug}/${componentId}.html`

    const fetchResponse = await fetch(componentUrl)
    const textResponse = await fetchResponse.text()

    const transformedHtml = componentPreviewHtml(textResponse, componentSpace, isRtl)
    const transformedJsx = componentPreviewJsx(textResponse)
    const transformedVue = componentPreviewVue(textResponse)

    const codeMap = {
      html: textResponse,
      jsx: transformedJsx,
      vue: transformedVue,
    }

    setPreviewCode(codeMap[codeType])
    setComponentCode(textResponse)
    setComponentHtml(transformedHtml)
    setComponentJsx(transformedJsx)
    setComponentVue(transformedVue)
  }

  return (
    <div ref={ref} id={componentHash}>
      <div ref={previewRef} className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <PreviewTitle componentTitle={componentTitle} shareUrl={shareUrl} />

          <FavoriteButton componentData={componentData} />
        </div>

        <div className="lg:flex lg:items-center">
          {componentCode && (
            <div
              className="flex flex-wrap items-center gap-2"
              role="toolbar"
              aria-label="Component preview controls"
            >
              <PreviewView handleSetShowPreview={setShowPreview} showPreview={showPreview} />

              <PreviewRtl isRtl={isRtl} handleSetIsRtl={setIsRtl} />

              <PreviewCopy componentCode={previewCode} />

              <PreviewType codeType={codeType} handleSetCodeType={setCodeType} />
            </div>
          )}

          <div
            className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-2"
            role="group"
            aria-label="Preview width"
          >
            {previewBreakpoints.map(
              ({ name: breakpointName, emoji: breakpointEmoji, width: breakpointWidth }) => (
                <PreviewBreakpoint
                  key={breakpointName}
                  breakpointText={breakpointName}
                  breakpointEmoji={breakpointEmoji}
                  breakpointWidth={breakpointWidth}
                  handleSetPreviewWidth={setPreviewWidth}
                  breakpointActive={previewWidth === breakpointWidth}
                />
              )
            )}
          </div>
        </div>

        {showPreview ? (
          <PreviewIframe
            componentHtml={componentHtml}
            componentTitle={componentTitle}
            previewWidth={previewWidth}
            previewHeight={componentHeight}
            previewDark={componentDark}
            iframeRef={iframeRef}
          />
        ) : (
          <PreviewCode componentId={componentId} codeType={codeType} componentCode={previewCode} />
        )}

        <div>
          <PreviewContributors componentContributors={componentContributors} />

          {componentPlugins.length > 0 && <PreviewPlugins componentPlugins={componentPlugins} />}
        </div>
      </div>
    </div>
  )
}
