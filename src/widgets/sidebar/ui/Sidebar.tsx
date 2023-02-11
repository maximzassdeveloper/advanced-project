import { FC, memo } from 'react'
import { useSidebar } from '@/app/providers/common'
import { classNames } from '@/shared/lib/classNames'
import s from './sidebar.module.scss'

export const Sidebar: FC = memo(() => {
  const { collapsed } = useSidebar()

  return (
    <div className={classNames(s.sidebar, { [s.collapsed]: collapsed })}>
      Sidebar
    </div>
  )
})
