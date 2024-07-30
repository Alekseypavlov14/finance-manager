import { ThemeToken, userPreferenceToken } from '../constants'

export function isUserPreferenceTheme(theme: ThemeToken) {
  return theme === userPreferenceToken
}
