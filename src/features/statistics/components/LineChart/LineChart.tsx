import { ResponsiveContainer, LineChart as RechartsLineChart, XAxis, Tooltip, YAxis, Line } from 'recharts'
import { DataKey } from 'recharts/types/util/types'
import sharedStyles from '../shared.module.css'

interface LineChartProps<T> {
  data: T[]
  dataKey: keyof T
  labelKey: keyof T

  height: number
  color: string

  ticksAngle?: number
  shownTicks?: number[]
  tooltipValueFormatter?: (value: string) => string
}

export function LineChart<T>({ 
  data,
  dataKey,
  labelKey,
  height,
  color,
  ticksAngle,
  shownTicks,
  tooltipValueFormatter
}: LineChartProps<T>) {
  const xAxisTicks = shownTicks 
    ? data.map((data, index) => shownTicks.includes(index) ? data[labelKey] as string : '')
    : undefined

  return (
    <ResponsiveContainer 
      height={height}
    >
      <RechartsLineChart 
        data={data}
        margin={{ right: 30 }}
      >
        <XAxis 
          dataKey={labelKey as DataKey<T>} 
          ticks={xAxisTicks}
          angle={ticksAngle}
        />
        
        <YAxis width={40} />

        <Line 
          type='monotone' 
          dataKey={dataKey as DataKey<T>} 
          stroke={color} 
        />

        <Tooltip 
          wrapperClassName={sharedStyles.TooltipWrapper}
          formatter={tooltipValueFormatter}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
