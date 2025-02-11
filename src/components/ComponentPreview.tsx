import { useEffect, useRef, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import { componentBreakpoints } from '@data/breakpoints'
import { componentPreviewHtml, componentPreviewJsx, componentPreviewVue } from '@util/transformers'
import { iComponentItem } from '@type/component'

import PreviewBreakpoint from '@component/PreviewBreakpoint'
import PreviewCode from '@component/PreviewCode'
import PreviewCopy from '@component/PreviewCopy'
import PreviewCreator from '@component/PreviewCreator'
import PreviewDark from '@component/PreviewDark'
import PreviewIframe from '@component/PreviewIframe'
import PreviewInteractive from '@component/PreviewInteractive'
import PreviewRtl from '@component/PreviewRtl'
import PreviewTitle from '@component/PreviewTitle'
import PreviewType from '@component/PreviewType'
import PreviewView from '@component/PreviewView'

interface iFetchOptions {
  useDark: boolean
  useInteractive: boolean
}

interface iComponentData extends iComponentItem {
  id: string
  slug: string
  category: string
}

interface iProps {
  componentData: iComponentData
  componentContainer?: {
    previewInner: string
    previewHeight: string
  }
}

export default function ComponentPreview({ componentData, componentContainer }: iProps) {
  const refIframe = useRef(null)

  const [componentCode, setComponentCode] = useState('')
  const [componentHtml, setComponentHtml] = useState('')
  const [componentJsx, setComponentJsx] = useState('')
  const [componentVue, setComponentVue] = useState('')
  const [previewCode, setPreviewCode] = useState('')
  const [showPreview, setShowPreview] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const [isRtl, setIsRtl] = useState(false)
  const [previewWidth, setPreviewWidth] = useState('100%')
  const [codeType, setCodeType] = useState('html')

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  const {
    id: componentId,
    title: componentTitle,
    slug: componentSlug,
    category: componentCategory,
    container: componentSpace,
    creator: componentCreator,
    dark: componentHasDark,
    interactive: componentHasInteractive,
  }: iComponentData = componentData

  const trueComponentContainer: string = componentSpace || componentContainer?.previewInner
  const componentWrapper: string = componentContainer?.previewHeight || 'h-[400px] lg:h-[600px]'

  const componentHash: string = `component-${componentId}`

  const isHtml: boolean = codeType === 'html'
  const isJsx: boolean = codeType === 'jsx'
  const isVue: boolean = codeType === 'vue'

  useEffect(() => {
    if (inView) {
      fetchHtml({
        useDark: isDarkMode,
        useInteractive: isInteractive,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, isDarkMode, isInteractive])

  useEffect(() => {
    if (inView) {
      const transformedHtml: string = componentPreviewHtml(
        componentCode,
        trueComponentContainer,
        isDarkMode,
        isRtl
      )

      setComponentHtml(transformedHtml)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRtl])

  useEffect(() => {
    setPreviewCode(
      isHtml ? componentCode : isJsx ? componentJsx : isVue ? componentVue : componentCode
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeType])

  async function fetchHtml(useOptions: iFetchOptions) {
    const { useDark = false, useInteractive = false } = useOptions

    const useDarkMode: boolean = componentHasDark && useDark
    const useInteractiveMode: boolean = componentHasInteractive && useInteractive

    const componentPath: string = [
      componentId,
      useDarkMode && 'dark',
      useInteractiveMode && 'interactive',
    ]
      .filter(Boolean)
      .join('-')

    const componentUrl: string = `/components/${componentCategory}-${componentSlug}/${componentPath}.html`

    const fetchResponse: Awaited<Response> = await fetch(componentUrl)
    const textResponse: Awaited<string> = await fetchResponse.text()
    const transformedHtml: string = componentPreviewHtml(
      textResponse,
      trueComponentContainer,
      useDark,
      isRtl
    )
    const transformedJsx: string = componentPreviewJsx(textResponse)
    const transformedVue: string = componentPreviewVue(textResponse)

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

              {componentHasDark && (
                <PreviewDark isDarkMode={isDarkMode} handleSetIsDarkMode={setIsDarkMode} />
              )}

              {componentHasInteractive && (
                <PreviewInteractive
                  isInteractive={isInteractive}
                  handleSetIsInteractive={setIsInteractive}
                />
              )}

              <PreviewRtl isRtl={isRtl} handleSetIsRtl={setIsRtl} />

              <div className="hidden sm:flex">
                <PreviewType
                  componentId={componentId}
                  codeType={codeType}
                  handleSetCodeType={setCodeType}
                />

                <PreviewCopy componentCode={previewCode} />
              </div>
            </div>
          )}

          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-2">
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

            <p className="text-sm font-medium text-gray-700">@{previewWidth}</p>
          </div>
        </div>

        <div className="relative">
          <div>
            <PreviewIframe
              showPreview={showPreview}
              componentHtml={componentHtml}
              componentTitle={componentTitle}
              previewWidth={previewWidth}
              previewHeight={componentWrapper}
              refIframe={refIframe}
              previewDark={componentHasDark && isDarkMode}
            />

            <PreviewCode
              showPreview={showPreview}
              codeType={codeType}
              componentCode={previewCode}
            />
          </div>
        </div>

        {componentCreator && <PreviewCreator creatorGithub={componentCreator} />}
      </div>
    </div>
  )
}
