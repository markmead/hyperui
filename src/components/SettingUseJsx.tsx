import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useAppSelector, useAppDispatch } from '@/services/hooks/useStore'
import { toggleUseJsx, settingsState } from '@/services/store/slices/settings'

import SettingTitle from '@/components/SettingTitle'
import SettingToggle from '@/components/SettingToggle'

function SettingUseJsx() {
  const dispatch = useAppDispatch()
  const { useJsx } = useAppSelector(settingsState)

  const { asPath } = useRouter()

  const [initialUseJsx, setInitialUseJsx] = useState(useJsx)
  const [shouldRefresh, setShouldRefresh] = useState(false)

  useEffect(() => {
    setInitialUseJsx(useJsx)
    setShouldRefresh(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath])

  useEffect(() => {
    const valueHasChanged = initialUseJsx !== useJsx

    setShouldRefresh(valueHasChanged)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useJsx])

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <SettingTitle
            settingTitle="Use JSX"
            settingDescription="Copy code as JSX instead HTML."
            shouldRefresh={shouldRefresh}
            experimental
          />
        </div>

        <div className="shrink-0">
          <SettingToggle
            toggleValue={useJsx}
            toggleHandler={() => dispatch(toggleUseJsx())}
            toggleId="ToggleUseJSX"
            toggleLabel="Use JSX"
          />
        </div>
      </div>
    </div>
  )
}

export default SettingUseJsx
