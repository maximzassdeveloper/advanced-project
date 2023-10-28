export interface User {
  id: string
  username: string
  avatar?: string
}

export interface UserSchema {
  auth?: User
  isLoading: boolean
  error?: string
}
