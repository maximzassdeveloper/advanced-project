import { FC } from 'react'
import { AppLink } from '@/shared/ui'
import { MenuItem } from '../../model/menuItems'
import s from './sidebar-item.module.scss'

interface SidebarItemProps {
  item: MenuItem
}

export const SidebarItem: FC<SidebarItemProps> = ({ item }) => {
  return (
    <div className={s.item}>
      <AppLink to={item.link}>{item.name}</AppLink>
    </div>
  )
}
