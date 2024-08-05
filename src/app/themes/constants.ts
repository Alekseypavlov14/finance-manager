export type ThemeToken = 'light' | 'dark' | 'user-preference'

export const lightThemeToken: ThemeToken = 'light'
export const darkThemeToken: ThemeToken = 'dark'
export const userPreferenceToken: ThemeToken = 'user-preference'

export const defaultThemeToken = userPreferenceToken

export type ThemeCSSClass = 'light-theme' | 'dark-theme'

export const lightThemeCSSClass: ThemeCSSClass = 'light-theme'
export const darkThemeCSSClass: ThemeCSSClass = 'dark-theme'

export const themesCSSClasses: ThemeCSSClass[] = [lightThemeCSSClass, darkThemeCSSClass]

export const successColor = 'var(--success-color)'
export const failureColor = 'var(--failure-color)'

export const textPrimary = 'var(--text-primary)'
