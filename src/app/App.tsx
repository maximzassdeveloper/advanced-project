import { FC, Suspense } from 'react'
import { AppRoutes } from './providers/router'
import { Sidebar } from '@/widgets/sidebar'
import { Header } from '@/widgets/header'
import { Spinner } from '@/shared/ui'
import '@/shared/config/i18n/i18n'
import './styles/index.scss'

export const App: FC = () => {
  return (
    <div className='app'>
      <Suspense fallback={<Spinner fullPage />}>
        <Header />
        <div className='main'>
          <Sidebar />
          <div className='page'>
            <AppRoutes />
          </div>
        </div>
      </Suspense>
    </div>
  )
}
