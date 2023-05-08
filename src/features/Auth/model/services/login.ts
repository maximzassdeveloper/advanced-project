import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/store'
import { User, userActions } from '@/entities/User'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { LoginError } from '../types/loginSchema'
import { isAxiosError } from '@/shared/api/apiError'

interface LoginProps {
  username: string
  password: string
}

export const login = createAsyncThunk<User, LoginProps, ThunkConfig<string>>(
  'user/login',
  async (loginData, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.post<User>('/login', loginData)

      if (!response.data) {
        return thunkAPI.rejectWithValue(LoginError.SERVER)
      }

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
      thunkAPI.dispatch(userActions.setAuth(response.data))

      return response.data
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.response?.status === 403) {
          return thunkAPI.rejectWithValue(LoginError.INCORRECT)
        } else {
          return thunkAPI.rejectWithValue(LoginError.SERVER)
        }
      }
      return thunkAPI.rejectWithValue(LoginError.UNKNOWN)
    }
  }
)
