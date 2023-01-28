import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { loadState, saveState } from '@/store/loaders'
import settingsReducer from '@/store/slices/settings'

const persistedState = loadState()

export function makeStore() {
  return configureStore({
    reducer: { settings: settingsReducer },
    preloadedState: persistedState,
  })
}

const store = makeStore()

store.subscribe(() => saveState(store.getState()))

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
