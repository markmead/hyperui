import { FunctionComponent, useEffect, useState } from 'react'

import { useInView } from 'react-intersection-observer'

const prism = require('prismjs')

import { source } from '../../utils/component'

import { allBreakpoints } from '../../lib/breakpoints'

import { Component } from '../../interface/component'

import Breakpoint from './buttons/breakpoint'
import Copy from './buttons/copy'
import Code from './buttons/view'
import Range from './range'
import IconLoading from '../icon/loading'

type Props = {
  name: string
  item: Component
  spacing: string
}

const Test: FunctionComponent<Props> = ({ name, item, spacing }) => {
  let [code, setCode] = useState<string>()
  let [html, setHtml] = useState<string>()
  let [view, setView] = useState<boolean>(true)
  let [width, setWidth] = useState<string>('100%')
  let [height, setHeight] = useState<string>('100%')
  let [range, setRange] = useState<number>(1348)

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  const breakpoints = allBreakpoints

  const { id, title, spacing: space } = item

  const componentSpacing: string = space ? space : spacing

  useEffect(() => {
    async function fetchHtml() {
      const response = await fetch(`/components/${name}/${id}.html`)
      const text = await response.text()

      setCode(text)
      setHtml(source(text, componentSpacing))

      return
    }

    if (inView) {
      fetchHtml()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  useEffect(() => {
    prism.highlightAll()
  })

  useEffect(() => {
    range === 1348 ? setWidth('100%') : setWidth(`${range}px`)
  }, [range])

  function calculateHeight() {
    const iframe = document.getElementById(`iframe-${id}`) as HTMLIFrameElement

    if (iframe) {
      let currentHeight: number | undefined =
        iframe.contentWindow?.document.body.scrollHeight

      currentHeight =
        currentHeight && currentHeight > 1000 ? 1000 : currentHeight

      currentHeight = currentHeight < 300 ? 300 : currentHeight

      setHeight(`${currentHeight}px`)
    }
  }

  return (
    <div className="space-y-4" ref={ref}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-black sm:text-xl">{title}</h2>

        <div className="hidden lg:items-center lg:space-x-4 lg:flex">
          <Range range={range} handleRange={setRange} />

          {breakpoints.map(({ name, emoji, width: breakpoint }) => (
            <Breakpoint
              key={name}
              text={name}
              emoji={emoji}
              size={breakpoint}
              handleWidth={setWidth}
              active={width === breakpoint}
            />
          ))}

          <strong className="inline-block w-20 py-2.5 text-xs font-medium text-center text-white bg-black rounded-lg">
            @ {width}
          </strong>
        </div>
      </div>

      <div className="relative">
        {!code && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-white rounded-lg"
            aria-hidden="true"
          >
            <IconLoading />
          </div>
        )}

        <div className={view ? 'block' : 'hidden'}>
          <iframe
            className="w-full bg-white rounded-lg lg:transition-all ring-2 ring-black"
            loading="lazy"
            srcDoc={html}
            style={{ maxWidth: width, height: height }}
            title={`${title} Component`}
            id={`iframe-${id}`}
            onLoad={() => calculateHeight()}
          ></iframe>
        </div>

        <div className={view ? 'hidden' : 'block'}>
          <pre
            className="p-4 overflow-auto rounded-lg ring-2 ring-black"
            style={{ height: height }}
          >
            <code className="language-html">{code}</code>
          </pre>
        </div>
      </div>

      {code && (
        <div className="flex items-center gap-4">
          <Code handleView={setView} view={view} />
          <Copy code={code} />
        </div>
      )}
    </div>
  )
}

export default Test
