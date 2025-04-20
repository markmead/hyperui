import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { useInView } from 'react-intersection-observer'

import { componentBreakpoints } from '@data/breakpoints'
import { componentPreviewHtml, componentPreviewJsx, componentPreviewVue } from '@util/transformers'

import PreviewBreakpoint from '@component/PreviewBreakpoint'
import PreviewCode from '@component/PreviewCode'
import PreviewCopy from '@component/PreviewCopy'
import PreviewCreator from '@component/PreviewCreator'
import PreviewPlugins from '@component/PreviewPlugins'
import PreviewIframe from '@component/PreviewIframe'
import PreviewRtl from '@component/PreviewRtl'
import PreviewTitle from '@component/PreviewTitle'
import PreviewType from '@component/PreviewType'
import PreviewView from '@component/PreviewView'

export default function ComponentPreview({ componentData }) {
  const refIframe = useRef(null)

  const [codeType, setCodeType] = useState('html')
  const [componentCode, setComponentCode] = useState('')
  const [componentHtml, setComponentHtml] = useState('')
  const [componentJsx, setComponentJsx] = useState('')
  const [componentVue, setComponentVue] = useState('')
  const [isRtl, setIsRtl] = useState(false)
  const [previewCode, setPreviewCode] = useState('')
  const [previewWidth, setPreviewWidth] = useState('100%')
  const [showPreview, setShowPreview] = useState(true)

  const { category: categorySlug } = useParams()

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  const {
    id: componentId,
    title: componentTitle,
    slug: componentSlug,
    container: componentSpace,
    wrapper: componentHeight,
    creator: componentCreator,
    dark: componentDark,
    plugins: componentPlugins,
  } = componentData

  const componentHash = `component-${componentId}`

  const isHtml = codeType === 'html'
  const isJsx = codeType === 'jsx'
  const isVue = codeType === 'vue'

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
    setPreviewCode(
      isHtml ? componentCode : isJsx ? componentJsx : isVue ? componentVue : componentCode
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeType])

  async function fetchHtml() {
    const componentUrl = `/components/${categorySlug}/${componentSlug}/${componentId}.html`

    const fetchResponse = await fetch(componentUrl)
    const textResponse = await fetchResponse.text()

    const transformedHtml = componentPreviewHtml(textResponse, componentSpace, isRtl)
    const transformedJsx = componentPreviewJsx(textResponse)
    const transformedVue = componentPreviewVue(textResponse)

    setPreviewCode(
      isHtml ? textResponse : isJsx ? transformedJsx : isVue ? transformedVue : textResponse
    )
    setComponentCode(textResponse)
    setComponentHtml(transformedHtml)
    setComponentJsx(transformedJsx)
    setComponentVue(transformedVue)
  }

  return (
    <div ref={ref} id={componentHash}>
      <div className="space-y-4">
        <PreviewTitle componentTitle={componentTitle} componentHash={componentHash} />

        <div className="lg:flex lg:items-center">
          {componentCode && (
            <div className="flex flex-wrap items-center gap-2">
              <PreviewView handleSetShowPreview={setShowPreview} showPreview={showPreview} />

              <PreviewRtl isRtl={isRtl} handleSetIsRtl={setIsRtl} />

              <PreviewCopy componentCode={previewCode} />

              <PreviewType
                componentId={componentId}
                codeType={codeType}
                handleSetCodeType={setCodeType}
              />
            </div>
          )}

          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-2">
            <p className="text-sm font-medium text-gray-700">@ {previewWidth}</p>

            {componentBreakpoints.map(
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
            refIframe={refIframe}
          />
        ) : (
          <PreviewCode componentId={componentId} codeType={codeType} componentCode={previewCode} />
        )}

        <PreviewCreator creatorGithub={componentCreator} />

        {!!componentPlugins.length && <PreviewPlugins componentPlugins={componentPlugins} />}
      </div>
    </div>
  )
}
