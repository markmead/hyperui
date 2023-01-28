import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '@/store/app'

interface State {
  links: boolean
  breakpoint: string
}

const initialState: State = {
  links: false,
  breakpoint: '100%',
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleLinks(state) {
      state.links = !state.links
    },

    setBreakpoint(state, action: PayloadAction<string>) {
      state.breakpoint = action.payload
    },
  },
})

export const { toggleLinks, setBreakpoint } = settingsSlice.actions

export const settingsState = (state: AppState) => state.settings

export default settingsSlice.reducer
