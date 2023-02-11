import { FC } from 'react'
import { useTheme } from './providers/theme'
import { AppRoutes } from './providers/router'
import { Sidebar } from '@/widgets/sidebar'
import { Header } from '@/widgets/header'
import { classNames } from '@/shared/lib/classNames'
import './styles/index.scss'

export const App: FC = () => {
  return (
    <div className={classNames('app')}>
      <Header />
      <div className='main'>
        <Sidebar />
        <div className='page'>
          <AppRoutes />
        </div>
      </div>
    </div>
  )
}
