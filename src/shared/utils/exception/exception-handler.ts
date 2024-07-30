import { createErrorHandler } from '@oleksii-pavlov/error-handling'
import { HTTPException } from './http-exception'

export const handleHTTPException = createErrorHandler<HTTPException, number>(exception => exception.code)
