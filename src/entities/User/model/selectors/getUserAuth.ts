import { StateSchema } from '@/app/providers/store'

export const getUserAuth = (state: StateSchema) => state.user.auth
