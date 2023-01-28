import type { AppState } from '@/store/app'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
  links: boolean
  breakpoint: string
}

const initialState: SettingsState = {
  links: false,
  breakpoint: '100%',
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleLinks(state: SettingsState) {
      state.links = !state.links
    },

    setBreakpoint(state: SettingsState, action: PayloadAction<string>) {
      state.breakpoint = action.payload
    },
  },
})

export const { toggleLinks, setBreakpoint } = settingsSlice.actions

export const settingsState = (state: AppState) => state.settings

export default settingsSlice.reducer
