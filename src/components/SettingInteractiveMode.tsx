import { useState } from 'react'

import { useAppSelector, useAppDispatch } from '@/hooks/app'
import { toggleInteractive, settingsState } from '@/store/slices/settings'

import SettingTitle from '@/components/SettingTitle'
import SettingToggle from '@/components/SettingToggle'

function SettingInteractiveMode() {
  const dispatch = useAppDispatch()
  const { interactive } = useAppSelector(settingsState)

  const [interactiveMode] = useState(interactive)

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <SettingTitle
            title="Interactive Mode"
            description="Components will be rendered in interactive mode by default if they have an interactive mode variant."
            refresh={interactiveMode !== interactive}
          />
        </div>

        <div className="shrink-0">
          <SettingToggle
            toggleValue={interactive}
            toggleHandler={() => dispatch(toggleInteractive())}
            toggleId="InteractiveMode"
            toggleLabel="Default Interactive Mode"
          />
        </div>
      </div>
    </div>
  )
}

export default SettingInteractiveMode
