import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Comment } from '@/entities/Comment'
import { fetchComments } from '../services/fetchComments'
import { CommentsSchema } from '../types/commentsSchema'
import { addComment } from '../services/addComment'
import { StateSchema } from '@/app/providers/store'

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
})

const initialState = commentsAdapter.getInitialState<CommentsSchema>({
  isLoading: false,
  error: undefined,
  isLoadingAddComment: false,
  errorAddComment: undefined,
  entities: {},
  ids: [],
})

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // fetchComments
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false
        commentsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // addComment
      .addCase(addComment.pending, (state) => {
        state.isLoadingAddComment = true
        state.errorAddComment = undefined
      })
      .addCase(addComment.fulfilled, (state) => {
        state.isLoadingAddComment = false
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoadingAddComment = false
        state.errorAddComment = action.payload
      }),
})

export const commentsSelectors = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.comments ?? commentsAdapter.getInitialState()
)
export const commentsReducer = commentsSlice.reducer
