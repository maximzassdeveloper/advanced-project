import { FC, KeyboardEvent, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Dialog } from '@/shared/ui/Dialog'
import { findFirstFocusableElement } from '@/shared/lib/focus'
import { classNames } from '@/shared/lib/classNames'
import { useCashProps } from '@/shared/hooks/useCashedProps'
import s from './modal.module.scss'

interface ModalProps {
  visible?: boolean
  onClose?: () => void
  focusFirst?: boolean
  destroyOnClose?: boolean
  className?: string
}

export const Modal: FC<ModalProps> = (props) => {
  const { children, visible, onClose, className, destroyOnClose } = props

  const contentRef = useRef<HTMLDivElement>(null)
  const sentinelStartRef = useRef<HTMLDivElement>(null)
  const sentinelEndRef = useRef<HTMLDivElement>(null)
  const propsRef = useCashProps(props)

  useEffect(() => {
    if (!contentRef.current || !sentinelStartRef.current || !sentinelEndRef.current) return
    const { focusFirst } = propsRef.current

    if (visible) {
      sentinelStartRef.current.focus()
      if (focusFirst) {
        const el = findFirstFocusableElement(contentRef.current, [
          sentinelStartRef.current,
          sentinelEndRef.current,
        ])
        el?.focus()
      }
    }
  }, [propsRef, visible])

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      onClose?.()
    }

    if (e.code === 'Tab') {
      if (document.activeElement === sentinelEndRef.current) {
        sentinelStartRef.current?.focus()
      }
      if (e.shiftKey && document.activeElement === sentinelStartRef.current) {
        sentinelEndRef.current?.focus()
      }
    }
  }

  return (
    <Dialog
      className={className}
      visible={visible}
      animationTimeout={300}
      lockScroll
      destroyOnClose={destroyOnClose}
    >
      <div
        className={classNames(s.modal, className)}
        onKeyDown={keyDownHandler}
      >
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
          mountOnEnter
        >
          <div
            ref={contentRef}
            role='dialog'
            aria-modal='true'
            className={s.content}
          >
            <div
              className={s.sentinel}
              ref={sentinelStartRef}
              tabIndex={0}
              aria-hidden={true}
            />
            {children}
            <div
              className={s.sentinel}
              ref={sentinelEndRef}
              tabIndex={0}
              aria-hidden={true}
            />
          </div>
        </CSSTransition>
      </div>
    </Dialog>
  )
}
