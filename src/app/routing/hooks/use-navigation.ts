import { useNavigate } from 'react-router-dom'
import { Id } from '@/shared/types/id'

export function useNavigation() {
  const navigate = useNavigate()
  
  return ({
    navigateLoginPage: () => navigate('/login'),
    navigateSignUpPage: () => navigate('/sign-up'),
    navigateHomePage: () => navigate('/'),
    navigateCreateTransactionPage: () => navigate('/transactions/create'),
    navigateEditTransactionPage: (id: Id) => navigate(`/transactions/edit/${id}`),
    navigateTransactionsPage: () => navigate('/transactions/list'),
    navigateStatisticsPage: () => navigate('/statistics'),
    navigateSettingsPage: () => navigate('/settings'),
  })
}
