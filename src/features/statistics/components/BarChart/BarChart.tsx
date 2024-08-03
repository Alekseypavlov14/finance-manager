import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { DataKey } from 'recharts/types/util/types'

interface BarChartProps<T> {
  data: T[]
  dataKey: keyof T,
  labelKey: keyof T,

  width: number
  height: number
  color: string

  legendHeight?: number

  ticksAngle?: number

  tooltipValueFormatter?: (value: string) => string
}

export function BarChart<T>({
  data,
  dataKey,
  labelKey,
  width,
  height,
  color,
  legendHeight = 0,
  ticksAngle,
  tooltipValueFormatter,
}: BarChartProps<T>) {
  return (
    <ResponsiveContainer height={height + legendHeight}>
      <RechartsBarChart 
        data={data}
        width={width} 
        height={height + legendHeight}
      >
        <XAxis 
          dataKey={labelKey as DataKey<T>} 
          height={legendHeight}
          angle={ticksAngle}
        />
  
        <Bar 
          dataKey={dataKey as DataKey<T>} 
          fill={color}
        />
  
        <Tooltip formatter={tooltipValueFormatter}/>
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}