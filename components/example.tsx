import type { FunctionComponent } from 'react'
import { useState, useEffect } from 'react'

import { Component } from '../interface/component'

type Props = {
  component: Component
}

const Example: FunctionComponent<Props> = ({ component }) => {
  let [html, setHtml] = useState<string>()

  let { id, title } = component

  useEffect(() => {
    let { origin, href } = window.location

    fetch(`${href}/${id}.html`)
      .then((res) => {
        if (res.ok) {
          res.text().then((html) => {
            let code = `<link rel="stylesheet" href="${origin}/css/build.css"><body>${html}</body>`

            setHtml(code)
          })
        }
      })
      .catch((err) => console.error(err))
  }, [id])

  return (
    <div>
      <p>{title}</p>
      <p>{id}</p>
      <iframe srcDoc={html}></iframe>
    </div>
  )
}

export default Example
