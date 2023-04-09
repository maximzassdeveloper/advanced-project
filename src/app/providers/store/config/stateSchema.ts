import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
  ThunkDispatch,
} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { UserSchema } from '@/entities/User'
import { LoginSchema } from '@/features/Auth'
import { StateSchemaKey } from './reducerManager'

export interface StateSchema {
  user: UserSchema
  login?: LoginSchema
}

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: Reducer<CombinedState<StateSchema>>
  add: (key: StateSchemaKey, reducer: Reducer<StateSchema>) => void
  remove: (key: StateSchemaKey) => void
}

export interface StoreWithReducerManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
}

export type AppDispatch = ThunkDispatch<CombinedState<StateSchema>, ThunkExtraArg, AnyAction>

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  dispatch: AppDispatch
}
