import { ComponentPropsWithoutRef } from 'react'
import styles from './Container.module.css'
import clsx from 'clsx'

interface ContainerProps extends ComponentPropsWithoutRef<'div'> {}

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div 
      className={clsx(styles.Container, className)} 
      {...props} 
    />
  )
}