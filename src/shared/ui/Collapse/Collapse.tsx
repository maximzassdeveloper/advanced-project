import { FC, ReactNode, useId, useLayoutEffect, useRef, useState } from 'react'
import s from './Collapse.module.scss'

const getElementHeight = (el: HTMLElement): number => {
  return el.scrollHeight
}

const detectAnimationEnd = (callback: () => void, timeout: number) => {
  const startTime = performance.now()

  function call() {
    requestAnimationFrame((now) => {
      if (now - startTime > timeout) {
        callback()
      } else {
        call()
      }
    })
  }

  call()
}

interface CollapseProps {
  title: string
  content: ReactNode
  defaultExpanded?: boolean
  className?: string
}

export const Collapse: FC<CollapseProps> = (props) => {
  const { title, content, defaultExpanded = false, className } = props
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const id = useId()
  const heightRef = useRef(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const collapsedEl = contentRef.current
    if (!collapsedEl) return

    if (isExpanded) {
      const height = getElementHeight(collapsedEl)
      heightRef.current = height

      collapsedEl.style.transition = 'height .2s cubic-bezier(0.4, 0, 0.2, 1)'
      collapsedEl.style.height = `${height}px`

      detectAnimationEnd(() => {
        collapsedEl.style.height = 'auto'
        collapsedEl.style.transition = ''
      }, 150)
    } else {
      collapsedEl.style.height = `${heightRef.current}px`
      requestAnimationFrame(() => {
        collapsedEl.style.transition = 'height .2s cubic-bezier(0.4, 0, 0.2, 1)'
        collapsedEl.style.height = `${0}px`
      })
      detectAnimationEnd(() => {
        collapsedEl.style.transition = ''
      }, 150)
    }
  }, [isExpanded])

  return (
    <div className={className}>
      <button
        className={s.button}
        id={id}
        type='button'
        aria-expanded={!isExpanded}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {title}
      </button>

      <div
        ref={contentRef}
        className={s.content}
        role='region'
        aria-labelledby={id}
        aria-hidden={!isExpanded}
      >
        {content}
      </div>
    </div>
  )
}
