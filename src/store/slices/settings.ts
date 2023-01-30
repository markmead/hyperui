import type { AppState } from '@/store/app'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
  dark: boolean
  links: boolean
  breakpoint: string
}

const initialState: SettingsState = {
  dark: false,
  links: false,
  breakpoint: '100%',
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDark(state: SettingsState) {
      state.dark = !state.dark
    },

    toggleLinks(state: SettingsState) {
      state.links = !state.links
    },

    setBreakpoint(state: SettingsState, action: PayloadAction<string>) {
      state.breakpoint = action.payload
    },
  },
})

export const { toggleDark, toggleLinks, setBreakpoint } = settingsSlice.actions

export const settingsState = (state: AppState) => state.settings

export default settingsSlice.reducer
