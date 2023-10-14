import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProfileSchema } from '../types/profile'
import { fetchProfile } from '../services/fetchProfile'
import { saveProfile } from '../services/saveProfile'

export const initialState: ProfileSchema = {
  data: undefined,
  isLoading: false,
  error: undefined,
  isReadonly: true,
}

export const profileSlice = createSlice({
  initialState,
  name: 'profile',
  reducers: {
    setIsReadonly: (state, action: PayloadAction<boolean>) => {
      state.isReadonly = action.payload
      state.error = undefined
    },
  },
  extraReducers: (builder) =>
    builder
      // fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // saveProfile
      .addCase(saveProfile.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isReadonly = true
        state.data = action.payload
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      }),
})

export const profileReducer = profileSlice.reducer
export const profileActions = profileSlice.actions
