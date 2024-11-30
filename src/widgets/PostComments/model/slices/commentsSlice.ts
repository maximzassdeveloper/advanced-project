import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Comment } from '../types/comment'
import { StateSchema } from '@/app/providers/store'
import { fakeComments } from '../../fakeData'

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
})

// const initialState = commentsAdapter.getInitialState()
const initialState = fakeComments

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<Comment>) {
      commentsAdapter.addOne(state, action.payload)

      if (action.payload.parentId !== undefined) {
        // Update parent comment
        const parentComment = state.entities[action.payload.parentId]
        if (!parentComment) return

        commentsAdapter.updateOne(state, {
          id: action.payload.parentId,
          changes: { childrenIds: [...(parentComment.childrenIds ?? []), action.payload.id] },
        })
      }
    },
    addReaction(state, action: PayloadAction<Pick<Comment, 'id' | 'karma'>>) {
      commentsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { karma: action.payload.karma },
      })
    },
  },
})

export const {
  selectAll: selectAllComments,
  selectEntities: selectCommentsEntities,
  selectById: selectCommentById,
  selectTotal: selectCommentsTotal,
} = commentsAdapter.getSelectors<StateSchema>((state) => state.postComments)

export const { addComment, addReaction } = commentsSlice.actions

export const commentsReducer = commentsSlice.reducer
