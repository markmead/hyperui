import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import Prism from 'prismjs'

import { useInView } from 'react-intersection-observer'

import { transformComponentHtml } from '@/utils/componentHelpers'
import { componentBreakpoints } from '@/utils/componentBreakpoints'

import { Component } from '@/interface/component'

import Breakpoint from '@/components/PreviewBreakpoint'
import DarkToggle from '@/components/PreviewDark'
import CopyCode from '@/components/PreviewCopy'
import ViewSwitcher from '@/components/PreviewView'
import VariantsSwitcher from '@/components/PreviewVariants'
import Creator from '@/components/ComponentCreator'
import Loading from '@/components/PreviewLoading'
import Iframe from '@/components/PreviewIframe'
import Code from '@/components/PreviewCode'
import Title from '@/components/PreviewTitle'

type ComponentData = Component & {
  id: string
}

type Props = {
  componentData: ComponentData
  componentSpacing: string
}

function Preview({ componentData, componentSpacing }: Props) {
  const nextRouter = useRouter()
  const refIframe = useRef(null)

  const [componentCode, setComponentCode] = useState<string>()
  const [componentHtml, setComponentHtml] = useState<string>()
  const [showPreview, setShowPreview] = useState<boolean>(true)
  const [previewWidth, setPreviewWidth] = useState<string>('100%')
  const [selectedVariant, setSelectedVariant] = useState<string>('base')
  const [hasDarkMode, setHasDarkMode] = useState<boolean>(false)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  const {
    id: componentId,
    title: componentTitle,
    spacing: componentSpace,
    creator: componentCreator,
    variants: componentVariants,
  } = componentData

  const { query: routerQuery } = nextRouter
  const { category: componentCategory, slug: componentSlug } = routerQuery

  let trueComponentSpacing: string = componentSpace
    ? componentSpace
    : componentSpacing

  const componentHash = `component-${componentId}`

  useEffect(() => {
    setIsLoading(true)

    if (inView) {
      fetchHtml()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  useEffect(() => {
    setIsDarkMode(false)
    setIsLoading(true)

    handleComponentSpacing()

    fetchHtml()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant])

  useEffect(() => {
    if (refIframe && refIframe.current) {
      const iframeEl = refIframe.current as HTMLIFrameElement

      iframeEl.contentWindow?.document.documentElement.classList.toggle(
        'dark',
        isDarkMode
      )
    }
  }, [isDarkMode])

  useEffect(() => Prism.highlightAll())

  async function fetchHtml() {
    const componentUrl =
      selectedVariant === 'base'
        ? `/components/${componentCategory}-${componentSlug}/${componentId}.html`
        : `/components/${componentCategory}-${componentSlug}/${componentId}-${selectedVariant}.html`

    const fetchResponse = await fetch(componentUrl)
    const textResponse = await fetchResponse.text()

    setComponentCode(textResponse)
    setComponentHtml(transformComponentHtml(textResponse, trueComponentSpacing))

    simulateFakeLoading()

    return
  }

  function simulateFakeLoading() {
    const randomDuration = Math.floor(Math.random() * (250 - 150) + 150)

    setTimeout(() => {
      setIsLoading(false)
      setIsDarkMode(hasDarkMode)
    }, randomDuration)
  }

  function handleComponentSpacing() {
    if (!componentVariants) {
      return
    }

    if (selectedVariant === 'base') {
      trueComponentSpacing = componentSpace ? componentSpace : componentSpacing
    }

    const variantIndex = Number(selectedVariant) - 1
    const variantSpacing = componentVariants[variantIndex]?.spacing

    if (variantSpacing) {
      trueComponentSpacing = variantSpacing
    }
  }

  return (
    <div className="-mt-20 pt-20" ref={ref} id={componentHash}>
      <div className="space-y-4">
        <Title componentTitle={componentTitle} componentHash={componentHash} />

        <div className="lg:flex lg:items-end lg:justify-between">
          {componentCode && componentVariants && (
            <div className="flex items-end gap-4">
              <ViewSwitcher
                handleSetShowPreview={setShowPreview}
                showPreview={showPreview}
              />

              <CopyCode componentCode={componentCode} />

              {componentVariants.length > 0 && (
                <>
                  <DarkToggle
                    hasDarkMode={hasDarkMode}
                    isDarkMode={isDarkMode}
                    handleSetIsDarkMode={setIsDarkMode}
                  />

                  <VariantsSwitcher
                    componentVariants={componentVariants}
                    handleSetVariant={setSelectedVariant}
                    handleSetHasDarkMode={setHasDarkMode}
                    componentId={componentId}
                  />
                </>
              )}
            </div>
          )}

          <div className="hidden lg:flex lg:items-end lg:gap-4">
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
          {isLoading && <Loading previewWidth={previewWidth} />}

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
