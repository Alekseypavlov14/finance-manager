import { ResponsiveContainer, LineChart as RechartsLineChart, XAxis, Tooltip, YAxis, Line } from 'recharts'
import { chartDataEntryLabelKey, chartDataEntryValueKey, chartVerticalMargin } from '../../constants'
import { ChartDataEntry } from '../../types/chart-data-entry'
import { ChartSettings } from '../../types/chart-settings'
import sharedStyles from '../shared.module.css'

interface LineChartProps<T extends ChartDataEntry> extends ChartSettings<T> {}

export function LineChart<T extends ChartDataEntry>({ 
  data,

  height,
  color,
  yAxisWidth,

  ticksAngle,
  shownTicks = new Array(data.length).fill(0).map((_, index) => index),
  formatLabel = (data) => data.label,
  formatTooltipValue = (value) => value,
}: LineChartProps<T>) {
  const xAxisTicks = data.map((data, index) => shownTicks.includes(index) ? formatLabel(data) : '')

  return (
    <ResponsiveContainer 
      height={height}
    >
      <RechartsLineChart 
        data={data}
        margin={{ 
          right: yAxisWidth,
          top: chartVerticalMargin,
          bottom: chartVerticalMargin,
        }}
      >
        <XAxis 
          dataKey={chartDataEntryLabelKey}
          ticks={xAxisTicks}
          angle={ticksAngle}
        />
        
        <YAxis width={yAxisWidth} />

        <Line 
          type='monotone' 
          dataKey={chartDataEntryValueKey}
          stroke={color} 
        />

        <Tooltip 
          wrapperClassName={sharedStyles.TooltipWrapper}
          formatter={formatTooltipValue}
          cursor={{ opacity: 0.4 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
