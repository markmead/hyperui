import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useAppSelector, useAppDispatch } from '@/services/hooks/useStore'
import { toggleRtl, settingsState } from '@/services/store/slices/settings'

import SettingTitle from '@/components/SettingTitle'
import SettingToggle from '@/components/SettingToggle'

function SettingRtlMode() {
  const dispatch = useAppDispatch()
  const { rtl } = useAppSelector(settingsState)

  const { asPath } = useRouter()

  const [initialRtl, setInitialRtl] = useState(rtl)
  const [shouldRefresh, setShouldRefresh] = useState(false)

  useEffect(() => {
    setInitialRtl(rtl)
    setShouldRefresh(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath])

  useEffect(() => {
    const valueHasChanged = initialRtl !== rtl

    setShouldRefresh(valueHasChanged)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rtl])

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <SettingTitle
            settingTitle="RTL Mode"
            settingDescription="Components will be rendered in RTL mode by default if they have an RTL mode variant."
            shouldRefresh={shouldRefresh}
          />
        </div>

        <div className="shrink-0">
          <SettingToggle
            toggleValue={rtl}
            toggleHandler={() => dispatch(toggleRtl())}
            toggleId="RtlMode"
            toggleLabel="Default Rtl Mode"
          />
        </div>
      </div>
    </div>
  )
}

export default SettingRtlMode
