import { useAppSelector, useAppDispatch } from '@/hooks/app'
import { toggleDark, settingsState } from '@/store/slices/settings'

import SettingToggle from '@/components/SettingToggle'

function SettingDarkMode() {
  const dispatch = useAppDispatch()
  const { dark } = useAppSelector(settingsState)

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Default Dark Mode</p>

          <p className="mt-1 text-xs text-gray-700">
            Components will be rendered in dark mode by default.
          </p>

          <span className="mt-1 inline-block whitespace-nowrap rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-blue-700">
            Note: Requires Refresh
          </span>
        </div>

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
