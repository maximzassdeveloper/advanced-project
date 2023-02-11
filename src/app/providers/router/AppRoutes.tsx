import { FC, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Spinner } from '@/shared/ui/Spinner/Spinner'
import { routes } from './routes'

export const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<Spinner fullPage />}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </Suspense>
  )
}
