import type { AppState } from '@/services/store/app'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
  links: boolean
  theme: string
}

const initialState: SettingsState = {
  links: false,
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
  },
})

export const { toggleLinks, setTheme } = settingsSlice.actions

export const settingsState = (state: AppState) => state.settings

export default settingsSlice.reducer
