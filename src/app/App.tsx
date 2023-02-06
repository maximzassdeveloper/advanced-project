import { FC, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { AboutPage } from '@/pages/AboutPage'
import { HomePage } from '@/pages/HomePage'
import { useTheme } from '@/app/providers/theme'
import { classNames } from '@/shared/lib/classNames/classNames'
import './styles/index.scss'

export const App: FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={classNames('app', theme)}>
      <Suspense fallback={<div>loading...</div>}>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <button onClick={toggleTheme}>изменить тему</button>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}
