import { FC, ReactElement, ReactNode, useCallback, useMemo, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Dialog } from '@/shared/ui/Dialog'
import { classNames } from '@/shared/lib/classNames'
import s from './popover.module.scss'

interface PopoverProps {
  content?: ReactNode
  className?: string
  children: ReactElement
}

export const Popover: FC<PopoverProps> = (props) => {
  const { children, content, className } = props

  const [visible, setVisible] = useState(false)

  const onClick = useCallback(() => {
    setVisible((prev) => !prev)
  }, [])

  const triggerProps = useMemo(
    () => ({
      onClick,
    }),
    [onClick]
  )

  return (
    <Dialog
      trigger={children}
      visible={visible}
      triggerProps={triggerProps}
      animationTimeout={200}
    >
      <CSSTransition
        in={visible}
        timeout={300}
        classNames='fade-down'
      >
        <div className={classNames(s.popover, className)}>{content}</div>
      </CSSTransition>
    </Dialog>
  )
}
