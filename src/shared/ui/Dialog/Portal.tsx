import { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { getScrollbarWidth } from '@/shared/lib/getScrollbarWidth'
import { useCashProps } from '@/shared/hooks/useCashedProps'

export interface PortalProps {
  visible?: boolean
  /** Delay before removing Dialog, for your animations */
  animationTimeout?: number
  /** Lock page scroll on visible */
  lockScroll?: boolean
  destroyOnClose?: boolean
  className?: string
}

export const Portal: FC<PortalProps> = (props) => {
  const { children, visible, className } = props

  const containerRef = useRef<HTMLDivElement>(document.createElement('div'))
  const delayRef = useRef<NodeJS.Timeout>()
  const propsRef = useCashProps(props)

  const removeContainer = useCallback(() => {
    if (propsRef.current.lockScroll) {
      document.body.style.overflow = 'auto'
      document.body.style.width = ''
    }

    if (propsRef.current.destroyOnClose) {
      containerRef.current.remove()
    } else {
      containerRef.current.style.display = 'none'
    }
  }, [propsRef])

  useEffect(() => {
    const { animationTimeout, lockScroll, destroyOnClose } = propsRef.current
    const container = containerRef.current
    clearTimeout(delayRef.current)

    if (visible) {
      document.body.appendChild(container)
      if (lockScroll) {
        const scrollBarWidth = getScrollbarWidth()
        document.body.style.overflow = 'hidden'
        document.body.style.width = `calc(100% - ${scrollBarWidth}px)`
      }

      if (!destroyOnClose) {
        containerRef.current.style.display = 'block'
      }
    } else {
      if (animationTimeout !== undefined) {
        delayRef.current = setTimeout(() => {
          removeContainer()
        }, animationTimeout)
      } else {
        removeContainer()
      }
    }
  }, [propsRef, visible, removeContainer])

  useEffect(() => {
    if (className) {
      containerRef.current.className = className
    }
  }, [className])

  // Remove div container when Dialog unmount
  useEffect(() => {
    return () => {
      removeContainer()
      clearTimeout(delayRef.current)
    }
    // eslint-disable-next-line
  }, [])

  const childrenRef = useRef(children)

  return createPortal(children, containerRef.current)
}
