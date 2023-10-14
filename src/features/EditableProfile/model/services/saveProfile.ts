import { createAsyncThunk } from '@reduxjs/toolkit'
import { Profile, ProfileError } from '../types/profile'
import { ThunkConfig } from '@/app/providers/store'

export const saveProfile = createAsyncThunk<Profile, Profile, ThunkConfig<string>>(
  'profile/saveProfile',
  async (values, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
      const response = await extra.api.put(`/profile/${values.id}`, values)

      if (!response.data) {
        return rejectWithValue(ProfileError.SERVER)
      }

      return response.data
    } catch (e) {
      return rejectWithValue(ProfileError.ON_SAVE)
    }
  }
)
