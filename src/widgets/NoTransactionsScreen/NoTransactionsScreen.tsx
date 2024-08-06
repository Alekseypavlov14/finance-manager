import { useNavigation } from '@/app/routing'
import { Headline } from '@/shared/components/Headline'
import { Center } from '@/shared/components/Center'
import { Button } from 'antd'
import styles from './NoTransactionsScreen.module.css'

export function NoTransactionsScreen() {
  const { navigateCreateTransactionPage } = useNavigation()

  return (
    <Center className={styles.NoTransactionsScreen}>
      <Headline 
        className={styles.NoTransactionsScreenLabel}
        level={5}
      >
        You made no transactions 
        
        <br />

        <Button
          className={styles.NoTransactionsScreenLink}
          onClick={navigateCreateTransactionPage}
          type='link'
        >
          Create your first one
        </Button>
      </Headline>
    </Center>
  )
}