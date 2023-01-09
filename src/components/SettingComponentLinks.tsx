import SettingToggle from '@/components/SettingToggle'

type Props = {
  showLinks: boolean
  handleShowLinks: CallableFunction
}

function SettingComponentLinks({ showLinks, handleShowLinks }: Props) {
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
          toggleValue={showLinks}
          toggleHandler={handleShowLinks}
          toggleId="ShowLinks"
          toggleLabel="Show Component Links"
        />
      </div>
    </div>
  )
}

export default SettingComponentLinks
