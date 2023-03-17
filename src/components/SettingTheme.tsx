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
  const { theme } = useAppSelector(settingsState)

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

  useEffect(() => {
    const siteTheme = theme === 'system' ? getSystemTheme() : theme

    updateBodyClass(siteTheme)
  }, [])

  function handleThemeChange(themeSelected: string) {
    const siteTheme =
      themeSelected === 'system' ? getSystemTheme() : themeSelected

    const isDark = siteTheme === 'dark'

    updateBodyClass(siteTheme)

    dispatch(setTheme(themeSelected))
    dispatch(setDark(isDark))
  }

  function updateBodyClass(siteTheme: string) {
    const bodyEl = document.body as HTMLBodyElement

    siteTheme === 'dark'
      ? bodyEl.classList.add('dark')
      : bodyEl.classList.remove('dark')
  }

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  return (
    <div className="flex items-start gap-4">
      <div className="flex-1">
        <SettingTitle
          settingTitle="Site Theme"
          settingDescription="Set the theme of the site from dark, light or system settings."
        />
      </div>

      <div className="shrink-0">
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
