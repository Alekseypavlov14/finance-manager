import { ComponentPropsWithoutRef } from 'react'
import styles from './Container.module.css'
import clsx from 'clsx'

interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  fullHeight?: boolean
}

export function Container({ className, fullHeight, ...props }: ContainerProps) {
  return (
    <div 
      className={clsx(styles.Container, fullHeight && styles.FullHeight, className)} 
      {...props} 
    />
  )
}