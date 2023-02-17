import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './errorBoundary'
import { CommonProvider } from './common'
import { ThemeProvider } from './theme'

export const AllProviders: FC = ({ children }) => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CommonProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </CommonProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
