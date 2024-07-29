import { defaultThemeToken, ThemeToken } from './constants'
import { LocalStorage } from '@oleksii-pavlov/storages'
import { themesStore } from './store'

export const themesLocalStorage = new LocalStorage<ThemeToken>('theme', defaultThemeToken)

export function updateThemesLocalStorage() {
  const themeToken = themesStore.getState().theme
  themesLocalStorage.setValue(themeToken)
}
