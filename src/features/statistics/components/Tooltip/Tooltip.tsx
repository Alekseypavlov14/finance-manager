import { Tooltip as RechartsTooltip, TooltipProps as RechartsTooltipProps } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import styles from './Tooltip.module.css'

interface TooltipProps<V extends ValueType, N extends NameType> extends RechartsTooltipProps<V, N> {}

export function Tooltip<V extends ValueType, N extends NameType>({ 
  cursor,
  ...props 
}: TooltipProps<V, N>) {
  return (
    <RechartsTooltip 
      wrapperClassName={styles.Tooltip}
      {...props} 
    />
  )
}
