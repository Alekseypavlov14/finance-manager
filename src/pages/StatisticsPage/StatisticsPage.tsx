import { useCurrenciesBalanceChartData, CircleChart, useExpensesChartData, BarChart, getBalancedShownTicks, LineChart, useBalanceChartData } from '@/features/statistics'
import { roundAsMoney, useAccountTransactions } from '@/entities/transactions'
import { failureColor, successColor } from '@/app/themes'
import { NoTransactionsScreen } from '@/widgets/NoTransactionsScreen'
import { USD_CURRENCY_CODE } from '@/entities/rates'
import { StructureLayout } from '@/layouts/StructureLayout'
import { ProtectedRoute } from '@/app/auth'
import { LoaderScreen } from '@/widgets/LoaderScreen'
import { Container } from '@/shared/components/Container'
import { Headline } from '@/shared/components/Headline'
import { Page } from '@/shared/components/Page'
import styles from './StatisticsPage.module.css'

export function StatisticsPage() {
  const currenciesBalanceData = useCurrenciesBalanceChartData()
  const expensesData = useExpensesChartData()
  const balanceData = useBalanceChartData()

  const { transactions, isLoading } = useAccountTransactions()
  
  if (isLoading) return (
    <ProtectedRoute>
      <Page>
        <StructureLayout>
          <LoaderScreen />
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
    
  if (!isLoading && !transactions.length) return (
    <ProtectedRoute>
      <Page>
        <StructureLayout>
          <NoTransactionsScreen />
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )

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
                height={220}
                align='center'
                verticalAlign='bottom'
                layout='vertical'
                formatLegendLabel={data => data.label}
                formatTooltipValue={value => `${roundAsMoney(Number(value))} ${USD_CURRENCY_CODE}`}
              />
            </div>

            <div className={styles.StatisticsBlock}>
              <Headline level={4} className={styles.Headline}>
                Your expenses
              </Headline>
    
              <BarChart 
                data={expensesData} 
                dataKey='expenses'
                height={200}
                color={failureColor}
                formatTooltipValue={value => `${value} ${USD_CURRENCY_CODE}`}
                shownTicks={getBalancedShownTicks(expensesData.length, 3)}
              />
            </div>

            <div className={styles.StatisticsBlock}>
              <Headline level={4} className={styles.Headline}>
                Your balance
              </Headline>
    
              <LineChart 
                data={balanceData} 
                dataKey='balance'
                height={200}
                yAxisWidth={45}
                color={successColor}
                formatTooltipValue={value => `${value} ${USD_CURRENCY_CODE}`}
                shownTicks={getBalancedShownTicks(expensesData.length, 3)}
              />
            </div>
          </Container>
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
}