import { useCallback, useEffect, useMemo, useState } from 'react'
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
import PreviewCreator from '@component/PreviewCreator'
import PreviewPlugins from '@component/PreviewPlugins'
import PreviewIframe from '@component/PreviewIframe'
import PreviewRtl from '@component/PreviewRtl'
import PreviewTitle from '@component/PreviewTitle'
import FavoriteButton from '@component/FavoriteButton'
import PreviewType from '@component/PreviewType'
import PreviewView from '@component/PreviewView'

export default function ComponentPreview({ componentData }) {
  const [codeType, setCodeType] = useState('html')
  const [componentCode, setComponentCode] = useState('')
  const [componentJsx, setComponentJsx] = useState('')
  const [componentVue, setComponentVue] = useState('')
  const [isRtl, setIsRtl] = useState(false)
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
    creator: componentCreator,
    dark: componentDark,
    plugins: componentPlugins,
  } = componentData

  const componentHash = `component-${componentId}`

  const previewBreakpoints = useMemo(
    () => [
      { name: 'Mobile', emoji: '📱', width: '340px' },
      { name: 'Small', emoji: '🐛', width: '640px' },
      { name: 'Medium', emoji: '🦭', width: '768px' },
      { name: 'Large', emoji: '🐴', width: '1024px' },
      { name: 'Full', emoji: '🌕', width: '100%' },
    ],
    []
  )

  const componentHtml = useMemo(() => {
    if (!componentCode) return ''

    return componentPreviewHtml(componentCode, componentSpace, isRtl)
  }, [componentCode, componentSpace, isRtl])

  const previewCode = useMemo(() => {
    if (!componentCode) return ''

    if (codeType === 'html') return componentCode

    if (codeType === 'jsx') return componentJsx || componentPreviewJsx(componentCode)

    if (codeType === 'vue') return componentVue || componentPreviewVue(componentCode)

    return componentCode
  }, [codeType, componentCode, componentJsx, componentVue])

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
  }, [componentHash])

  const fetchHtml = useCallback(async () => {
    const componentUrl = `/components/${categorySlug}/${componentSlug}/${componentId}.html`

    const fetchResponse = await fetch(componentUrl)
    const textResponse = await fetchResponse.text()

    const transformedJsx = codeType === 'jsx' ? componentPreviewJsx(textResponse) : ''
    const transformedVue = codeType === 'vue' ? componentPreviewVue(textResponse) : ''

    setComponentCode(textResponse)
    setComponentJsx(transformedJsx)
    setComponentVue(transformedVue)
  }, [categorySlug, componentSlug, componentId, codeType])

  useEffect(() => {
    if (!inView) {
      return
    }

    fetchHtml()
  }, [inView, fetchHtml])

  useEffect(() => {
    if (!componentCode) {
      return
    }

    const pageUrl = new URL(globalThis.location.href)

    pageUrl.hash = componentHash

    pageUrl.searchParams.set('codeType', codeType)
    pageUrl.searchParams.set('isRtl', isRtl)
    pageUrl.searchParams.set('previewWidth', previewWidth)

    setShareUrl(pageUrl.toString())
  }, [codeType, isRtl, previewWidth, componentHash, componentCode])

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
          />
        ) : (
          <PreviewCode componentId={componentId} codeType={codeType} componentCode={previewCode} />
        )}

        <div>
          <PreviewCreator creatorGithub={componentCreator} />

          {componentPlugins.length > 0 && <PreviewPlugins componentPlugins={componentPlugins} />}
        </div>
      </div>
    </div>
  )
}
