import React, { useRef, useState, useCallback, useEffect, HTMLAttributes, useMemo } from 'react'
import { DialogWrapper, DialogWrapperProps } from './DialogWrapper'
import DomWrapper from './DomWrapper'
import { findDomNode } from './findDomNode'
import { mergeProps } from '@/shared/lib/mergeProps'

interface DialogProps extends DialogWrapperProps {
  trigger?: React.ReactElement
  autoWidth?: boolean
  onClose?: () => void
  triggerProps?: HTMLAttributes<HTMLElement>
}

export const Dialog: React.FC<DialogProps> = (props) => {
  const {
    children,
    trigger,
    triggerProps,
    className,
    visible,
    autoWidth,
    lockScroll,
    animationTimeout,
    onClose,
  } = props

  const wrapperRef = useRef<DomWrapper>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const propsRef = useRef<DialogProps>()
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    propsRef.current = props
  }, [autoWidth, onClose, props])

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
  }, [triggerEl])

  const clickOutside = useCallback(
    (e: MouseEvent) => {
      if (!popupRef.current || !triggerEl || !propsRef.current) return
      const { onClose } = propsRef.current

      if (
        e.target &&
        !popupRef.current.contains(e.target as Node) &&
        !triggerEl.contains(e.target as Node)
      ) {
        onClose?.()
      }
    },
    [triggerEl]
  )

  useEffect(() => {
    if (trigger instanceof HTMLElement || !wrapperRef.current) return

    const node = findDomNode<HTMLElement>(wrapperRef.current)
    if (!node) return

    setTriggerEl(node)
    calcPopupPosition()

    window.addEventListener('resize', calcPopupPosition)

    return () => {
      window.removeEventListener('resize', calcPopupPosition)
    }
  }, [trigger, calcPopupPosition])

  useEffect(() => {
    if (visible) {
      window.addEventListener('click', clickOutside)
    }
    return () => {
      window.removeEventListener('click', clickOutside)
    }
  }, [visible, clickOutside])

  // Creating triggerNode to use triggerProps
  const triggerNode = useMemo(() => {
    if (!trigger) return null

    const triggerChild = React.Children.only(trigger) as React.ReactElement
    return React.cloneElement(triggerChild, mergeProps(triggerProps, triggerChild?.props))
  }, [trigger, triggerProps])

  return (
    <>
      {triggerNode && <DomWrapper ref={wrapperRef}>{triggerNode}</DomWrapper>}

      <DialogWrapper
        className={className}
        visible={visible}
        animationTimeout={animationTimeout}
        lockScroll={lockScroll}
      >
        <div ref={popupRef}>{children}</div>
      </DialogWrapper>
    </>
  )
}
