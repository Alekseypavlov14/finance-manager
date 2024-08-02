import { ComponentPropsWithoutRef } from 'react'
import styles from './Center.module.css'
import clsx from 'clsx'

interface CenterProps extends ComponentPropsWithoutRef<'div'> {}

export function Center({ className, ...props }: CenterProps) {
  const classNames = clsx(styles.Center, className)

  return (
    <div className={classNames} {...props} />
  )
}