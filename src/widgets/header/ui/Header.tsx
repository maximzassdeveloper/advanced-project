import { FC } from 'react'
import { SidebarSwitcher, ThemeSwitcher } from '@/features/switchers'
import { AppLink } from '@/shared/ui'
import s from './header.module.scss'

export const Header: FC = () => {
  return (
    <div className={s.header}>
      <SidebarSwitcher />
      <div className={s.links}>
        <AppLink to={'/'}>Home</AppLink>
        <AppLink to={'/about'}>about</AppLink>
      </div>
      <ThemeSwitcher />
    </div>
  )
}
