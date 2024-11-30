import { FC, Suspense, useEffect } from 'react'
import { AppRoutes } from './providers/router'
import { Sidebar } from '@/widgets/Sidebar'
import { Header } from '@/widgets/Header'
import { Spinner } from '@/shared/ui'
import { useUserActions } from '@/entities/User'
import '@/shared/config/i18n/i18n'
import './styles/index.scss'

export const App: FC = () => {
  const { initAuth } = useUserActions()

  useEffect(() => {
    initAuth()
  }, [initAuth])

  return (
    <div className='app'>
      <Suspense fallback={<Spinner fullPage />}>
        {/* <Header /> */}
        {/* <h1 className='mainTitle'>Невероятный блог</h1> */}
        <div className='main'>
          {/* <Sidebar /> */}
          <div className='page'>
            <AppRoutes />
          </div>
        </div>
      </Suspense>
    </div>
  )
}
