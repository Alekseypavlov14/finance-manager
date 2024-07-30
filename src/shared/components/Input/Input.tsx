import { Input as AntdInput, InputProps as AntdInputProps } from 'antd'
import styles from './Input.module.css'
import clsx from 'clsx'

interface InputProps extends AntdInputProps {
  className?: string
}

export function Input({ className, ...props }: InputProps) {
  const classNames = clsx(styles.Input, className)

  return (
    <AntdInput className={classNames} {...props} />
  )
}
