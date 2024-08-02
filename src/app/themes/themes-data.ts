import { darkThemeToken, lightThemeToken, userPreferenceToken } from './constants'
import { getThemeByUserPreference } from './utils/get-theme-by-user-preference'
import { ThemeConfig, theme } from 'antd'
import { isLightTheme } from './utils/is-light-theme'

export const lightThemeData: ThemeConfig = {
  token: {
    colorPrimary: '#3067ff',
    colorBorder: '#dad8d8',

    colorBgContainer: '#ffffff',
    colorText: '#222224',
    colorTextPlaceholder: '#707070',
    colorBorderBg: '#dad8d8',

    colorSplit: '#dad8d8',

    colorBgElevated: '#ffffff',

    controlOutline: 'transparent',
  },
  components: {
    Select: {
      optionActiveBg: '#e5e5e5',
      optionSelectedBg: '#e5e5e5',
    }
  }
}

export const darkThemeData: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#3067ff',
    colorBorder: '#3f3e43',

    colorBgContainer: '#1d1d27',
    colorBorderBg: '#6b6a70',
    colorText: '#e9e8ea',
    colorTextPlaceholder: '#6b6a70',

    colorSplit: '#3f3e43',

    colorBgElevated: '#1d1d27',

    controlOutline: 'transparent',
  },
  components: {
    Select: {
      optionActiveBg: '#282834',
      optionSelectedBg: '#282834',
    },
    DatePicker: {
      colorTextDisabled: '#6b6a70',
    }
  }
}

export const mapThemeTokenToThemeData = {
  [lightThemeToken]: () => lightThemeData,
  [darkThemeToken]: () => darkThemeData,
  [userPreferenceToken]: () => isLightTheme(getThemeByUserPreference()) ? lightThemeData : darkThemeData
}
