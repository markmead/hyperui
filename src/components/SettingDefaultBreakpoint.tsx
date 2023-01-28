import { Breakpoint } from '@/interface/breakpoint'

import { componentBreakpoints } from '@/utils/componentBreakpoints'

import { useAppSelector, useAppDispatch } from '@/hooks/app'
import { setBreakpoint, settingsState } from '@/store/slices/settings'

import SettingSelect from '@/components/SettingSelect'

type Props = {
  defaultBreakpoint: string
  handleDefaultBreakpoint: CallableFunction
}

function SettingDefaultBreakpoint() {
  const dispatch = useAppDispatch()
  const { breakpoint } = useAppSelector(settingsState)

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Default Breakpoint</p>

          <p className="mt-1 text-xs text-gray-700">
            Set the default breakpoint for all components.
          </p>
        </div>

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

export default SettingDefaultBreakpoint
