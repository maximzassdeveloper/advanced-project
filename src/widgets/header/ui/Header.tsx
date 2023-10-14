import { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUserActions } from '@/entities/User'
import { LoginModal } from '@/features/Auth'
import { useAppSelector } from '@/shared/hooks'
import { getUserAuth } from '@/entities/User/model/selectors/getUserAuth'
import { LangSwitcher, SidebarSwitcher, ThemeSwitcher } from '@/features/Switchers'
import { Button } from '@/shared/ui'
import s from './header.module.scss'

export const Header: FC = () => {
  const { t } = useTranslation()
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const auth = useAppSelector(getUserAuth)
  const { logout } = useUserActions()

  const closeLoginModal = useCallback(() => {
    setIsLoginOpen(false)
  }, [])

  const openLoginModal = useCallback(() => {
    setIsLoginOpen(true)
  }, [])

  return (
    <div className={s.header} data-testid='header'>
      <SidebarSwitcher className={s.sidebarSwitcher} />

      <LangSwitcher className={s.langSwitcher} />
      <ThemeSwitcher className={s.themeSwitcher} />

      <div className={s.user}>
        {auth ? (
          <>
            <span style={{ marginLeft: 'auto' }}>{auth?.username}</span>
            <Button theme='clear' onClick={() => logout()}>
              {t('header.user.logout', 'Выйти')}
            </Button>
          </>
        ) : (
          <>
            <Button theme='clear' onClick={openLoginModal}>
              {t('header.user.login', 'Войти')}
            </Button>
            <LoginModal isOpen={isLoginOpen} onClose={closeLoginModal} />
          </>
        )}
      </div>
    </div>
  )
}
