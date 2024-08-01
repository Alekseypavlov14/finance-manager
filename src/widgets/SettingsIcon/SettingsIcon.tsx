import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigation } from '@/app/routing'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import styles from './SettingsIcon.module.css'

export function SettingsIcon() {
  const { navigateSettingsPage } = useNavigation()

  return (
    <FontAwesomeIcon 
      onClick={navigateSettingsPage}
      className={styles.SettingsIcon}
      icon={faGear}
    />
  )
}