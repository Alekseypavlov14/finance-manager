import { darkThemeToken, lightThemeToken, userPreferenceToken } from './constants'
import { getThemeByUserPreference } from './utils/get-theme-by-user-preference'
import { isLightTheme } from './utils/is-light-theme'
import { ThemeConfig } from 'antd'

export const lightThemeData: ThemeConfig = {
  token: {
    colorPrimary: '#3067ff',
  }
}

export const darkThemeData: ThemeConfig = {
  token: {
    colorPrimary: '#3067ff'
  }
}

export const mapThemeTokenToThemeData = {
  [lightThemeToken]: () => lightThemeData,
  [darkThemeToken]: () => darkThemeData,
  [userPreferenceToken]: () => isLightTheme(getThemeByUserPreference()) ? lightThemeData : darkThemeData
}
