import { FC, useCallback, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Dialog } from '@/shared/ui/Dialog'
import { classNames } from '@/shared/lib/classNames'
import s from './modal.module.scss'

interface ModalProps {
  visible?: boolean
  onClose?: () => void
  className?: string
}

export const Modal: FC<ModalProps> = (props) => {
  const { children, visible, onClose, className } = props

  const closeHandler = useCallback(() => {
    onClose?.()
  }, [onClose])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        closeHandler()
      }
    },
    [closeHandler]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [visible, onKeyDown])

  return (
    <Dialog
      className={className}
      visible={visible}
      animationTimeout={300}
      lockScroll
    >
      <div className={classNames(s.modal, className)}>
        <CSSTransition
          in={visible}
          timeout={300}
          classNames='fade'
        >
          <div
            className={s.mask}
            onClick={onClose}
          />
        </CSSTransition>

        <CSSTransition
          in={visible}
          timeout={300}
          classNames='fade-down'
        >
          <div className={s.content}>{children}</div>
        </CSSTransition>
      </div>
    </Dialog>
  )
}
