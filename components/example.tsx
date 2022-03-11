import { FunctionComponent, useEffect, useState } from 'react'

const prism = require('prismjs')

import { markup } from '../utils/component'

import Breakpoint from './component/buttons/breakpoint'
import Copy from './component/buttons/copy'
import Code from './component/buttons/view'
import Favourite from './component/buttons/favourite'
import { Collection } from '../interface/collection'

type Props = {
  collection: Collection
  id: number
  name: string
  title: string | undefined
  spacing: Array<object>
}

const Test: FunctionComponent<Props> = ({
  collection,
  id,
  name,
  title,
  spacing,
}) => {
  let [code, setCode] = useState<string>()
  let [html, setHtml] = useState<string>()
  let [view, setView] = useState<boolean>(true)
  let [width, setWidth] = useState<string>('100%')
  let [rangeWidth, setRangeWidth] = useState<number>(1348)

  useEffect(() => {
    fetch(`/components/${name}/${id}.html`).then((res) => {
      if (!res.ok) return

      res.text().then((html) => {
        setCode(html)

        let spacingValue = spacing[id] ? spacing[id] : spacing['default']
        let componentSpacing = `${spacingValue}`

        html && setHtml(markup(html, componentSpacing))
      })
    })

    prism.highlightAll()
  })

  useEffect(() => {
    rangeWidth === 1348 ? setWidth('100%') : setWidth(`${rangeWidth}px`)
  }, [rangeWidth])

  return (
    <div className="space-y-4">
      <div className="flex justify-between item-center">
        <h2 className="text-lg font-bold sm:text-xl">{title}</h2>

        <div className="hidden lg:items-center lg:space-x-4 lg:flex">
          <div>
            <label className="sr-only" htmlFor="rangeWidth">
              Width
            </label>

            <input
              type="range"
              min="340"
              max="1348"
              step="8"
              id="rangeWidth"
              value={rangeWidth}
              onChange={(e) => setRangeWidth(Number(e.currentTarget.value))}
            />
          </div>

          <Breakpoint
            emoji="📱"
            handleWidth={setWidth}
            size="340px"
            text="Mobile"
            active={width === '340px'}
          />

          <Breakpoint
            emoji="🐛"
            handleWidth={setWidth}
            size="640px"
            text="Small"
            active={width === '640px'}
          />

          <Breakpoint
            emoji="🏢"
            handleWidth={setWidth}
            size="768px"
            text="Medium"
            active={width === '768px'}
          />

          <Breakpoint
            emoji="🏔️"
            handleWidth={setWidth}
            size="1024px"
            text="Large"
            active={width === '1024px'}
          />

          <Breakpoint
            emoji="🌝"
            handleWidth={setWidth}
            size="100%"
            text="Full"
            active={width === '100%'}
          />

          <strong className="inline-block w-20 text-xs font-medium leading-9 text-center text-white bg-black rounded-lg h-9">
            @ {width}
          </strong>
        </div>
      </div>

      <div>
        {view ? (
          <iframe
            className="bg-white w-full h-[400px] lg:transition-all lg:h-[600px] ring-2 ring-black rounded-lg"
            loading="lazy"
            srcDoc={html}
            style={{ maxWidth: width }}
          ></iframe>
        ) : (
          <pre className="p-4 overflow-auto h-[400px] lg:h-[600px] ring-2 ring-black rounded-lg">
            <code className="language-html">{code}</code>
          </pre>
        )}
      </div>

      {code && (
        <div className="flex items-center space-x-4">
          <Code handleView={setView} view={view} />
          <Copy code={code} />
          <Favourite collection={collection} id={id} />
        </div>
      )}
    </div>
  )
}

export default Test
