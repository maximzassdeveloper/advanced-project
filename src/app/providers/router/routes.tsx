import { RouteProps } from 'react-router-dom'
import { AboutPage } from '@/pages/AboutPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { routePaths } from '@/shared/config/routeConfig'

export const routes: RouteProps[] = [
  {
    path: routePaths.home,
    element: <HomePage />,
  },
  {
    path: routePaths.about,
    element: <AboutPage />,
  },
  {
    path: routePaths.notFound,
    element: <NotFoundPage />,
  },
]
