import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { DataKey } from 'recharts/types/util/types'
import styles from './BarChart.module.css'

interface BarChartProps<T> {
  data: T[]
  dataKey: keyof T,
  labelKey: keyof T,

  height: number
  color: string

  legendHeight?: number
  ticksAngle?: number
  shownTicks?: number[]

  tooltipValueFormatter?: (value: string) => string
}

export function BarChart<T>({
  data,
  dataKey,
  labelKey,

  height,
  color,

  legendHeight = 0,
  ticksAngle,
  shownTicks,

  tooltipValueFormatter,
}: BarChartProps<T>) {
  const xAxisTicks = shownTicks 
    ? data.map((data, index) => shownTicks.includes(index) ? data[labelKey] as string : '')
    : undefined

  return (
    <ResponsiveContainer height={height + legendHeight}>
      <RechartsBarChart 
        data={data}
        height={height + legendHeight}
      >
        <XAxis 
          dataKey={labelKey as DataKey<T>} 
          height={legendHeight}
          angle={ticksAngle}
          ticks={xAxisTicks}
        />
  
        <Bar 
          dataKey={dataKey as DataKey<T>} 
          fill={color}
        />
  
        <Tooltip 
          formatter={tooltipValueFormatter}
          wrapperClassName={styles.TooltipWrapper}
          cursor={{ opacity: '0.4' }}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}