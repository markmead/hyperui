import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useAppSelector, useAppDispatch } from '@/services/hooks/app'
import { toggleDark, settingsState } from '@/services/store/slices/settings'

import SettingTitle from '@/components/SettingTitle'
import SettingToggle from '@/components/SettingToggle'

function SettingDarkMode() {
  const dispatch = useAppDispatch()
  const { dark } = useAppSelector(settingsState)

  const { asPath } = useRouter()

  const [initialDark, setInitialDark] = useState(dark)
  const [shouldRefresh, setShouldRefresh] = useState(false)

  useEffect(() => {
    setInitialDark(dark)
    setShouldRefresh(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath])

  useEffect(() => {
    const valueHasChanged = initialDark !== dark

    setShouldRefresh(valueHasChanged)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dark])

  return (
    <div className="flex items-start gap-4">
      <div className="flex-1">
        <SettingTitle
          settingTitle="Dark Mode"
          settingDescription="Components will be rendered in dark mode by default if they have a dark mode variant."
          shouldRefresh={shouldRefresh}
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
