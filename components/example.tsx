import type { FunctionComponent } from 'react'
import { useState, useEffect } from 'react'

import { Component } from '../interface/component'

import Breakpoint from './breakpoint'
import Code from './code'

type Props = {
  component: Component
  parentSpacing?: string
}

const Example: FunctionComponent<Props> = ({ component, parentSpacing }) => {
  let [html, setHtml] = useState<string>()
  let [code, setCode] = useState<string>()
  let [width, setWidth] = useState<string>('100%')

  let { id, title, spacing } = component

  let wrapper = spacing ? spacing : parentSpacing

  useEffect(() => {
    let { origin, href } = window.location

    fetch(`${href}/${id}.html`)
      .then((res) => {
        if (res.ok) {
          res.text().then((html) => {
            let code = `
              <link rel="stylesheet" href="${origin}/css/build.css">
              <body>
                <div class="${wrapper}">
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
    <li>
      <div className="flex justify-between item-center">
        <h2 className="text-xl font-medium">{title}</h2>

        <div className="hidden lg:items-center lg:space-x-4 lg:flex">
          <Breakpoint handleWidth={setWidth} size="320px" text="Mobile" />
          <Breakpoint handleWidth={setWidth} size="640px" text="Tablet" />
          <Breakpoint handleWidth={setWidth} size="100%" text="Desktop" />
        </div>
      </div>

      <iframe
        srcDoc={html}
        className="h-[300px] sm:h-[500px] border-2 bg-white rounded-lg border-gray-100 mt-4 lg:transition-all"
        style={{ width }}
      ></iframe>

      <Code code={code} />
    </li>
  )
}

export default Example
