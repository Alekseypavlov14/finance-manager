import { darkThemeToken, lightThemeToken, userPreferenceToken } from './constants'
import { getThemeByUserPreference } from './utils/get-theme-by-user-preference'
import { isLightTheme } from './utils/is-light-theme'
import { ThemeConfig } from 'antd'

export const lightThemeData: ThemeConfig = {
  token: {
    colorPrimary: '#3067ff',
  },
  components: {
    Input: {
      colorBgContainer: 'transparent',
      colorBorder: '#707070',
      colorText: '#222224',
      colorTextPlaceholder: '#707070',
    }
  }
}

export const darkThemeData: ThemeConfig = {
  token: {
    colorPrimary: '#3067ff',
  },
  components: {
    Input: {
      colorBgContainer: 'transparent',
      colorBorder: '#6b6a70',
      colorText: '#e9e8ea',
      colorTextPlaceholder: '#6b6a70',
    }
  }
}

export const mapThemeTokenToThemeData = {
  [lightThemeToken]: () => lightThemeData,
  [darkThemeToken]: () => darkThemeData,
  [userPreferenceToken]: () => isLightTheme(getThemeByUserPreference()) ? lightThemeData : darkThemeData
}
