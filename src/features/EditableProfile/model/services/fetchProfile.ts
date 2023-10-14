import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/store'
import { isAxiosError } from '@/shared/api/apiError'
import { Profile, ProfileError } from '../types/profile'

export const fetchProfile = createAsyncThunk<Profile, number, ThunkConfig<any>>(
  'profile/fetchData',
  async (profileId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
      const response = await extra.api.get<Profile>(`/profile/${profileId}`)

      if (!response.data) {
        return rejectWithValue(ProfileError.SERVER)
      }

      return response.data
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.response?.status === 404) {
          return rejectWithValue(ProfileError.NOT_FOUND)
        }
      }
      return rejectWithValue(ProfileError.ON_GET)
    }
  }
)
