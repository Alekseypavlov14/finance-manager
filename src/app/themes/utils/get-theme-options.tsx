import { darkThemeToken, lightThemeToken, ThemeToken, userPreferenceToken } from '../constants'
import { faCircleHalfStroke, faCircle as faCircleFilled } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleOutlined } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Option } from '@/shared/types/option'

export function getThemeOptions(): Option<ThemeToken>[] {
  return [
    { value: userPreferenceToken, label: <><FontAwesomeIcon icon={faCircleHalfStroke} /> User preference</>},
    { value: lightThemeToken, label: <><FontAwesomeIcon icon={faCircleOutlined} /> Light</>},
    { value: darkThemeToken, label: <><FontAwesomeIcon icon={faCircleFilled} /> Dark</>}
  ]
}
