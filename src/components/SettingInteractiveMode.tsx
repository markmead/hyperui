import { useAppSelector, useAppDispatch } from '@/hooks/app'
import { toggleInteractive, settingsState } from '@/store/slices/settings'

import SettingToggle from '@/components/SettingToggle'

function SettingInteractiveMode() {
  const dispatch = useAppDispatch()
  const { interactive } = useAppSelector(settingsState)

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Default Interactive Mode</p>

          <p className="mt-1 text-xs text-gray-700">
            Components will be rendered with interactivity by default.
          </p>

          <span className="mt-1 inline-block whitespace-nowrap rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-blue-700">
            Note: Requires Refresh
          </span>
        </div>

        <SettingToggle
          toggleValue={interactive}
          toggleHandler={() => dispatch(toggleInteractive())}
          toggleId="InteractiveMode"
          toggleLabel="Default Interactive Mode"
        />
      </div>
    </div>
  )
}

export default SettingInteractiveMode
