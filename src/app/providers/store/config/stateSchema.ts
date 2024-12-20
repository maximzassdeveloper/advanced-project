import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
  ThunkDispatch,
} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { StateSchemaKey } from './reducerManager'
import { rtkApi } from '@/shared/api/rtkApi'
import { UserSchema } from '@/entities/User'
import { LoginSchema } from '@/features/Auth'
import { ProfileSchema } from '@/features/EditableProfile'
import { CommentsSchema as ArticleCommentsSchema } from '@/features/ArticleComments'
import { ArticlesSchema } from '@/pages/ArticlesPage/model/types/articlesSchema'
import { CommentsSchema } from '@/widgets/PostComments'

export interface StateSchema {
  user: UserSchema
  postComments: CommentsSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

  // async reducers
  login?: LoginSchema
  profile?: ProfileSchema
  comments?: ArticleCommentsSchema
  articles?: ArticlesSchema
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
  state: StateSchema
}
