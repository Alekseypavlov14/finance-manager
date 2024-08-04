import { ComponentPropsWithoutRef, ReactNode } from 'react'
import styles from './ChartContainer.module.css'
import clsx from 'clsx'

interface ChartContainerProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

export function ChartContainer({ children, className, ...props }: ChartContainerProps) {
  return (
    <div className={clsx(styles.ChartContainer, className)} {...props}>
      {children}
    </div>
  )
}
