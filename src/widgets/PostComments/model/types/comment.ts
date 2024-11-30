export interface User {
  username: string
  fullName?: string
  description?: string
  postsCount?: number
  karma: number
  avatar: string
}

export type CommentId = string

export interface Comment {
  id: CommentId
  user: User
  createdAt: string
  content: string
  karma: number
  childrenIds?: CommentId[]
  parentId?: CommentId
  votes: {
    upVoted: boolean
    downVoted: boolean
  }
}
