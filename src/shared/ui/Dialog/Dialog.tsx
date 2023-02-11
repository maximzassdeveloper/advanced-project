import { FC, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface DialogProps {
  visible?: boolean
  /** Delay before removing Dialog, for your animations */
  animationTimeout?: number
  className?: string
}

export const Dialog: FC<DialogProps> = (props) => {
  const { children, visible, animationTimeout, className } = props

  const containerRef = useRef<HTMLDivElement>(document.createElement('div'))
  const timeoutRef = useRef<NodeJS.Timeout>()
  const animationTimeoutRef = useRef<number | undefined>(animationTimeout)

  useEffect(() => {
    const container = containerRef.current
    clearTimeout(timeoutRef.current)

    if (visible) {
      document.body.appendChild(container)
    } else {
      if (animationTimeoutRef.current !== undefined) {
        timeoutRef.current = setTimeout(() => {
          container.remove()
        }, animationTimeoutRef.current)
      } else {
        containerRef.current.remove()
      }
    }
  }, [visible])

  // Remove div container when Dialog unmount
  useEffect(() => {
    const container = containerRef.current
    return () => {
      container.remove()
      clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (className) {
      containerRef.current.className = className
    }
  }, [className])

  // We keep `animationTimeout` in ref that when it is changed,
  // the div container was not recreated and actual value of `animationTimeout` was remained
  useEffect(() => {
    animationTimeoutRef.current = animationTimeout
  }, [animationTimeout])

  return createPortal(children, containerRef.current)
}
