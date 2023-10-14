import { FC, memo } from 'react'
import { useSidebar } from '@/app/providers/common'
import { classNames } from '@/shared/lib/classNames'
import { useMenuItems } from '../../model/useMenuItems'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import s from './sidebar.module.scss'

export const Sidebar: FC = memo(() => {
  const { collapsed } = useSidebar()
  const menuItems = useMenuItems()

  return (
    <div className={classNames(s.sidebar, { [s.collapsed]: collapsed })} data-testid='sidebar'>
      {menuItems.map((item) => (
        <SidebarItem key={item.link} item={item} />
      ))}
    </div>
  )
})
