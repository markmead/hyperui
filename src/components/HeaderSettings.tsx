import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import { useClickOutside } from '@/hooks/useClickOutside'

import IconCog from '@/components/IconCog'
import ComponentLinks from '@/components/SettingComponentLinks'
import DefaultBreakpoint from '@/components/SettingDefaultBreakpoint'

function HeaderSettings() {
  const nextRouter = useRouter()
  const refDropdown = useRef(null)

  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  useEffect(() => setShowDropdown(false), [nextRouter.asPath])

  useClickOutside(refDropdown, showDropdown, () => setShowDropdown(false))

  return (
    <div ref={refDropdown} className="flex">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="inline-flex items-center gap-1.5"
      >
        <IconCog />

        <span className="sr-only">Settings</span>
      </button>

      <div
        {...(!showDropdown && {
          hidden: true,
        })}
        className="absolute right-0 top-14 z-50 max-w-sm rounded-lg border border-gray-100 bg-white shadow-lg"
      >
        <div className="flow-root">
          <ul className="-py-4 divide-y divide-gray-100">
            <li className="p-4">
              <ComponentLinks />
            </li>

            <li className="p-4">
              <DefaultBreakpoint />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HeaderSettings
