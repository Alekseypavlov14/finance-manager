import { createStore } from '@oleksii-pavlov/desirable/react'

interface AuthState {
  email: string
  password: string
}

const initialState: AuthState = {
  email: '',
  password: '',
}

export const authStore = createStore(initialState, (state) => ({
  updateEmail: (email: string) => state.email = email,
  updatePassword: (password: string) => state.password = password,
}))

export const { updateEmail, updatePassword } = authStore.reducers
export const useAuthStore = authStore.useSelector