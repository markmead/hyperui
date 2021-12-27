import type { FunctionComponent } from 'react'
import { useState, useEffect } from 'react'

import { Component } from '../interface/component'

import Breakpoint from './breakpoint'
import Copy from './copy'
import Code from './code'

type Props = {
  component: Component
  parentSpacing?: string
  collection: string
}

const Example: FunctionComponent<Props> = ({
  component,
  parentSpacing,
  collection,
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

    fetch(`${href}/${id}.html`)
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

              <link rel="stylesheet" href="${origin}/css/build.css">

              <body>
                <div class="${spacingClass}">
                  ${html}
                </div>
              </body>
            `

            setHtml(code)
            setCode(html)
          })
        }
      })
      .catch((err) => console.error(err))
  })

  return (
    <li className="py-8 space-y-4 lg:py-16">
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
            size="680px"
            text="Tablet"
            emoji="💻"
          />

          <Breakpoint
            handleWidth={setWidth}
            size="100%"
            text="Desktop"
            emoji="🖥"
          />
        </div>
      </div>

      <div>
        {isExample ? (
          <iframe
            srcDoc={html}
            className={`border-2 bg-white rounded-lg border-gray-100 h-[400px] lg:transition-all lg:h-[600px]`}
            width={width}
            loading="lazy"
            title={`${collection} component ${id}`}
          ></iframe>
        ) : (
          <pre
            className={`p-4 bg-gray-100 overflow-auto rounded-lg h-[400px] lg:h-[600px]`}
          >
            {code}
          </pre>
        )}
      </div>

      {code && (
        <div className="flex items-center space-x-4">
          <Copy code={code} />
          <Code view={view} handleView={setView} />
        </div>
      )}
    </li>
  )
}

export default Example
