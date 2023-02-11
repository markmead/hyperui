import { configureStore } from '@reduxjs/toolkit'

import { loadState, saveState } from '@/services/store/loaders'

import settingsReducer from '@/services/store/slices/settings'
import siteReducer from '@/services/store/slices/site'

const persistedState = loadState()

export function makeStore() {
  return configureStore({
    reducer: { settings: settingsReducer, site: siteReducer },
    preloadedState: persistedState,
  })
}

const store = makeStore()

store.subscribe(() => saveState(store.getState()))

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
