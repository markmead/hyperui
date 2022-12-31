import { useEffect, useState } from 'react'

import { Breakpoint } from '@/interface/breakpoint'
import { componentBreakpoints } from '@/utils/componentBreakpoints'

import SettingSelect from '@/components/SettingSelect'

function SettingDefaultBreakpoint() {
  const [defaultBreakpoint, setDefaultBreakpoint] = useState<string>('100%')

  useEffect(() => {
    setDefaultBreakpoint(
      localStorage.getItem('_SETTING_DEFAULT_BREAKPOINT') || '100%'
    )
  }, [])

  useEffect(() => {
    localStorage.setItem('_SETTING_DEFAULT_BREAKPOINT', `${defaultBreakpoint}`)

    dispatchEvent(new CustomEvent('setting:default-breakpoint'))
  }, [defaultBreakpoint])

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
          selectValue={defaultBreakpoint}
          selectHandler={setDefaultBreakpoint}
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
