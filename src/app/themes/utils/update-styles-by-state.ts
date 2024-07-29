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
  [userPreferenceToken]:  getUserPreferenceTheme,
}

export function updateStylesByState() {
  const themeToken = themesStore.getState().theme
  const themeCSSClass = themesCSSClassGetter[themeToken]()
  updateCSSClasses(themeCSSClass)
}

function getUserPreferenceTheme(): ThemeCSSClass {
  if (
    window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) return darkThemeCSSClass

  return lightThemeCSSClass
}

function updateCSSClasses(themeCSSClass: string) {
  document.body.classList.remove(...themesCSSClasses)
  document.body.classList.add(themeCSSClass)
}
