import { useEffect, useState } from 'react'

import SettingToggle from '@/components/SettingToggle'

function SettingComponentLinks() {
  const [showLinks, setShowLinks] = useState<boolean>(false)

  useEffect(() => {
    setShowLinks(
      JSON.parse(localStorage.getItem('_SETTING_COMPONENT_LINKS') || 'false')
    )
  }, [])

  useEffect(() => {
    localStorage.setItem('_SETTING_COMPONENT_LINKS', `${showLinks}`)

    dispatchEvent(
      new CustomEvent('setting:component-links', {
        bubbles: true,
        detail: { showLinks },
      })
    )
  }, [showLinks])

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Show Component Links</p>

          <p className="mt-1 text-xs text-gray-700">
            Enabling this will show all component links on the component pages.
          </p>
        </div>

        <SettingToggle
          toggleValue={showLinks}
          toggleHandler={setShowLinks}
          toggleId="ShowLinks"
          toggleLabel="Show Component Links"
        />
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
