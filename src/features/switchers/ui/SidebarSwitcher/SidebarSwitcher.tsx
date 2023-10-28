import { FC, memo } from 'react'
import { useSidebar } from '@/app/providers/common'
import { Hamburger } from '@/shared/ui'

interface SidebarSwitcherProps {
  className?: string
}

export const SidebarSwitcher: FC<SidebarSwitcherProps> = memo((props) => {
  const { className } = props
  const { collapsed, toggleSidebar } = useSidebar()

  return (
    <div className={className}>
      <Hamburger
        active={collapsed}
        onClick={toggleSidebar}
      />
    </div>
  )
})
