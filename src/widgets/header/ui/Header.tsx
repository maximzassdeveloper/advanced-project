import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LangSwitcher, SidebarSwitcher, ThemeSwitcher } from '@/features/switchers'
import { AppLink } from '@/shared/ui'
import s from './header.module.scss'

export const Header: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={s.header}>
      <SidebarSwitcher />
      <div className={s.links}>
        <AppLink to={'/'}>{t('header.links.home', 'Главная')}</AppLink>
        <AppLink to={'/about'}>{t('header.links.about', 'О нас')}</AppLink>
      </div>
      <LangSwitcher />
      <ThemeSwitcher />
    </div>
  )
}
