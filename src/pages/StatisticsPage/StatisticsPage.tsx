import { useCurrenciesBalanceChartData, CircleChart } from '@/features/statistics'
import { StructureLayout } from '@/layouts/StructureLayout'
import { ProtectedRoute } from '@/app/auth'
import { Container } from '@/shared/components/Container'
import { Headline } from '@/shared/components/Headline'
import { Page } from '@/shared/components/Page'
import styles from './StatisticsPage.module.css'

export function StatisticsPage() {
  const data = useCurrenciesBalanceChartData()

  return (
    <ProtectedRoute>
      <Page>
        <StructureLayout>
          <Container className={styles.Container}>
            <div className={styles.StatisticsBlock}>
              <Headline level={4} className={styles.Headline}>
                Currencies on your account
              </Headline>
    
              <CircleChart 
                data={data} 
                dataKey='amountInUSD' 
    
                width={210}
                height={130}
                cx={60}
                cy={60}
                
                align='right'
                verticalAlign='middle'
                layout='vertical'
    
                formatLabel={(_, __, index) => data[index].currency}
              />
            </div>
          </Container>
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
}