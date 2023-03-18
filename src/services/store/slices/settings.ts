import type { AppState } from '@/services/store/app'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
  links: boolean
  dark: boolean
  theme: string
}

const initialState: SettingsState = {
  links: false,
  dark: false,
  theme: 'light',
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleLinks(state: SettingsState) {
      state.links = !state.links
    },

    setTheme(state: SettingsState, action: PayloadAction<string>) {
      state.theme = action.payload
    },

    setDark(state: SettingsState, action: PayloadAction<boolean>) {
      state.dark = action.payload
    },
  },
})

export const { toggleLinks, setTheme, setDark } = settingsSlice.actions

export const settingsState = (state: AppState) => state.settings

export default settingsSlice.reducer
