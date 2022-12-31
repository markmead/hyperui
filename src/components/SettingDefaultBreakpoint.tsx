import { useEffect, useState } from 'react'

import { componentBreakpoints } from '@/utils/componentBreakpoints'
import { Breakpoint } from '@/interface/breakpoint'

function SettingDefaultBreakpoint() {
  const [defaultBreakpoint, setDefaultBreakpoint] = useState<string>('100%')

  useEffect(() => {
    setDefaultBreakpoint(
      localStorage.getItem('_SETTING_DEFAULT_BREAKPOINT') || '100%'
    )
  }, [])

  useEffect(() => {
    localStorage.setItem('_SETTING_DEFAULT_BREAKPOINT', `${defaultBreakpoint}`)

    dispatchEvent(
      new CustomEvent('setting:default-breakpoint', {
        bubbles: true,
        detail: { defaultBreakpoint },
      })
    )
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

        <div className="shrink-0">
          <label htmlFor="DefaultBreakpoint" className="sr-only">
            Default Breakpoint
          </label>

          <select
            id="DefaultBreakpoint"
            value={defaultBreakpoint}
            onChange={(e) => setDefaultBreakpoint(e.currentTarget.value)}
            className="w-full border-gray-200 rounded-md shadow-sm sm:text-sm"
          >
            {componentBreakpoints.map((breakpointItem: Breakpoint) => (
              <option key={breakpointItem.name} value={breakpointItem.width}>
                {breakpointItem.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default SettingDefaultBreakpoint
