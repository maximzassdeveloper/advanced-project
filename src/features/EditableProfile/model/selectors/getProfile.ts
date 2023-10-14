import { StateSchema } from '@/app/providers/store'
import { initialState } from '../slice/profileSlice'

export const getProfile = (state: StateSchema) => state.profile ?? initialState
