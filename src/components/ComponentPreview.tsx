import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { componentBreakpoints } from '@data/breakpoints'
import { componentPreviewHtml, componentPreviewJsx, componentPreviewVue } from '@util/transformers'
import { ComponentItem } from '@type/component'
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

interface FetchOptions {
  useDark: boolean
  useInteractive: boolean
}

interface ComponentData extends ComponentItem {
  id: string
  slug: string
  category: string
}

interface Props {
  componentData: ComponentData
  componentContainer?: {
    previewInner: string
    previewHeight: string
  }
}

export default function ComponentPreview({ componentData, componentContainer }: Props) {
  const refIframe = useRef<HTMLIFrameElement | null>(null)

  const [componentCode, setComponentCode] = useState<string>('')
  const [componentHtml, setComponentHtml] = useState<string>('')
  const [componentJsx, setComponentJsx] = useState<string>('')
  const [componentVue, setComponentVue] = useState<string>('')
  const [previewCode, setPreviewCode] = useState<string>('')
  const [showPreview, setShowPreview] = useState<boolean>(true)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [isInteractive, setIsInteractive] = useState<boolean>(false)
  const [isRtl, setIsRtl] = useState<boolean>(false)
  const [previewWidth, setPreviewWidth] = useState<string>('100%')
  const [codeType, setCodeType] = useState<string>('html')

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
  }: ComponentData = componentData

  const trueComponentContainer: string =
    componentSpace || componentContainer?.previewInner || 'relative'
  const componentWrapper: string = componentContainer?.previewHeight || 'h-[400px] lg:h-[600px]'

  const componentHash = `component-${componentId}`

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
    if (isHtml) {
      setPreviewCode(componentCode)
    }

    if (isJsx) {
      setPreviewCode(componentJsx)
    }

    if (isVue) {
      setPreviewCode(componentVue)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeType])

  async function fetchHtml({ useDark = false, useInteractive = false }: FetchOptions) {
    const useDarkMode = Boolean(componentHasDark && useDark)
    const useInteractiveMode = Boolean(componentHasInteractive && useInteractive)

    const componentPath: string = [
      componentId,
      useDarkMode && 'dark',
      useInteractiveMode && 'interactive',
    ]
      .filter(Boolean)
      .join('-')

    const componentUrl = `/components/${componentCategory}-${componentSlug}/${componentPath}.html`

    const fetchResponse: Awaited<Response> = await fetch(componentUrl, {
      cache: 'force-cache',
    })
    const textResponse: Awaited<string> = await fetchResponse.text()
    const transformedHtml: string = componentPreviewHtml(
      textResponse,
      trueComponentContainer,
      useDark,
      isRtl
    )
    const transformedJsx: string = componentPreviewJsx(textResponse)
    const transformedVue: string = componentPreviewVue(textResponse)

    setComponentCode(textResponse)
    setComponentHtml(transformedHtml)
    setComponentJsx(transformedJsx)
    setComponentVue(transformedVue)

    if (isHtml) {
      setPreviewCode(textResponse)
    }

    if (isJsx) {
      setPreviewCode(transformedJsx)
    }

    if (isVue) {
      setPreviewCode(transformedVue)
    }
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
          <>
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
          </>
        </div>

        {componentCreator && <PreviewCreator creatorGithub={componentCreator} />}
      </div>
    </div>
  )
}
