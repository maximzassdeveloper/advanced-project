import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/store'

/* eslint-disable */
export const StoreDecorator =
  (
    state: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<Required<StateSchema>>>
  ) =>
  (StoryComponent: Story) =>
    (
      <StoreProvider
        initialState={state}
        asyncReducers={asyncReducers}
      >
        <StoryComponent />
      </StoreProvider>
    )
