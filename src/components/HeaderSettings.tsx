import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import { useClickOutside } from '@/services/hooks/useClickOutside'

import IconCog from '@/components/IconCog'
import SettingComponentLinks from '@/components/SettingComponentLinks'
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
      title: 'Component Links',
      component: <SettingComponentLinks key="componentLinks" />,
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
        className="absolute end-0 top-14 z-50 max-w-sm overflow-hidden rounded-lg border border-gray-100 bg-gray-100 shadow-lg dark:border-gray-800 dark:bg-gray-800"
      >
        <ul className="space-y-px">
          {settingComponents.map(
            ({ title: settingTitle, component: settingComponent }) => (
              <li key={settingTitle} className="bg-white p-4 dark:bg-gray-900">
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
