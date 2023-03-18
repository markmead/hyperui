import { useEffect } from 'react'

import { useAppSelector, useAppDispatch } from '@/services/hooks/useStore'
import {
  setDark,
  setTheme,
  settingsState,
} from '@/services/store/slices/settings'

import SettingTitle from '@/components/SettingTitle'
import SettingSelect from '@/components/SettingSelect'

function SettingTheme() {
  const dispatch = useAppDispatch()
  const { theme, dark } = useAppSelector(settingsState)

  const siteThemes = [
    {
      label: 'Light',
      value: 'light',
    },
    {
      label: 'Dark',
      value: 'dark',
    },
    {
      label: 'System',
      value: 'system',
    },
  ]

  useEffect(() => updateBodyClass(dark), [])

  function handleThemeChange(themeSelected: string) {
    const useSystem = themeSelected === 'system'

    if (!useSystem) {
      const isDark = themeSelected === 'dark'

      dispatch(setDark(isDark))
      dispatch(setTheme(themeSelected))

      updateBodyClass(isDark)

      return
    }

    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'

    const isDark = systemTheme === 'dark'

    dispatch(setDark(isDark))
    dispatch(setTheme(themeSelected))

    updateBodyClass(isDark)
  }

  function updateBodyClass(isDark: boolean) {
    const bodyEl = document.body as HTMLBodyElement

    isDark ? bodyEl.classList.add('dark') : bodyEl.classList.remove('dark')
  }

  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <div className="col-span-2">
        <SettingTitle
          settingTitle="Site Theme"
          settingDescription="Set the theme of the site, components will render in dark mode if supported."
        />
      </div>

      <div className="flex justify-end">
        <SettingSelect
          selectId="DefaultTheme"
          selectLabel="Default Theme"
          selectValue={theme}
          selectHandler={(value: string) => handleThemeChange(value)}
        >
          {siteThemes.map((themeItem) => (
            <option key={themeItem.label} value={themeItem.value}>
              {themeItem.label}
            </option>
          ))}
        </SettingSelect>
      </div>
    </div>
  )
}

export default SettingTheme
