import { FC } from 'react'
import { CommonProvider } from './common/CommonProvider'
import { ThemeProvider } from './theme'
import { BrowserRouter } from 'react-router-dom'

export const AllProviders: FC = ({ children }) => {
  return (
    <BrowserRouter>
      <CommonProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </CommonProvider>
    </BrowserRouter>
  )
}
