import { useEffect, useState } from 'react'

function ComponentLinksToggle() {
  const [showLinks, setShowLinks] = useState(false)

  useEffect(() => {
    setShowLinks(JSON.parse(localStorage.getItem('_SHOW_LINKS') || 'true'))
  }, [])

  useEffect(() => {
    localStorage.setItem('_SHOW_LINKS', `${showLinks}`)

    dispatchEvent(
      new CustomEvent('toggle:links', {
        bubbles: true,
        detail: { show: showLinks },
      })
    )
  }, [showLinks])

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-2">
      <div className="max-w-sm p-4 ml-auto bg-white border border-gray-100 rounded-lg shadow-sm">
        <form>
          <div className="flex items-center gap-4">
            <p className="text-xs font-medium">
              Show component links on this page?
            </p>

            <label
              htmlFor="ShowLinks"
              className="relative h-8 cursor-pointer w-14"
            >
              <input
                type="checkbox"
                id="ShowLinks"
                className="sr-only peer"
                checked={showLinks}
                onChange={() => setShowLinks(!showLinks)}
              />

              <span className="absolute inset-0 transition bg-gray-300 rounded-full peer-checked:bg-green-500"></span>

              <span className="absolute inset-0 w-6 h-6 m-1 transition bg-white rounded-full peer-checked:translate-x-6"></span>
            </label>
          </div>
        </form>

        <p className="mt-4 text-xs font-medium text-gray-700">
          This is an experimental feature, have your say on{' '}
          <a
            href="https://github.com/markmead/hyperui/pull/229"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-black underline"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default ComponentLinksToggle
