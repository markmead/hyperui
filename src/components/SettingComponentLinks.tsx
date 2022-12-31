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

    dispatchEvent(new CustomEvent('setting:component-links'))
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
    </div>
  )
}

export default SettingComponentLinks
