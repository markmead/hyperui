import { useAppSelector, useAppDispatch } from '@/hooks/app'
import { toggleLinks, settingsState } from '@/store/slices/settings'

import SettingTitle from '@/components/SettingTitle'
import SettingToggle from '@/components/SettingToggle'

function SettingComponentLinks() {
  const dispatch = useAppDispatch()
  const { links } = useAppSelector(settingsState)

  return (
    <div className="flex items-start gap-4">
      <div className="flex-1">
        <SettingTitle
          title="Show Links"
          description="Show links to all components on the component page for easy navigation."
        />
      </div>

      <div className="shrink-0">
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
