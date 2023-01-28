import { useAppSelector, useAppDispatch } from '@/hooks/app'
import { toggleLinks, settingsState } from '@/store/slices/settings'

import SettingToggle from '@/components/SettingToggle'

function SettingComponentLinks() {
  const dispatch = useAppDispatch()
  const { links } = useAppSelector(settingsState)

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Show Component Links</p>

          <p className="mt-1 text-xs text-gray-700">
            Enabling this will show all component links on the component pages.
          </p>
        </div>

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
