import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/store'
import { Comment } from '@/entities/Comment'
import { STANDART_API_ERRORS } from '@/shared/api/apiError'

export const fetchComments = createAsyncThunk<Comment[], string, ThunkConfig<string>>(
  'comments/getComments',
  async (articleId, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.get<Comment[]>('/comments', {
        params: {
          articleId,
          _expand: 'user',
          _sort: 'createdAt',
          _order: 'asc',
        },
      })
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue(STANDART_API_ERRORS.UNKNOWN)
    }
  }
)
