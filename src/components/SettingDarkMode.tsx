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
            When possible, the components will render in dark mode first.
          </p>
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
