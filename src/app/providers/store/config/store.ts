import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { userReducer } from '@/entities/User'
import { $api } from '@/shared/api/api'
import { createReducerManager } from './reducerManager'
import { StateSchema, StoreWithReducerManager, ThunkExtraArg } from './stateSchema'
import { rtkApi } from '@/shared/api/rtkApi'
import { commentsReducer } from '@/widgets/PostComments'

export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    [rtkApi.reducerPath]: rtkApi.reducer,
    postComments: commentsReducer,
    user: userReducer,
  }

  const reducerManager = createReducerManager(rootReducers)
  const extraArgs: ThunkExtraArg = {
    api: $api,
  }

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArgs,
        },
      }).concat(rtkApi.middleware),
  }) as StoreWithReducerManager

  store.reducerManager = reducerManager

  return store
}
