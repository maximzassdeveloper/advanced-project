import { StateSchema } from '@/app/providers/store'
import { initialState } from '../slices/loginSlice'

export const getLogin = (state: StateSchema) => state.login ?? initialState
