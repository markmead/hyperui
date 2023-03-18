import { useAppSelector, useAppDispatch } from '@/services/hooks/useStore'
import { toggleLinks, settingsState } from '@/services/store/slices/settings'

import SettingTitle from '@/components/SettingTitle'
import SettingToggle from '@/components/SettingToggle'

function SettingComponentLinks() {
  const dispatch = useAppDispatch()
  const { links } = useAppSelector(settingsState)

  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <div className="col-span-2">
        <SettingTitle
          settingTitle="Show Links"
          settingDescription="Show links to all components on component pages for easy navigation."
        />
      </div>

      <div className="flex justify-end">
        <SettingToggle
          toggleValue={links}
          toggleHandler={() => dispatch(toggleLinks())}
          toggleId="ShowLinks"
          toggleLabel="Show Component Links"
        />
      </div>
    </div>
  )
}

export default SettingComponentLinks
