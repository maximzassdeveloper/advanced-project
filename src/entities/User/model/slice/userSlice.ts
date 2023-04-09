import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { User, UserSchema } from '../types/user'

const initialState = {} as UserSchema

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<User>) {
      state.auth = action.payload
    },
    initAuth(state) {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      if (user) {
        state.auth = JSON.parse(user)
      }
    },
    logout(state) {
      state.auth = undefined
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    },
  },
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
