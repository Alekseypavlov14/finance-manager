import { darkThemeToken, defaultThemeToken, lightThemeToken, ThemeToken, userPreferenceToken } from './constants'
import { themesLocalStorage, updateThemesLocalStorage } from './storage'
import { updateStylesByState } from './utils/update-styles-by-state'
import { createStore } from '@oleksii-pavlov/desirable/react'

interface ThemesState {
  theme: ThemeToken
}

const initialState: ThemesState = {
  theme: themesLocalStorage.getValue() ?? defaultThemeToken
}

// store
export const themesStore = createStore(initialState, (state) => ({
  updateTheme: (newTheme: ThemeToken) => state.theme = newTheme,
  setLightTheme: () => state.theme = lightThemeToken,
  setDarkTheme: () => state.theme = darkThemeToken,
  setUserPreferenceTheme: () => state.theme = userPreferenceToken,
}))

// subscriptions
themesStore.subscribe(updateThemesLocalStorage)
themesStore.subscribe(updateStylesByState)

// reducers & selector
export const { updateTheme, setLightTheme, setDarkTheme, setUserPreferenceTheme } = themesStore.reducers
export const useThemeStore = themesStore.useSelector

themesStore.init()