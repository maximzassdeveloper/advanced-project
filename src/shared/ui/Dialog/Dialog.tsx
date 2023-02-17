import React, { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { DialogWrapper, DialogWrapperProps } from './DialogWrapper'
import DomWrapper from './DomWrapper'

interface DialogProps extends DialogWrapperProps {
  trigger?: ReactNode
}

function findDomNode(node: React.ReactInstance | HTMLElement) {
  if (node instanceof React.Component) {
    // eslint-disable-next-line react/no-find-dom-node
    return ReactDOM.findDOMNode(node)
  }

  return null
}

export const Dialog: FC<DialogProps> = (props) => {
  const { children, trigger, className, visible, animationTimeout } = props

  const [triggerVisible, setTriggerVisible] = useState(false)

  const wrapperRef = useRef<DomWrapper>(null)
  const absoluteRef = useRef<HTMLDivElement>(null)

  const toggleTriggerVisible = useCallback(() => {
    // console.log('yes')
    setTriggerVisible((prev) => !prev)
  }, [])

  const onResize = (ent: any) => {
    // console.log(ent)
  }
  const resizeObserver = new ResizeObserver(onResize)

  useEffect(() => {
    if (trigger instanceof HTMLElement || !wrapperRef.current || !absoluteRef.current) return

    const node = findDomNode(wrapperRef.current) as HTMLElement
    const { x, y, height } = node.getBoundingClientRect()

    resizeObserver.observe(node)

    // console.log({ node: node.ownerDocument })

    // console.log({ node })
    node.addEventListener('click', toggleTriggerVisible)

    absoluteRef.current.style.position = 'absolute'
    absoluteRef.current.style.left = `${x}px`
    absoluteRef.current.style.top = `${y + height + 10}px`

    return () => {
      node.removeEventListener('click', toggleTriggerVisible)
    }
  }, [trigger, toggleTriggerVisible])

  return (
    <>
      {trigger && <DomWrapper ref={wrapperRef}>{trigger}</DomWrapper>}

      <DialogWrapper
        className={className}
        visible={visible !== undefined ? visible : triggerVisible}
        animationTimeout={animationTimeout}
      >
        <div ref={absoluteRef}>{children}</div>
      </DialogWrapper>
    </>
  )
}
