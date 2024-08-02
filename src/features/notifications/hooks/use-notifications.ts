import { MessageCreator } from '../types/message-creator'
import { App } from 'antd'

interface UseNotificationsResult {
  successMessage: MessageCreator
  warningMessage: MessageCreator
  errorMessage: MessageCreator
  infoMessage: MessageCreator
}

export function useNotifications(): UseNotificationsResult {
  const { message } = App.useApp()

  return ({
    successMessage: message.success,
    warningMessage: message.warning,
    errorMessage: message.error,
    infoMessage: message.info,
  })
}
