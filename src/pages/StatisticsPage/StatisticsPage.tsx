import { useCurrenciesBalanceChartData, CircleChart, useExpensesChartData, BarChart, formatCurrenciesBalanceLabel, getBalancedShownTicks } from '@/features/statistics'
import { USD_CURRENCY_CODE } from '@/entities/rates'
import { StructureLayout } from '@/layouts/StructureLayout'
import { ProtectedRoute } from '@/app/auth'
import { failureColor } from '@/app/themes'
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
                data={currenciesBalanceData} 
                dataKey='amountInUSD' 
                height={220}
                align='center'
                verticalAlign='bottom'
                layout='horizontal'
                formatLabel={formatCurrenciesBalanceLabel}
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
                color={failureColor}
                legendHeight={20}
                tooltipValueFormatter={value => `${value} ${USD_CURRENCY_CODE}`}
                shownTicks={getBalancedShownTicks(expensesData.length, 3)}
              />
            </div>
          </Container>
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
}