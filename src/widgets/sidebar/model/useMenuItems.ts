import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { routePaths } from '@/shared/config/routeConfig'
import { useAppSelector } from '@/shared/hooks'
import { getUserAuth } from '@/entities/User'

export interface MenuItem {
  name: string
  link: string
  icon: string
  authOnly?: boolean
}

export const useMenuItems = () => {
  const { t } = useTranslation(['common'])
  const user = useAppSelector(getUserAuth)

  const menuItems = useMemo(() => {
    const items: MenuItem[] = [
      {
        name: t('common:menu.home', 'Главная'),
        link: routePaths.home(),
        icon: 'ph ph-align-center-vertical',
      },
      {
        name: t('common:menu.about', 'О нас'),
        link: routePaths.about(),
        icon: 'ph ph-align-center-vertical',
      },
      {
        name: t('common.menu.articles', 'Статьи'),
        link: routePaths.articles(),
        icon: 'ph ph-align-center-vertical',
      },
    ]

    if (user) {
      items.push({
        name: t('common:menu.profile', 'Профиль'),
        link: routePaths.profile(user?.id ?? '0'),
        icon: 'ph ph-align-center-vertical',
        authOnly: true,
      })
    }

    return items
  }, [t, user])

  return menuItems
}
