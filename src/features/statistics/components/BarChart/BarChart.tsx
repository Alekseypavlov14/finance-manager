import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, Tooltip } from 'recharts'
import { chartDataEntryLabelKey, chartDataEntryValueKey, chartVerticalMargin } from '../../constants'
import { ChartDataEntry } from '../../types/chart-data-entry'
import { ChartSettings } from '../../types/chart-settings'
import { DataKey } from 'recharts/types/util/types'
import sharedStyles from '../shared-styles.module.css'

interface BarChartProps<T extends ChartDataEntry> extends ChartSettings<T> {}

export function BarChart<T extends ChartDataEntry>({
  data,

  dataKey = chartDataEntryValueKey,
  labelKey = chartDataEntryLabelKey,

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
          dataKey={labelKey as DataKey<T>} 
          angle={ticksAngle}
          ticks={xAxisTicks}
        />
  
        <Bar 
          dataKey={dataKey as DataKey<T>} 
          fill={color}
        />
  
        <Tooltip
          wrapperClassName={sharedStyles.Tooltip}
          formatter={formatTooltipValue}
          cursor={{ opacity: '0.4' }}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}