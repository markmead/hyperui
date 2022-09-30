import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import Prism from 'prismjs'

import { useInView } from 'react-intersection-observer'

import { Component } from '@/interface/component'

import { transformComponentHtml } from '@/utils/componentHelpers'
import { componentBreakpoints } from '@/utils/componentBreakpoints'

import Breakpoint from '@/components/PreviewBreakpoint'
import Dark from '@/components/PreviewDark'
import Copy from '@/components/PreviewCopy'
import Code from '@/components/PreviewView'
import Variants from '@/components/PreviewVariants'
import ComponentCreator from '@/components/ComponentCreator'
import PreviewLoading from '@/components/PreviewLoading'

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

  const trueComponentSpacing: string = componentSpace
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

  return (
    <div className="-mt-20 pt-20" ref={ref} id={componentHash}>
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-black sm:text-xl">
          <a href={`#${componentHash}`} className="group relative inline-block">
            <span
              aria-hidden="true"
              className="hidden group-hover:opacity-25 lg:absolute lg:inset-y-0 lg:-left-6 lg:block lg:opacity-0 lg:transition"
            >
              #
            </span>

            {componentTitle}
          </a>
        </h2>

        <div className="flex items-center justify-between">
          <div>
            {componentCode && componentVariants && (
              <div className="flex items-center gap-4">
                {componentVariants.length > 0 && (
                  <>
                    <Variants
                      componentVariants={componentVariants}
                      handleSetVariant={setSelectedVariant}
                      handleSetHasDarkMode={setHasDarkMode}
                      componentId={componentId}
                    />

                    <Dark
                      hasDarkMode={hasDarkMode}
                      isDarkMode={isDarkMode}
                      handleSetIsDarkMode={setIsDarkMode}
                    />
                  </>
                )}

                <Code
                  handleSetShowPreview={setShowPreview}
                  showPreview={showPreview}
                />

                <Copy componentCode={componentCode} />
              </div>
            )}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-4">
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
          {isLoading && <PreviewLoading previewWidth={previewWidth} />}

          <div>
            {showPreview ? (
              <iframe
                className="h-[400px] w-full rounded-lg bg-white ring-2 ring-black lg:h-[600px] lg:transition-all"
                loading="lazy"
                srcDoc={componentHtml}
                style={{ maxWidth: previewWidth }}
                title={`${componentTitle} Component`}
                ref={refIframe}
              ></iframe>
            ) : (
              <pre className="h-[400px] overflow-auto rounded-lg p-4 ring-2 ring-black lg:h-[600px]">
                <code className="language-html">{componentCode}</code>
              </pre>
            )}
          </div>
        </div>

        {componentCreator && (
          <ComponentCreator creatorGithub={componentCreator} />
        )}
      </div>
    </div>
  )
}

export default Preview
