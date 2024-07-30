import { lightThemeToken, ThemeToken } from '../constants'

export function isLightTheme(theme: ThemeToken) {
  return theme === lightThemeToken
}
