import { FC } from 'react'
import { useSidebar } from '@/app/providers/common'
import { Hamburger } from '@/shared/ui'
import s from './sidebarSwitcher.module.scss'

export const SidebarSwitcher: FC = () => {
  const { collapsed, toggleSidebar } = useSidebar()

  return (
    <div className={s.sidebarSwitcher}>
      <Hamburger active={collapsed} onClick={toggleSidebar} />
    </div>
  )
}
