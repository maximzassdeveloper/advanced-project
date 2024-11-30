import type { EntityState } from '@reduxjs/toolkit'
import type { Comment } from './comment'

export interface CommentsSchema extends EntityState<Comment> {}
