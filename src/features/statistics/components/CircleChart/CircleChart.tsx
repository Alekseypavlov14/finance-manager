import { Formatter, HorizontalAlignmentType, VerticalAlignmentType } from 'recharts/types/component/DefaultLegendContent'
import { Cell, Legend, Pie, PieChart } from 'recharts'
import { DataKey, LayoutType } from 'recharts/types/util/types'
import { colors } from '../../constants'

interface CircleChartProps<T> {
  data: T[]
  dataKey: keyof T
  cx?: number
  cy?: number
  width?: number
  height?: number
  align?: HorizontalAlignmentType
  verticalAlign?: VerticalAlignmentType
  layout?: LayoutType
  formatLabel?: Formatter
}

export function CircleChart<T>({ 
  data, 
  dataKey,
  cx = 75,
  cy = 75,
  width = 150,
  height = 150, 
  align,
  verticalAlign,
  layout,
  formatLabel,
}: CircleChartProps<T>) {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={45}
        outerRadius={60}
        fill="#8884d8"
        paddingAngle={10}
        dataKey={dataKey as DataKey<T>}
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

      <Legend 
        align={align} 
        verticalAlign={verticalAlign}
        formatter={formatLabel}
        layout={layout}
      />
    </PieChart>
  )
}