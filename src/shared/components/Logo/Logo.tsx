import { useNavigation } from '@/app/routing'
import styles from './Logo.module.css'

export function Logo() {
  const { navigateHomePage } = useNavigation()

  return (
    <div 
      onClick={navigateHomePage}
      className={styles.Logo}
    >
      FM
    </div>
  )
}