import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import { useClickOutside } from '@/hooks/useClickOutside'

import IconCog from '@/components/IconCog'
import SettingDarkMode from '@/components/SettingDarkMode'
import SettingInteractiveMode from '@/components/SettingInteractiveMode'
import SettingComponentLinks from '@/components/SettingComponentLinks'
import SettingBreakpoint from '@/components/SettingBreakpoint'

function HeaderSettings() {
  const nextRouter = useRouter()
  const refDropdown = useRef(null)

  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  useEffect(() => setShowDropdown(false), [nextRouter.asPath])

  useClickOutside(refDropdown, showDropdown, () => setShowDropdown(false))

  const settingComponents = [
    <SettingDarkMode key="darkMode" />,
    <SettingInteractiveMode key="interactiveMode" />,
    <SettingComponentLinks key="componentLinks" />,
    <SettingBreakpoint key="previewBreakpoint" />,
  ]

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
        <ul className="divide-y divide-gray-100">
          {settingComponents.map((settingComponent, componentIndex) => (
            <li key={componentIndex} className="p-4">
              {settingComponent}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HeaderSettings
