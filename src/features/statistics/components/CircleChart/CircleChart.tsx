import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { HorizontalAlignmentType, VerticalAlignmentType } from 'recharts/types/component/DefaultLegendContent'
import { chartDataEntryValueKey, colors } from '../../constants'
import { ChartDataEntry } from '../../types/chart-data-entry'
import { ChartSettings } from '../../types/chart-settings'
import { LayoutType } from 'recharts/types/util/types'
import { Tooltip } from '../Tooltip'

interface CircleChartProps<T extends ChartDataEntry> extends ChartSettings<T> {
  align?: HorizontalAlignmentType
  verticalAlign?: VerticalAlignmentType
  layout?: LayoutType
}

export function CircleChart<T extends ChartDataEntry>({ 
  data,
  height,
  
  formatTooltipValue = (value) => value,
  formatLegendLabel = (data: T) => data.label,
  
  align,
  verticalAlign,
  layout,
}: CircleChartProps<T>) {
  return (
    <ResponsiveContainer height={height}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={45}
          outerRadius={60}
          paddingAngle={10}
          dataKey={chartDataEntryValueKey}
          startAngle={90}
          endAngle={-270}
        >
          {data.map((_, index) => (
            <Cell 
              fill={colors[index % colors.length]} 
              style={{ outline: 'none' }}
              key={`cell-${index}`} 
            />
          ))}
        </Pie>

        <Tooltip formatter={formatTooltipValue} />
  
        <Legend 
          formatter={(_, __, index) => formatLegendLabel(data[index])}
          verticalAlign={verticalAlign}
          layout={layout}
          align={align} 
        />
      </PieChart>
    </ResponsiveContainer>
  )
}