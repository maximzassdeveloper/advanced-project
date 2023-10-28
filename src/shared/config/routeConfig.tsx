export enum AppRoutes {
  HOME = 'home',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'articleDetails',
  NOT_FOUND = 'notFound',
  // last
  OTHER = 'other',
}

const routePathsWithIncorrectKeys = {
  [AppRoutes.HOME]: () => '/',
  [AppRoutes.ABOUT]: () => '/about',
  [AppRoutes.PROFILE]: (id: string) => `/profile/${id}`,
  [AppRoutes.ARTICLES]: () => '/articles',
  [AppRoutes.ARTICLE_DETAILS]: (id: string) => `/articles/${id}`,
  [AppRoutes.NOT_FOUND]: () => '/not-found',
  [AppRoutes.OTHER]: () => '*',
} satisfies Record<AppRoutes, (...args: any[]) => string>

type RoutePaths = {
  [key in AppRoutes]: (typeof routePathsWithIncorrectKeys)[key]
}

export const routePaths = routePathsWithIncorrectKeys as RoutePaths

