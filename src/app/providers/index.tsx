import { FC, ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './errorBoundary'
import { CommonProvider } from './common'
import { ThemeProvider } from './theme'
import { StoreProvider } from './store'

export const AllProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <StoreProvider>
          <CommonProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </CommonProvider>
        </StoreProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
