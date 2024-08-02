import { message } from 'antd'
import { MessageCreator } from '../types/message-creator'
import { ReactElement } from 'react'

interface UseNotificationsResult {
  context: ReactElement
  successMessage: MessageCreator
  warningMessage: MessageCreator
  errorMessage: MessageCreator
  infoMessage: MessageCreator
}

export function useNotifications(): UseNotificationsResult {
  const [messageApi, context] = message.useMessage()

  return ({
    context,
    successMessage: messageApi.success,
    warningMessage: messageApi.warning,
    errorMessage: messageApi.error,
    infoMessage: messageApi.info,
  })
}
