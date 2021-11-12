import type { FunctionComponent } from 'react'
import { useState, useEffect } from 'react'

import { Component } from '../interface/component'

type Props = {
  component: Component
  slug: string
}

const Example: FunctionComponent<Props> = ({ component, slug }) => {
  let [html, setHtml] = useState<String>()
  let url = 'http://localhost:3000'

  let { id, title } = component

  useEffect(() => {
    fetch(`${url}/components/${slug}/${id}.html`)
      .then((res) => {
        if (res.ok) {
          res.text().then((html) => {
            let code = `<link rel="stylesheet" href="${url}/css/build.css"><body>${html}</body>`

            setHtml(code)
          })
        }
      })
      .catch((err) => console.error(err))
  }, [url, id, slug])

  return (
    <div>
      <p>{title}</p>
      <p>{id}</p>
      <iframe srcDoc={html}></iframe>
    </div>
  )
}

export default Example
