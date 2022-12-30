import { useEffect, useState } from 'react'

function SettingComponentLinks() {
  const [showLinks, setShowLinks] = useState<boolean>(false)

  useEffect(() => {
    setShowLinks(JSON.parse(localStorage.getItem('_SHOW_LINKS') || 'false'))
  }, [])

  useEffect(() => {
    localStorage.setItem('_SHOW_LINKS', `${showLinks}`)

    dispatchEvent(
      new CustomEvent('toggle:links', {
        bubbles: true,
        detail: { showLinks },
      })
    )
  }, [showLinks])

  return (
    <div>
      <div className="flex items-start gap-4">
        <div>
          <p className="text-sm font-medium">Show Component Links</p>

          <p className="mt-1 text-xs text-gray-700">
            Enabling this will show all component links on the component pages.
          </p>
        </div>

        <label
          htmlFor="ShowLinks"
          className="relative h-7 w-12 shrink-0 cursor-pointer"
        >
          <span className="sr-only">Show Component Links</span>

          <input
            type="checkbox"
            id="ShowLinks"
            className="peer sr-only"
            checked={showLinks}
            onChange={() => setShowLinks(!showLinks)}
          />

          <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>

          <span className="absolute inset-0 m-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5"></span>
        </label>
      </div>

      <p className="mt-2 text-xs font-medium text-gray-700">
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
  )
}

export default SettingComponentLinks
