import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import Prism from 'prismjs'

import { useInView } from 'react-intersection-observer'

import { Component } from '@/interface/component'

import { transformComponentHtml } from '@/utils/componentHelpers'
import { componentBreakpoints } from '@/utils/componentBreakpoints'

import { useAppSelector } from '@/hooks/useStore'
import { settingsState } from '@/store/slices/settings'

import Breakpoint from '@/components/PreviewBreakpoint'
import Code from '@/components/PreviewCode'
import CopyCode from '@/components/PreviewCopy'
import Creator from '@/components/ComponentCreator'
import DarkToggle from '@/components/PreviewDark'
import Iframe from '@/components/PreviewIframe'
import Title from '@/components/PreviewTitle'
import ViewSwitcher from '@/components/PreviewView'
import InteractiveToggle from '@/components/PreviewInteractive'

type ComponentData = Component & {
  id: string
}

type Props = {
  componentData: ComponentData
  componentContainer: string
}

function Preview({ componentData, componentContainer }: Props) {
  const refIframe = useRef(null)

  const { query } = useRouter()
  const { category, slug } = query

  const { dark, interactive, breakpoint } = useAppSelector(settingsState)

  const [componentCode, setComponentCode] = useState<string>()
  const [componentHtml, setComponentHtml] = useState<string>()
  const [showPreview, setShowPreview] = useState<boolean>(true)
  const [previewWidth, setPreviewWidth] = useState<string>('100%')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [isInteractive, setIsInteractive] = useState<boolean>(false)

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  const {
    id: componentId,
    title: componentTitle,
    container: componentSpace,
    creator: componentCreator,
    dark: componentHasDark,
    interactive: componentHasInteractive,
  } = componentData

  let trueComponentContainer: string = componentSpace
    ? componentSpace
    : componentContainer

  const componentHash = `component-${componentId}`

  useEffect(() => Prism.highlightAll(), [componentHtml])
  useEffect(() => setPreviewWidth(breakpoint), [breakpoint])

  useEffect(() => {
    const usingDarkMode = componentHasDark ? dark || isDarkMode : false
    const usingInteractive = componentHasInteractive
      ? interactive || isInteractive
      : false

    if (inView) {
      loadComponent()
    }

    async function loadComponent() {
      const { isLoaded } = await fetchHtml()

      if (isLoaded) {
        setIsDarkMode(usingDarkMode)
        setIsInteractive(usingInteractive)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  useEffect(() => {
    fetchHtml({
      useDark: isDarkMode,
      useInteractive: isInteractive,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode, isInteractive])

  async function fetchHtml(
    useOptions: {
      useDark?: boolean
      useInteractive?: boolean
    } = {}
  ) {
    const componentPath = [
      componentId,
      useOptions.useDark && 'dark',
      useOptions.useInteractive && 'interactive',
    ]
      .filter(Boolean)
      .join('-')

    const componentUrl = `/components/${category}-${slug}/${componentPath}.html`

    const fetchResponse = await fetch(componentUrl)
    const textResponse = await fetchResponse.text()
    const transformedHtml = transformComponentHtml(
      textResponse,
      trueComponentContainer,
      isDarkMode
    )

    setComponentCode(textResponse)
    setComponentHtml(transformedHtml)

    return {
      isLoaded: true,
    }
  }

  return (
    <div className="-mt-20 pt-20" ref={ref} id={componentHash}>
      <div className="space-y-4">
        <Title componentTitle={componentTitle} componentHash={componentHash} />

        <div className="lg:flex lg:items-end">
          {componentCode && (
            <div className="flex items-end gap-4">
              <ViewSwitcher
                handleSetShowPreview={setShowPreview}
                showPreview={showPreview}
              />

              <CopyCode componentCode={componentCode} />

              {componentHasDark && (
                <DarkToggle
                  isDarkMode={isDarkMode}
                  handleSetIsDarkMode={setIsDarkMode}
                />
              )}

              {componentHasInteractive && (
                <InteractiveToggle
                  isInteractive={isInteractive}
                  handleSetIsInteractive={setIsInteractive}
                />
              )}
            </div>
          )}

          <div className="hidden lg:flex lg:flex-1 lg:items-end lg:justify-end lg:gap-4">
            {componentBreakpoints.map(
              ({
                name: breakpointName,
                emoji: breakpointEmoji,
                width: breakpointWidth,
              }) => (
                <Breakpoint
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

        <div className="relative">
          <div>
            <Iframe
              showPreview={showPreview}
              componentHtml={componentHtml}
              componentTitle={componentTitle}
              previewWidth={previewWidth}
              refIframe={refIframe}
            />

            <Code showPreview={showPreview} componentCode={componentCode} />
          </div>
        </div>

        {componentCreator && <Creator creatorGithub={componentCreator} />}
      </div>
    </div>
  )
}

export default Preview
