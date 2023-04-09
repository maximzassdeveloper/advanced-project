import { useEffect } from 'react'
import { Reducer } from '@reduxjs/toolkit'
import { useStore } from 'react-redux'
import { StateSchemaKey, StoreWithReducerManager } from '@/app/providers/store'
import { useAppDispatch } from './useAppDispatch'

let reducerInited = false

export const useAsyncReducerLoader = (
  key: StateSchemaKey,
  reducer: Reducer,
  destroyAfterUnmount = true
) => {
  const store = useStore() as StoreWithReducerManager
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (destroyAfterUnmount || (!destroyAfterUnmount && !reducerInited)) {
      store.reducerManager.add(key, reducer)
      dispatch({ type: `@INIT ${key} reducer` })
      reducerInited = true
    }

    return () => {
      if (destroyAfterUnmount) {
        store.reducerManager.remove(key)
        dispatch({ type: `@DESTROY ${key} reducer` })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
