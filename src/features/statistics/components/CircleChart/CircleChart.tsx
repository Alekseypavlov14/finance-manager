import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { HorizontalAlignmentType, VerticalAlignmentType } from 'recharts/types/component/DefaultLegendContent'
import { DataKey, LayoutType } from 'recharts/types/util/types'
import { ReactNode } from 'react'
import { colors } from '../../constants'

interface CircleChartProps<T> {
  data: T[]
  dataKey: keyof T
  height: number
  align?: HorizontalAlignmentType
  verticalAlign?: VerticalAlignmentType
  layout?: LayoutType
  formatLabel?: (entry: T, index: number) => ReactNode
}

export function CircleChart<T>({ 
  data, 
  dataKey,
  height,
  align,
  verticalAlign,
  layout,
  formatLabel = (_: T, index: number) => index,
}: CircleChartProps<T>) {
  return (
    <ResponsiveContainer height={height}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={45}
          outerRadius={60}
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
          formatter={(_, __, index) => formatLabel(data[index], index)}
          layout={layout}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}