import { FC } from 'react'
import { AppLink, Icon } from '@/shared/ui'
import { MenuItem } from '../../model/useMenuItems'
import s from './sidebar-item.module.scss'
import { classNames } from '@/shared/lib/classNames'

interface SidebarItemProps {
  item: MenuItem
  collapsed: boolean
}

export const SidebarItem: FC<SidebarItemProps> = ({ item, collapsed }) => {
  return (
    <li>
      <AppLink to={item.link} className={classNames(s.item, { [s.collapsed]: collapsed })}>
        <Icon icon={item.icon} size='l' />
        <span>{item.name}</span>
      </AppLink>
    </li>
  )
}
