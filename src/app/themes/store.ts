import { themesLocalStorage } from './storage'
import { createStore } from '@oleksii-pavlov/desirable/react'

export type ThemeToken = 'light' | 'dark' | 'user-preference'

export const lightThemeToken: ThemeToken = 'light'
export const darkThemeToken: ThemeToken = 'dark'
export const userPreferenceToken: ThemeToken = 'user-preference'

interface ThemesState {
  theme: ThemeToken
}

const initialState: ThemesState = {
  theme: themesLocalStorage.getValue() ?? userPreferenceToken
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

// reducers & selector
export const { updateTheme, setLightTheme, setDarkTheme, setUserPreferenceTheme } = themesStore.reducers
export const useThemeStore = themesStore.useSelector

// subscription
function updateThemesLocalStorage() {
  const themeToken = themesStore.getState().theme
  themesLocalStorage.setValue(themeToken)
}
