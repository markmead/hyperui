import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useAppSelector, useAppDispatch } from '@/hooks/app'
import { toggleInteractive, settingsState } from '@/store/slices/settings'

import SettingTitle from '@/components/SettingTitle'
import SettingToggle from '@/components/SettingToggle'

function SettingInteractiveMode() {
  const dispatch = useAppDispatch()
  const { interactive } = useAppSelector(settingsState)

  const { asPath } = useRouter()

  const [initialInteractive, setInitialInteractive] = useState(interactive)
  const [shouldRefresh, setShouldRefresh] = useState(false)

  useEffect(() => {
    setInitialInteractive(interactive)
    setShouldRefresh(false)
  }, [asPath])

  useEffect(() => {
    const valueHasChanged = initialInteractive !== interactive

    setShouldRefresh(valueHasChanged)
  }, [interactive])

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <SettingTitle
            settingTitle="Interactive Mode"
            settingDescription="Components will be rendered in interactive mode by default if they have an interactive mode variant."
            shouldRefresh={shouldRefresh}
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
