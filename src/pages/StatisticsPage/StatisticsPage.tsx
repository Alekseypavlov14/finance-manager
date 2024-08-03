import { useCurrenciesBalanceChartData, CircleChart, useExpensesChartData, BarChart } from '@/features/statistics'
import { USD_CURRENCY_CODE } from '@/entities/rates'
import { StructureLayout } from '@/layouts/StructureLayout'
import { ProtectedRoute } from '@/app/auth'
import { Container } from '@/shared/components/Container'
import { Headline } from '@/shared/components/Headline'
import { Page } from '@/shared/components/Page'
import styles from './StatisticsPage.module.css'

export function StatisticsPage() {
  const currenciesBalanceData = useCurrenciesBalanceChartData()
  const expensesData = useExpensesChartData()

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
                width={220}
                height={130}
                data={currenciesBalanceData} 
                dataKey='amountInUSD' 
                align='right'
                verticalAlign='middle'
                layout='vertical'
                formatLabel={(entry) => entry.currency}
              />
            </div>

            <div className={styles.StatisticsBlock}>
              <Headline level={4} className={styles.Headline}>
                Your expenses
              </Headline>
    
              <BarChart 
                data={expensesData} 
                dataKey='amount' 
                labelKey='date'
                width={300}
                height={200}
                color='#E72929'
                legendHeight={20}
                tooltipValueFormatter={value => `${value} ${USD_CURRENCY_CODE}`}
              />
            </div>
          </Container>
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
}