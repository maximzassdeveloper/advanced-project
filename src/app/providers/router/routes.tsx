import { RouteProps } from 'react-router-dom'
import { AppRoutes, routePaths } from '@/shared/config/routeConfig'
import { AboutPage } from '@/pages/AboutPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage'

const routesObject: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: routePaths.home(),
    element: <HomePage />,
  },
  [AppRoutes.ABOUT]: {
    path: routePaths.about(),
    element: <AboutPage />,
  },
  [AppRoutes.PROFILE]: {
    path: routePaths.profile(':id'),
    element: <ProfilePage />,
  },
  [AppRoutes.ARTICLES]: {
    path: routePaths.articles(),
    element: <ArticlesPage />,
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    path: routePaths.articleDetails(':id'),
    element: <ArticleDetailsPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: routePaths.notFound(),
    element: <NotFoundPage />,
  },
  [AppRoutes.OTHER]: {
    path: routePaths.other(),
    element: <NotFoundPage />,
  },
}

export const routes: RouteProps[] = Object.entries(routesObject).map(([key, val]) => ({
  id: key,
  ...val,
}))

