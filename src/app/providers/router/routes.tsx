import { RouteProps } from 'react-router-dom'
import { AboutPage } from '@/pages/AboutPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { routePaths } from '@/shared/config/routeConfig'
import { ProfilePage } from '@/pages/ProfilePage'

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
    path: `${routePaths.profile}:id`,
    element: <ProfilePage />,
  },
  {
    path: routePaths.notFound,
    element: <NotFoundPage />,
  },
  {
    path: routePaths.other,
    element: <NotFoundPage />,
  },
]

