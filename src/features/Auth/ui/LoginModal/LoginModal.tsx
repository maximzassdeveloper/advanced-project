import { Suspense, lazy, useCallback } from 'react'
import { Modal, Spinner } from '@/shared/ui'
import s from './login-modal.module.scss'

const LoginForm = lazy(() => import('../LoginForm/LoginForm'))

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export const LoginModal = (props: LoginModalProps) => {
  const { isOpen, onClose } = props

  const successHandler = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <Modal
      visible={isOpen}
      onClose={onClose}
      contentClassName={s.content}
      focusFirst
      destroyOnClose={false}
    >
      <Suspense fallback={<Spinner />}>
        <LoginForm onSuccess={successHandler} />
      </Suspense>
    </Modal>
  )
}
