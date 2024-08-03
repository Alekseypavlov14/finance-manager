import { useCurrenciesBalanceChartData, CircleChart } from '@/features/statistics'
import { StructureLayout } from '@/layouts/StructureLayout'
import { ProtectedRoute } from '@/app/auth'
import { Page } from '@/shared/components/Page'
import styles from './StatisticsPage.module.css'

export function StatisticsPage() {
  const data = useCurrenciesBalanceChartData()

  return (
    <ProtectedRoute>
      <Page className={styles.StatisticsPage}>
        <StructureLayout>
          <CircleChart 
            data={data} 
            dataKey='amountInUSD' 

            width={220}
            height={140}
            cx={70}
            cy={70}
            
            align='right'
            verticalAlign='middle'
            layout='vertical'

            formatLabel={(_, __, index) => data[index].currency}
          />
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
}