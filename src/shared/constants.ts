export const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24
export const MINUTE_IN_MILLISECONDS = 1000 * 60
export const DAYS_PER_WEEK = 7
export const MONTHS_PER_YEAR = 12

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const PASSWORD_MIN_LENGTH = 6
export const PASSWORD_MAX_LENGTH = 18

export const AUTH_VALIDATION_CACHE_TIMEOUT = 5 * MINUTE_IN_MILLISECONDS

export const CURRENCIES_CACHE_TIMEOUT = 5 * MINUTE_IN_MILLISECONDS

export const TEXT_SHORTENER_MIN_LENGTH = 100

export const RATES_CACHE_TIMEOUT = DAYS_PER_WEEK * DAY_IN_MILLISECONDS

export const AUTH_VALIDATION_CACHE_KEY = 'auth-validation'

export const CURRENCIES_STORAGE_KEY = 'currencies'
