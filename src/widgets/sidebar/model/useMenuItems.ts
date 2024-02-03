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
        icon: 'ph ph-house',
      },
      {
        name: t('common:menu.about', 'О нас'),
        link: routePaths.about(),
        icon: 'ph ph-globe-simple',
      },
      {
        name: t('common.menu.articles', 'Статьи'),
        link: routePaths.articles(),
        icon: 'ph ph-article',
      },
    ]

    if (user) {
      items.push({
        name: t('common:menu.profile', 'Профиль'),
        link: routePaths.profile(user?.id ?? '0'),
        icon: 'ph ph-user',
        authOnly: true,
      })
    }

    return items
  }, [t, user])

  return menuItems
}
