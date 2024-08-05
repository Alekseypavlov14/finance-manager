import { ChartDataEntry } from './chart-data-entry'
import { ReactNode } from 'react'

export interface ChartSettings<T extends ChartDataEntry> {
  data: T[]

  height: number
  color?: string
  yAxisWidth?: number

  ticksAngle?: number
  shownTicks?: number[]
  formatLabel?: (entry: T) => string
  formatTooltipValue?: (value: string) => ReactNode
  formatLegendLabel?: (entry: T) => string
}