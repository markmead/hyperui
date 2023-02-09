import { Breakpoint } from '@/interface/breakpoint'

import { componentBreakpoints } from '@/utils/componentBreakpoints'

import { useAppSelector, useAppDispatch } from '@/hooks/useStore'
import { setBreakpoint, settingsState } from '@/store/slices/settings'

import SettingTitle from '@/components/SettingTitle'
import SettingSelect from '@/components/SettingSelect'

function SettingBreakpoint() {
  const dispatch = useAppDispatch()
  const { breakpoint } = useAppSelector(settingsState)

  return (
    <div className="flex items-start gap-4">
      <div className="flex-1">
        <SettingTitle
          settingTitle="Preview Breakpoint"
          settingDescription="Set the breakpoint for all component previews on the component page."
        />
      </div>

      <div className="shrink-0">
        <SettingSelect
          selectId="DefaultBreakpoint"
          selectLabel="Default Breakpoint"
          selectValue={breakpoint}
          selectHandler={(value: string) => dispatch(setBreakpoint(value))}
        >
          {componentBreakpoints.map((breakpointItem: Breakpoint) => (
            <option key={breakpointItem.name} value={breakpointItem.width}>
              {breakpointItem.name}
            </option>
          ))}
        </SettingSelect>
      </div>
    </div>
  )
}

export default SettingBreakpoint
