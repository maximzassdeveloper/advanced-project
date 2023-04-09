import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { userReducer } from '@/entities/User'
import { $api } from '@/shared/api/api'
import { createReducerManager } from './reducerManager'
import { StateSchema, StoreWithReducerManager, ThunkExtraArg } from './stateSchema'

export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
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
      }),
  }) as StoreWithReducerManager

  store.reducerManager = reducerManager

  return store
}
