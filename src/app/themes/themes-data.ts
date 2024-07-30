import { darkThemeToken, lightThemeToken, userPreferenceToken } from './constants'
import { getThemeByUserPreference } from './utils/get-theme-by-user-preference'
import { isLightTheme } from './utils/is-light-theme'
import { ThemeConfig } from 'antd'

export const lightThemeData: ThemeConfig = {
  token: {
    colorPrimary: '#3067ff',
    colorBorder: '#dad8d8',
  },
  components: {
    Input: {
      colorBgContainer: 'transparent',
      colorBorder: '#dad8d8',
      colorText: '#222224',
      colorTextPlaceholder: '#707070',
    },
    Divider: {
      colorSplit: '#dad8d8',
    },
  }
}

export const darkThemeData: ThemeConfig = {
  token: {
    colorPrimary: '#3067ff',
    colorBorder: '#3f3e43',
  },
  components: {
    Input: {
      colorBgContainer: 'transparent',
      colorBorder: '#6b6a70',
      colorText: '#e9e8ea',
      colorTextPlaceholder: '#6b6a70',
    },
    Divider: {
      colorSplit: '#3f3e43',
    },
  }
}

export const mapThemeTokenToThemeData = {
  [lightThemeToken]: () => lightThemeData,
  [darkThemeToken]: () => darkThemeData,
  [userPreferenceToken]: () => isLightTheme(getThemeByUserPreference()) ? lightThemeData : darkThemeData
}
