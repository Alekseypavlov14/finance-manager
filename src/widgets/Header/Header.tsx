import { SettingsIcon } from '@/widgets/SettingsIcon'
import { Logo } from '@/shared/components/Logo'
import styles from './Header.module.css'

export function Header() {
  return (
    <div className={styles.Header}>
      <Logo />

      <SettingsIcon />
    </div>
  )
}