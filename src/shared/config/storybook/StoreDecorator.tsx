import { Decorator } from '@storybook/react'
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import { StateSchema, StoreProvider } from '@/app/providers/store'

type Dec = (
  ...args: Parameters<Decorator>
) => (
  state: DeepPartial<StateSchema>,
  asyncReducers: DeepPartial<ReducersMapObject<Required<StateSchema>>>
) => ReturnType<Decorator>

export const StoreDecorator: Dec = (Story) => {
  return (state, asyncReducers) => {
    return (
      <StoreProvider initialState={state} asyncReducers={asyncReducers}>
        <Story />
      </StoreProvider>
    )
  }
}
