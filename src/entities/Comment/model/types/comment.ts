import { User } from '@/entities/User'

export interface Comment {
  id: string
  user: User
  text: string
  createdAt: string
  articleId: string
}
