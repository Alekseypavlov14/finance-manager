import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import styles from './SettingsIcon.module.css'

export function SettingsIcon() {
  return (
    <FontAwesomeIcon 
      className={styles.SettingsIcon}
      icon={faGear}
    />
  )
}