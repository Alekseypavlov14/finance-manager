import { ComponentPropsWithoutRef } from 'react'
import styles from './SettingsSection.module.css'
import clsx from 'clsx'

interface SettingsSectionProps extends ComponentPropsWithoutRef<'div'> {}

export function SettingsSection({ className, ...props }: SettingsSectionProps) {
  return (
    <div className={clsx(styles.SettingsSection, className)} {...props} />
  )
}