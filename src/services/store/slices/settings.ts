import type { AppState } from '@/services/store/app'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
  dark: boolean
  interactive: boolean
  rtl: boolean
  links: boolean
  breakpoint: string
}

const initialState: SettingsState = {
  dark: false,
  interactive: false,
  rtl: false,
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

    toggleInteractive(state: SettingsState) {
      state.interactive = !state.interactive
    },

    toggleRtl(state: SettingsState) {
      state.rtl = !state.rtl
    },

    toggleLinks(state: SettingsState) {
      state.links = !state.links
    },

    setBreakpoint(state: SettingsState, action: PayloadAction<string>) {
      state.breakpoint = action.payload
    },
  },
})

export const {
  toggleDark,
  toggleInteractive,
  toggleRtl,
  toggleLinks,
  setBreakpoint,
} = settingsSlice.actions

export const settingsState = (state: AppState) => state.settings

export default settingsSlice.reducer
