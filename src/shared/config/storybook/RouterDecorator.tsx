import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const RouterDecorator = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)
