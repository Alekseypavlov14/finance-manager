import { ComponentPropsWithoutRef } from 'react'
import styles from './SettingsSectionContent.module.css'
import clsx from 'clsx'

interface SettingsSectionContentProps extends ComponentPropsWithoutRef<'div'> {}

export function SettingsSectionContent({ className, ...props }: SettingsSectionContentProps) {
  return (
    <div className={clsx(styles.SettingsSectionContent, className)} {...props} />
  )
}
