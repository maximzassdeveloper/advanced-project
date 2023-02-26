import { FC, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { getScrollbarWidth } from '@/shared/lib/getScrollbarWidth'

export interface DialogWrapperProps {
  visible?: boolean
  /** Delay before removing Dialog, for your animations */
  animationTimeout?: number
  /** Lock page scroll on visible */
  lockScroll?: boolean
  className?: string
}

export const DialogWrapper: FC<DialogWrapperProps> = (props) => {
  const { children, visible, className } = props

  const containerRef = useRef<HTMLDivElement>(document.createElement('div'))
  const timeoutRef = useRef<NodeJS.Timeout>()
  const propsRef = useRef<DialogWrapperProps>(props)

  // wrapping `props` with ref to prevent unnecessary effect calls
  useEffect(() => {
    propsRef.current = props
  }, [props])

  const removeContainer = useCallback(() => {
    if (propsRef.current.lockScroll) {
      document.body.style.overflow = 'auto'
      document.body.style.width = ''
    }
    containerRef.current.remove()
  }, [])

  useEffect(() => {
    const { animationTimeout, lockScroll } = propsRef.current
    const container = containerRef.current
    clearTimeout(timeoutRef.current)

    if (visible) {
      document.body.appendChild(container)
      if (lockScroll) {
        const scrollBarWidth = getScrollbarWidth()
        document.body.style.overflow = 'hidden'
        document.body.style.width = `calc(100% - ${scrollBarWidth}px)`
      }
    } else {
      if (animationTimeout !== undefined) {
        timeoutRef.current = setTimeout(() => {
          removeContainer()
        }, animationTimeout)
      } else {
        removeContainer()
      }
    }
  }, [visible, removeContainer])

  useEffect(() => {
    if (className) {
      containerRef.current.className = className
    }
  }, [className])

  // Remove div container when Dialog unmount
  useEffect(() => {
    return () => {
      removeContainer()
      clearTimeout(timeoutRef.current)
    }
  }, [removeContainer])

  return createPortal(children, containerRef.current)
}
