import { navigationLinks } from './links'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Navigation.module.css'

export function Navigation() {
  return (
    <div className={styles.Navigation}>
      {navigationLinks.map(link => (
        <NavLink 
          className={({ isActive }) => clsx(styles.Link, isActive && styles.LinkActive)}
          key={link.key}
          to={link.to}
        >
          {link.icon}
        </NavLink>
      ))}
    </div>
  )
}
