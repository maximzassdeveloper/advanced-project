import { StateSchema } from '@/app/providers/store'

export const getProfileIsReadonly = (state: StateSchema) => state.profile?.isReadonly ?? true
