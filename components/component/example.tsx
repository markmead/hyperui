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

  const handleWidth = (width: string) => {
    setWidth(width)

    width === '100%'
      ? setRange(1348)
      : setRange(Number(width.replace('px', '')))
  }

  return (
    <div ref={ref}>
      <h2>{title}</h2>

      <div>
        <Range range={range} handleRange={setRange} />

        {breakpoints.map(({ name, width: breakpoint }) => (
          <Breakpoint
            key={name}
            text={name}
            size={breakpoint}
            handleWidth={(width: string) => handleWidth(width)}
          />
        ))}

        <strong>@ {width}</strong>
      </div>

      <div>
        {!code && <div>Loading</div>}

        <div className={view ? 'block' : 'hidden'}>
          <iframe
            className="w-full h-[400px] lg:h-[600px]"
            loading="lazy"
            srcDoc={html}
            style={{ maxWidth: width }}
            title={`${title} Component`}
          ></iframe>
        </div>

        <div className={view ? 'hidden' : 'block'}>
          <pre className="w-full h-[400px] lg:h-[600px] overflow-auto">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      {code && (
        <div>
          <Code handleView={setView} view={view} />
          <Copy code={code} />
        </div>
      )}
    </div>
  )
}

export default Test
