export enum AppRoutes {
  HOME = 'home',
  ABOUT = 'about',
  PROFILE = 'profile',
  NOUT_FOUND = 'notFound',
  // last
  OTHER = 'other',
}

export const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile/', // + :id
  [AppRoutes.NOUT_FOUND]: '/not-found',
  [AppRoutes.OTHER]: '*',
}

