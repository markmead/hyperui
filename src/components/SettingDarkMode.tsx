import { useState } from 'react'

import { useAppSelector, useAppDispatch } from '@/hooks/app'
import { toggleDark, settingsState } from '@/store/slices/settings'

import SettingTitle from '@/components/SettingTitle'
import SettingToggle from '@/components/SettingToggle'

function SettingDarkMode() {
  const dispatch = useAppDispatch()
  const { dark } = useAppSelector(settingsState)

  const [darkMode] = useState(dark)

  return (
    <div className="flex items-start gap-4">
      <div className="flex-1">
        <SettingTitle
          title="Dark Mode"
          description="Components will be rendered in dark mode by default if they have a dark mode variant."
          refresh={darkMode !== dark}
        />
      </div>

      <div className="shrink-0">
        <SettingToggle
          toggleValue={dark}
          toggleHandler={() => dispatch(toggleDark())}
          toggleId="DarkMode"
          toggleLabel="Default Dark Mode"
        />
      </div>
    </div>
  )
}

export default SettingDarkMode
