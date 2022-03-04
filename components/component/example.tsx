import type { FunctionComponent } from 'react'
import { useState, useEffect } from 'react'

const prism = require('prismjs')

import { Collection } from '../../interface/collection'
import { Component } from '../../interface/component'

import Breakpoint from './buttons/breakpoint'
import Copy from './buttons/copy'
import Code from './buttons/view'
import Heart from './buttons/favourite'

type Props = {
  component: Component
  parentSpacing?: string
  collection: Collection
  target?: string
}

const Example: FunctionComponent<Props> = ({
  component,
  parentSpacing,
  collection,
  target,
}) => {
  let [html, setHtml] = useState<string>()
  let [code, setCode] = useState<string>()
  let [view, setView] = useState<boolean>(true)
  let [width, setWidth] = useState<string>('100%')

  let { id, spacing } = component

  let spacingClass = spacing ? spacing : parentSpacing
  let isExample = view

  useEffect(() => {
    let { origin, href } = window.location
    let endpoint = target ? target : href

    fetch(`${endpoint}/${id}.html`)
      .then((res) => {
        if (res.ok) {
          res.text().then((html) => {
            let code = `
              <script>
                document.addEventListener('DOMContentLoaded', () => {
                  let links = [...document.querySelectorAll('a')]

                  links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()))
                })
              </script>

              <link rel="stylesheet" href="${origin}/build.css">

              <body>
                <div class="${spacingClass}">
                  ${html}
                </div>
              </body>
            `

            setHtml(code)
            setCode(html)

            prism.highlightAll()
          })
        }
      })
      .catch((err) => console.error(err))
  })

  return (
    <li className="space-y-4">
      <div className="flex justify-between item-center">
        <div className="hidden lg:items-center lg:space-x-4 lg:flex">
          <Breakpoint
            handleWidth={setWidth}
            size="340px"
            text="Mobile"
            emoji="📱"
          />

          <Breakpoint
            handleWidth={setWidth}
            size="640px"
            text="Small"
            emoji="🐛"
          />

          <Breakpoint
            handleWidth={setWidth}
            size="768px"
            text="Medium"
            emoji="🏢"
          />

          <Breakpoint
            handleWidth={setWidth}
            size="1024px"
            text="Large"
            emoji="🏔️"
          />

          <Breakpoint
            handleWidth={setWidth}
            size="100%"
            text="Full"
            emoji="🌝"
          />
        </div>
      </div>

      <div>
        {isExample ? (
          <iframe
            srcDoc={html}
            className={`bg-white rounded-lg h-[400px] lg:transition-all ring-2 ring-black lg:h-[600px]`}
            width={width}
            loading="lazy"
            title={`${collection.title} Component ${id}`}
          ></iframe>
        ) : (
          <pre className="p-4 overflow-auto h-[400px] lg:h-[600px]">
            <code className="language-html">{code}</code>
          </pre>
        )}
      </div>

      {code && (
        <div className="flex items-center space-x-4">
          <Copy code={code} />
          <Code view={view} handleView={setView} />
          <Heart collection={collection} id={id} />
        </div>
      )}
    </li>
  )
}

export default Example
