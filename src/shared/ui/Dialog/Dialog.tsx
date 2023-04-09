import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { Portal, PortalProps } from './Portal'
import DomWrapper from './DomWrapper'
import { mergeProps } from '@/shared/lib/mergeProps'
import { useClickOutside, useCashProps } from '@/shared/hooks'
import { findDomNode } from './findDomNode'

interface DialogProps extends PortalProps {
  trigger?: React.ReactElement
  autoWidth?: boolean
  onClose?: () => void
  triggerProps?: React.HTMLAttributes<HTMLElement>
}

export const Dialog: React.FC<DialogProps> = (props) => {
  const {
    children,
    trigger,
    triggerProps,
    className,
    visible,
    lockScroll,
    animationTimeout,
    destroyOnClose = true,
    onClose,
  } = props

  const wrapperRef = useRef<DomWrapper>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const propsRef = useCashProps(props)
  const triggerPropsRef = useRef<React.HTMLAttributes<HTMLElement>>()
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null)

  useClickOutside({
    targets: [popupRef.current, triggerEl],
    outsideCallback: onClose,
    visible,
  })

  const calcPopupPosition = useCallback(() => {
    if (!popupRef.current || !triggerEl || !propsRef.current) return

    const { autoWidth } = propsRef.current
    const { x, y, width, height } = triggerEl.getBoundingClientRect()

    const popupStyle = popupRef.current.style
    popupStyle.position = 'absolute'
    popupStyle.left = `${x}px`
    popupStyle.top = `${y + height + 5}px`

    if (autoWidth) {
      popupStyle.width = `${width}px`
    }
  }, [propsRef, triggerEl])

  useEffect(() => {
    if (trigger instanceof HTMLElement || !wrapperRef.current) return

    const node = findDomNode<HTMLElement>(wrapperRef.current)
    if (!node) return

    setTriggerEl(node)
    calcPopupPosition()

    triggerPropsRef.current = {
      onClick: calcPopupPosition,
      onMouseEnter: calcPopupPosition,
    }

    window.addEventListener('resize', calcPopupPosition)
    return () => {
      window.removeEventListener('resize', calcPopupPosition)
    }
  }, [trigger, calcPopupPosition])

  // Creating triggerNode to use triggerProps
  const triggerNode = useMemo(() => {
    if (!trigger) return null

    const triggerChild = React.Children.only(trigger)
    const newTriggerProps = mergeProps(triggerProps, triggerPropsRef.current, triggerChild?.props)

    return React.cloneElement(triggerChild, newTriggerProps)
  }, [trigger, triggerProps])

  return (
    <>
      {triggerNode && <DomWrapper ref={wrapperRef}>{triggerNode}</DomWrapper>}

      <Portal
        className={className}
        visible={visible}
        animationTimeout={animationTimeout}
        lockScroll={lockScroll}
        destroyOnClose={destroyOnClose}
      >
        <div ref={popupRef}>{children}</div>
      </Portal>
    </>
  )
}
