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
      <div className="max-w-sm p-4 ml-auto space-y-4 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-lg">
        <div className="flex items-start gap-4">
          <div>
            <p className="text-sm font-medium">Show Component Links</p>

            <p className="mt-1 text-xs text-gray-700">
              Enabling this will show all the component links on this page for
              quick navigation between pages.
            </p>
          </div>

          <label
            htmlFor="ShowLinks"
            className="relative w-12 cursor-pointer h-7 shrink-0"
          >
            <span className="sr-only">Show Component Links</span>

            <input
              type="checkbox"
              id="ShowLinks"
              className="sr-only peer"
              checked={showLinks}
              onChange={() => setShowLinks(!showLinks)}
            />

            <span className="absolute inset-0 transition bg-gray-300 rounded-full peer-checked:bg-green-500"></span>

            <span className="absolute inset-0 w-5 h-5 m-1 transition bg-white rounded-full peer-checked:translate-x-5"></span>
          </label>
        </div>

        <p className="text-xs font-medium text-gray-700">
          Have thoughts on this feature? Share them on{' '}
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
