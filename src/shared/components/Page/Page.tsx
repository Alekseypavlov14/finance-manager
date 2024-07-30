import { ReactNode } from 'react'
import styles from './Page.module.css'
import clsx from 'clsx'

interface PageProps {
  children: ReactNode
  className?: string
}

export function Page({ children, className }: PageProps) {
  const classNames = clsx(styles.Page, className)

  return (
    <div className={classNames}>
      {children}
    </div>
  )
}