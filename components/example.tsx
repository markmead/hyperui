import { FunctionComponent, useEffect, useState } from 'react'

type Props = {
  id: number
}

const Test: FunctionComponent<Props> = ({ id }) => {
  let [code, setCode] = useState<string>()
  let [html, setHtml] = useState<string>()
  let [width, setWidth] = useState<number>(1348)

  useEffect(() => {
    fetch(`/components/banners/${id}.html`)
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
    <section>
      <div className="px-4 py-8 mx-auto max-w-[1380px] sm:py-16">
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
            value={width}
            onChange={(e) => setWidth(Number(e.currentTarget.value))}
          />
        </div>

        <iframe
          className={`bg-white rounded-lg w-full h-[400px] lg:transition-all ring-2 ring-black lg:h-[600px]`}
          loading="lazy"
          srcDoc={html}
          style={{ maxWidth: width }}
        ></iframe>
      </div>
    </section>
  )
}

export default Test
