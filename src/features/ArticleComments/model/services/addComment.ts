import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/store'
import { Comment } from '@/entities/Comment'
import { STANDART_API_ERRORS } from '@/shared/api/apiError'
import { fetchComments } from './fetchComments'

type AddCommentProps = Pick<Comment, 'text' | 'articleId'>

export const addComment = createAsyncThunk<Comment, AddCommentProps, ThunkConfig<string>>(
  'comments/addComment',
  async (comment, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().user.auth?.id

      if (userId === undefined) {
        return thunkAPI.rejectWithValue(STANDART_API_ERRORS.INCORRECT)
      }

      const response = await thunkAPI.extra.api.post<Comment>('/comments', {
        ...comment,
        userId,
      })

      thunkAPI.dispatch(fetchComments(comment.articleId))

      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue(STANDART_API_ERRORS.UNKNOWN)
    }
  }
)
