import { useNavigate } from 'react-router-dom'

export function useNavigation() {
  const navigate = useNavigate()
  
  return ({
    navigateLoginPage: () => navigate('/login'),
    navigateSignUpPage: () => navigate('/sign-up'),
    navigateHomePage: () => navigate('/'),
    navigateTransactionsPage: () => navigate('/transactions'),
    navigateStatisticsPage: () => navigate('/statistics'),
    navigateSettingsPage: () => navigate('/settings'),
  })
}
