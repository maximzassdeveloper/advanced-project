import { FC, ReactElement, ReactNode, useMemo, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Dialog } from '@/shared/ui/Dialog'
import { classNames } from '@/shared/lib/classNames'
import s from './popover.module.scss'

interface PopoverProps {
  content?: ReactNode
  className?: string
  visible?: boolean
  // Pick width of target element
  autoWidth?: boolean
  onVisibleChange?: (visible: boolean) => void
  children: ReactElement
}

export const Popover: FC<PopoverProps> = (props) => {
  const { children, content, visible: userVisible, onVisibleChange, className, autoWidth } = props

  const [customVisible, setCustomVisible] = useState(false)

  // Custom `visible` state, to combine `userVisible` and `customVisible`
  const [visible, setVisible] = useMemo(() => {
    const visible = userVisible !== undefined ? userVisible : customVisible

    const setVisible = (outVisible: ((prev: boolean) => boolean) | boolean) => {
      let newVisible: boolean
      if (typeof outVisible === 'function') {
        newVisible = outVisible(visible)
      } else {
        newVisible = outVisible
      }

      if (userVisible !== undefined) {
        setCustomVisible(newVisible)
      }
      onVisibleChange?.(newVisible)
    }

    return [visible, setVisible]
  }, [userVisible, customVisible, onVisibleChange])

  const onClick = () => {
    setVisible((prev) => !prev)
  }

  const closeHandler = () => {
    setVisible(false)
  }

  const triggerProps = {
    onClick: userVisible === undefined ? onClick : () => null,
  }

  return (
    <Dialog
      trigger={children}
      visible={visible}
      triggerProps={triggerProps}
      animationTimeout={200}
      autoWidth={autoWidth}
      onClose={closeHandler}
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
