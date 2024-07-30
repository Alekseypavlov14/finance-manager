import { darkThemeToken, ThemeToken } from '../constants'

export function isDarkTheme(theme: ThemeToken) {
  return theme === darkThemeToken
}
