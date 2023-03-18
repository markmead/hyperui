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
    {
      title: 'Theme',
      component: <SettingTheme key="siteTheme" />,
    },
    {
      title: 'Dark Mode',
      component: <SettingDarkMode key="darkMode" />,
    },
    {
      title: 'Interactive Mode',
      component: <SettingInteractiveMode key="interactiveMode" />,
    },
    {
      title: 'RTL Mode',
      component: <SettingRtlMode key="rtlMode" />,
    },
    {
      title: 'Component Links',
      component: <SettingComponentLinks key="componentLinks" />,
    },
    {
      title: 'Breakpoint',
      component: <SettingBreakpoint key="breakpoint" />,
      style: 'hidden lg:block',
    },
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
        className="absolute right-0 top-14 z-50 max-w-sm overflow-hidden rounded-lg border border-gray-100 bg-gray-100 shadow-lg dark:border-gray-800 dark:bg-gray-800"
      >
        <ul className="space-y-px">
          {settingComponents.map(
            ({
              title: settingTitle,
              component: settingComponent,
              style: settingStyle,
            }) => (
              <li
                key={settingTitle}
                className={`${settingStyle} bg-white p-4 dark:bg-gray-900`}
              >
                {settingComponent}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  )
}

export default HeaderSettings
