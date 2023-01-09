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
  const [settingShowLinks, setSettingShowLinks] = useState<boolean>(false)
  const [settingDefaultBreakpoint, setSettingDefaultBreakpoint] =
    useState<string>('100%')

  useEffect(() => setShowDropdown(false), [nextRouter.asPath])

  useClickOutside(refDropdown, showDropdown, () => setShowDropdown(false))

  useEffect(() => {
    setSettingShowLinks(
      JSON.parse(localStorage.getItem('_showLinks') || 'false')
    )

    setSettingDefaultBreakpoint(
      localStorage.getItem('_defaultBreakpoint') || '100%'
    )
  }, [])

  useEffect(() => {
    localStorage.setItem('_showLinks', `${settingShowLinks}`)
    localStorage.setItem('_defaultBreakpoint', `${settingDefaultBreakpoint}`)

    dispatchEvent(
      new CustomEvent('_settingChanged', {
        detail: {
          settingShowLinks,
          settingDefaultBreakpoint,
        },
      })
    )
  }, [settingShowLinks, settingDefaultBreakpoint])

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
        className="absolute right-0 z-50 max-w-sm bg-white border border-gray-100 rounded-lg shadow-lg top-14"
      >
        <div className="flow-root">
          <ul className="divide-y divide-gray-100 -py-4">
            <li className="p-4">
              <ComponentLinks
                showLinks={settingShowLinks}
                handleShowLinks={setSettingShowLinks}
              />
            </li>

            <li className="p-4">
              <DefaultBreakpoint
                defaultBreakpoint={settingDefaultBreakpoint}
                handleDefaultBreakpoint={setSettingDefaultBreakpoint}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HeaderSettings
