import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useAppSelector, useAppDispatch } from '@/services/hooks/useStore'
import { toggleBionic, settingsState } from '@/services/store/slices/settings'

import SettingTitle from '@/components/SettingTitle'
import SettingToggle from '@/components/SettingToggle'

function SettingBionicMode() {
  const dispatch = useAppDispatch()
  const { bionic } = useAppSelector(settingsState)

  const { asPath } = useRouter()

  const [initialBionic, setInitialBionic] = useState(bionic)
  const [shouldRefresh, setShouldRefresh] = useState(false)

  useEffect(() => {
    setInitialBionic(bionic)
    setShouldRefresh(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath])

  useEffect(() => {
    const valueHasChanged = initialBionic !== bionic

    setShouldRefresh(valueHasChanged)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bionic])

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <SettingTitle
            settingTitle="Bionic Reading"
            settingDescription="Blog content will render in bionic reading mode."
            shouldRefresh={shouldRefresh}
          />
        </div>

        <div className="shrink-0">
          <SettingToggle
            toggleValue={bionic}
            toggleHandler={() => dispatch(toggleBionic())}
            toggleId="BionicMode"
            toggleLabel="Default Bionic Mode"
          />
        </div>
      </div>
    </div>
  )
}

export default SettingBionicMode
