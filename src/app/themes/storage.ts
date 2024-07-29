import { ThemeToken, userPreferenceToken } from './store'
import { LocalStorage } from '@oleksii-pavlov/storages'

export const themesLocalStorage = new LocalStorage<ThemeToken>('theme', userPreferenceToken)
