import { useCurrenciesBalanceChartData, CircleChart, useExpensesChartData, BarChart, formatCurrenciesBalanceLabel, getBalancedShownTicks, LineChart, useBalanceChartData } from '@/features/statistics'
import { USD_CURRENCY_CODE } from '@/entities/rates'
import { StructureLayout } from '@/layouts/StructureLayout'
import { ProtectedRoute } from '@/app/auth'
import { failureColor, successColor } from '@/app/themes'
import { Container } from '@/shared/components/Container'
import { Headline } from '@/shared/components/Headline'
import { Page } from '@/shared/components/Page'
import styles from './StatisticsPage.module.css'

export function StatisticsPage() {
  const currenciesBalanceData = useCurrenciesBalanceChartData()
  const expensesData = useExpensesChartData()
  const balanceData = useBalanceChartData()

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
                height={200}
                color={failureColor}
                legendHeight={20}
                tooltipValueFormatter={value => `${value} ${USD_CURRENCY_CODE}`}
                shownTicks={getBalancedShownTicks(expensesData.length, 3)}
              />
            </div>

            <div className={styles.StatisticsBlock}>
              <Headline level={4} className={styles.Headline}>
                Your balance
              </Headline>
    
              <LineChart 
                data={balanceData} 
                dataKey='amount' 
                labelKey='date'
                height={200}
                color={successColor}
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