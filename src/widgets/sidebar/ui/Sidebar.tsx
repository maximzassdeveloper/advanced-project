import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSidebar } from '@/app/providers/common'
import { classNames } from '@/shared/lib/classNames'
import s from './sidebar.module.scss'
import Alien from '@/shared/assets/icons/alien.svg'

export const Sidebar: FC = memo(() => {
  const { t } = useTranslation()
  const { collapsed } = useSidebar()

  return (
    <div
      className={classNames(s.sidebar, { [s.collapsed]: collapsed })}
      data-testid='sidebar'
    >
      <Alien />
      {t('sidebar.title', 'Sidebar')}
    </div>
  )
})
