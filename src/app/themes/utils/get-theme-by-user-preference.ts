import { darkThemeToken, lightThemeToken, ThemeToken } from '../constants'

export function getThemeByUserPreference(): ThemeToken {
  if (
    window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) return darkThemeToken

  return lightThemeToken
}