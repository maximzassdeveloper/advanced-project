import { ReactNode } from 'react'
import '@/app/styles/index.scss'
import '@/app/styles/storybook.scss'

export const StyleDecorator = ({ children }: { children: ReactNode }) => (
  <div className='app'>{children}</div>
)
