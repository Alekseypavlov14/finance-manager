import { mapThemeTokenToThemeData } from '../themes-data'
import { useThemeStore } from '../store'
import { ThemeConfig } from 'antd'

export function useThemeData(): ThemeConfig {
  const theme = useThemeStore(state => state.theme)
  const themeData = mapThemeTokenToThemeData[theme]()
  return themeData
}
