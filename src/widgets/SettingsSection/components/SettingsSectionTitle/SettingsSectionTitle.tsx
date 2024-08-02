import { Headline } from '@/shared/components/Headline'
import { ReactNode } from 'react'
import styles from './SettingsSectionTitle.module.css'
import clsx from 'clsx'

interface SettingsSectionTitleProps {
  children: ReactNode
  dangerous?: boolean
}

export function SettingsSectionTitle({ children, dangerous }: SettingsSectionTitleProps) {
  return (
    <Headline 
      className={clsx(styles.SettingsSectionTitle, dangerous && styles.Dangerous)}
      level={2}
    >
      {children}
    </Headline>
  )
}