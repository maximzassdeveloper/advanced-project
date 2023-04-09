import { createSlice } from '@reduxjs/toolkit'
import { login } from '../services/login'
import { LoginSchema } from '../types/loginSchema'

export const initialState: LoginSchema = {
  isLoading: false,
  error: undefined,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      }),
})

export const loginActions = loginSlice.actions
export const loginReducer = loginSlice.reducer
