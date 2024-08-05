import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { chartDataEntryLabelKey, chartDataEntryValueKey, chartVerticalMargin } from '../../constants'
import { ChartDataEntry } from '../../types/chart-data-entry'
import { ChartSettings } from '../../types/chart-settings'
import sharedStyles from '../shared.module.css'

interface BarChartProps<T extends ChartDataEntry> extends ChartSettings<T> {}

export function BarChart<T extends ChartDataEntry>({
  data,

  height,
  color,

  ticksAngle,
  shownTicks = new Array(data.length).fill(0).map((_, index) => index),
  formatLabel = (data) => data.label,
  formatTooltipValue = (value) => value,
}: BarChartProps<T>) {
  const xAxisTicks = data.map((data, index) => shownTicks.includes(index) ? formatLabel(data) : '')

  return (
    <ResponsiveContainer height={height}>
      <RechartsBarChart 
        data={data}
        margin={{ 
          top: chartVerticalMargin,
          bottom: chartVerticalMargin
        }}
      >
        <XAxis 
          dataKey={chartDataEntryLabelKey} 
          angle={ticksAngle}
          ticks={xAxisTicks}
        />
  
        <Bar 
          dataKey={chartDataEntryValueKey} 
          fill={color}
        />
  
        <Tooltip 
          formatter={formatTooltipValue}
          wrapperClassName={sharedStyles.TooltipWrapper}
          cursor={{ opacity: '0.4' }}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}