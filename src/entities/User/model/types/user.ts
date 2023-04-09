export interface User {
  id: number
  username: string
}

export interface UserSchema {
  auth?: User
  isLoading: boolean
  error?: string
}
