import { Component, FunctionComponent, useEffect, useState } from 'react'

type Props = {
  id: number
  name: string
  title: string | undefined
}

const Test: FunctionComponent<Props> = ({ id, name, title }) => {
  let [code, setCode] = useState<string>()
  let [html, setHtml] = useState<string>()
  let [width, setWidth] = useState<number>(1348)

  useEffect(() => {
    fetch(`/components/${name}/${id}.html`)
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
                ${html}
              </body>
            `

            setCode(html)
            setHtml(code)
          })
        }
      })
      .catch((err) => console.error(err))
  })

  return (
    <div>
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black sm:text-2xl">{title}</h2>

        <div>
          <input
            aria-label="Breakpoint"
            max="1348"
            min="340"
            step="8"
            type="range"
            value={width}
            onChange={(e) => setWidth(Number(e.currentTarget.value))}
          />
        </div>
      </header>

      <iframe
        className="bg-white rounded-3xl shadow-[8px_8px_0_0_#000] w-full h-[400px] lg:transition-all ring-4 ring-black lg:h-[600px] mt-4"
        loading="lazy"
        srcDoc={html}
        style={{ maxWidth: width }}
      ></iframe>
    </div>
  )
}

export default Test
