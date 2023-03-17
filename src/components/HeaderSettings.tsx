import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import { useClickOutside } from '@/services/hooks/useClickOutside'

import IconCog from '@/components/IconCog'
import SettingDarkMode from '@/components/SettingDarkMode'
import SettingInteractiveMode from '@/components/SettingInteractiveMode'
import SettingRtlMode from '@/components/SettingRtlMode'
import SettingComponentLinks from '@/components/SettingComponentLinks'
import SettingBreakpoint from '@/components/SettingBreakpoint'
import SettingTheme from '@/components/SettingTheme'

function HeaderSettings() {
  const nextRouter = useRouter()
  const refDropdown = useRef(null)

  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  useEffect(() => setShowDropdown(false), [nextRouter.asPath])

  useClickOutside(refDropdown, showDropdown, () => setShowDropdown(false))

  const settingComponents = [
    <SettingTheme key="siteTheme" />,
    <SettingDarkMode key="darkMode" />,
    <SettingInteractiveMode key="interactiveMode" />,
    <SettingRtlMode key="rtlMode" />,
    <SettingComponentLinks key="componentLinks" />,
    <SettingBreakpoint key="previewBreakpoint" />,
  ]

  return (
    <div ref={refDropdown} className="flex text-gray-900 dark:text-white">
      <button onClick={() => setShowDropdown(!showDropdown)}>
        <IconCog />

        <span className="sr-only">Settings</span>
      </button>

      <div
        {...(!showDropdown && {
          hidden: true,
        })}
        className="absolute right-0 top-14 z-50 max-w-3xl overflow-hidden rounded-lg border border-gray-100 bg-gray-100 shadow-lg dark:border-gray-800 dark:bg-gray-800"
      >
        <ul className="grid grid-cols-2 gap-px">
          {settingComponents.map((settingComponent, componentIndex) => (
            <li key={componentIndex} className="bg-white p-4 dark:bg-gray-900">
              {settingComponent}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HeaderSettings
