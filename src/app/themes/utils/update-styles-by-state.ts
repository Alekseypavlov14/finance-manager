import { getThemeByUserPreference } from './get-theme-by-user-preference'
import { themesStore } from '../store'
import { 
  darkThemeCSSClass, 
  darkThemeToken, 
  lightThemeCSSClass, 
  lightThemeToken, 
  ThemeCSSClass, 
  themesCSSClasses, 
  userPreferenceToken 
} from '../constants'

const themesCSSClassGetter = {
  [lightThemeToken]: () => lightThemeCSSClass,
  [darkThemeToken]: () => darkThemeCSSClass,
  [userPreferenceToken]: getUserPreferenceTheme,
}

export function updateStylesByState() {
  const themeToken = themesStore.getState().theme
  const themeCSSClass = themesCSSClassGetter[themeToken]()
  updateCSSClasses(themeCSSClass)
}

function getUserPreferenceTheme(): ThemeCSSClass {
  return themesCSSClassGetter[getThemeByUserPreference()]()
}

function updateCSSClasses(themeCSSClass: string) {
  document.body.classList.remove(...themesCSSClasses)
  document.body.classList.add(themeCSSClass)
}
