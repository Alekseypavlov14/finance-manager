import { updateTheme, useThemeStore } from '../../store'
import { getThemeOptions } from '../../utils/get-theme-options'
import { Select } from 'antd'

export function ThemeToggler() {
  const theme = useThemeStore(state => state.theme)

  return (
    <Select 
      value={theme}
      options={getThemeOptions()}
      onChange={updateTheme}
    />
  )
}