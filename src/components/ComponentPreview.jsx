import { useEffect, useRef, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import { componentBreakpoints } from '@data/breakpoints'
import usePreferencesStore from '@store/preferences.store'
import { componentPreviewHtml, componentPreviewJsx, componentPreviewVue } from '@util/transformers'

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

export default function ComponentPreview({ componentData, componentContainer }) {
  const refIframe = useRef(null)

  const {
    isRtl,
    setIsRtl,
    isDarkMode,
    setIsDarkMode,
    codeType,
    setCodeType,
    previewWidth,
    setPreviewWidth
  } = usePreferencesStore()
	
  const [componentCode, setComponentCode] = useState('')
  const [componentHtml, setComponentHtml] = useState('')
  const [componentJsx, setComponentJsx] = useState('')
  const [componentVue, setComponentVue] = useState('')
  const [isInteractive, setIsInteractive] = useState(false)
  const [previewCode, setPreviewCode] = useState('')
  const [showPreview, setShowPreview] = useState(true)

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
  } = componentData

  const trueComponentContainer = componentSpace || componentContainer?.previewInner
  const componentWrapper = componentContainer?.previewHeight || 'h-[400px] lg:h-[600px]'

  const componentHash = `component-${componentId}`

  useEffect(() => {
    if (inView) {
      fetchHtml({
        useDark: isDarkMode,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  useEffect(() => {
    if (inView) {
      fetchHtml({
        useDark: isDarkMode,
        useInteractive: isInteractive,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode, isInteractive])

  useEffect(() => {
    if (inView) {
      const transformedHtml = componentPreviewHtml(
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
    codeType === 'html' && setPreviewCode(componentCode)
    codeType === 'jsx' && setPreviewCode(componentJsx)
    codeType === 'vue' && setPreviewCode(componentVue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeType])

  async function fetchHtml(useOptions = {}) {
    const { useDark, useInteractive } = useOptions

    const useDarkMode = componentHasDark && useDark
    const useInteractiveMode = componentHasInteractive && useInteractive

    const componentPath = [componentId, useDarkMode && 'dark', useInteractiveMode && 'interactive']
      .filter(Boolean)
      .join('-')

    const componentUrl = `/components/${componentCategory}-${componentSlug}/${componentPath}.html`

    const fetchResponse = await fetch(componentUrl)
    const textResponse = await fetchResponse.text()
    const transformedHtml = componentPreviewHtml(
      textResponse,
      trueComponentContainer,
      useDark,
      isRtl
    )
    const transformedJsx = componentPreviewJsx(textResponse)
    const transformedVue = componentPreviewVue(textResponse)

    setPreviewCode(textResponse)
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
                <PreviewType componentId={componentId} codeType={codeType} handleSetCodeType={setCodeType} />

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

            <p className="text-sm font-medium text-gray-700">@ {previewWidth}</p>
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
              componentId={componentId}
              showPreview={showPreview}
              codeType={codeType}
              showToggle={!isInteractive}
              componentCode={previewCode}
            />
          </div>
        </div>

        {componentCreator && <PreviewCreator creatorGithub={componentCreator} />}
      </div>
    </div>
  )
}
