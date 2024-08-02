import { darkThemeToken, lightThemeToken, ThemeToken, userPreferenceToken } from '../constants'
import { faCircleHalfStroke, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Option } from '@/shared/types/option'

export function getThemeOptions(): Option<ThemeToken>[] {
  return [
    { value: userPreferenceToken, label: <><FontAwesomeIcon icon={faCircleHalfStroke} width={24} /> <span>User preference</span></>},
    { value: lightThemeToken, label: <><FontAwesomeIcon icon={faSun} width={24} /> <span>Light</span></>},
    { value: darkThemeToken, label: <><FontAwesomeIcon icon={faMoon} width={24} /> <span>Dark</span></>}
  ]
}
