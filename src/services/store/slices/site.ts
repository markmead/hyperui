import type { AppState } from '@/services/store/app'

import { createSlice } from '@reduxjs/toolkit'

interface SiteState {
  banner: boolean
}

const initialState: SiteState = {
  banner: true,
}

export const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    toggleBanner(state: SiteState) {
      state.banner = !state.banner
    },
  },
})

export const { toggleBanner } = siteSlice.actions

export const siteState = (state: AppState) => state.site

export default siteSlice.reducer
