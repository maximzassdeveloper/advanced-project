import React, { useRef, useState, useCallback, useEffect, HTMLAttributes, useMemo } from 'react'
import { DialogWrapper, DialogWrapperProps } from './DialogWrapper'
import DomWrapper from './DomWrapper'
import { findDomNode } from './findDomNode'
import { mergeProps } from '@/shared/lib/mergeProps'

interface DialogProps extends DialogWrapperProps {
  trigger?: React.ReactElement
  triggerProps?: HTMLAttributes<HTMLElement>
}

export const Dialog: React.FC<DialogProps> = (props) => {
  const { children, trigger, triggerProps, className, visible, ...rest } = props

  const wrapperRef = useRef<DomWrapper>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null)

  // Creating triggerNode to use triggerProps
  const triggerNode = useMemo(() => {
    if (!trigger) return null

    const triggerChild = React.Children.only(trigger) as React.ReactElement
    return React.cloneElement(triggerChild, mergeProps(triggerProps, triggerChild?.props))
  }, [trigger, triggerProps])

  const calcPopupPosition = useCallback(() => {
    if (!popupRef.current || !triggerEl) return

    const { x, y, height } = triggerEl.getBoundingClientRect()

    popupRef.current.style.position = 'absolute'
    popupRef.current.style.left = `${x}px`
    popupRef.current.style.top = `${y + height + 10}px`
  }, [triggerEl])

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

  return (
    <>
      {triggerNode && <DomWrapper ref={wrapperRef}>{triggerNode}</DomWrapper>}

      <DialogWrapper
        className={className}
        visible={visible}
        {...rest}
      >
        <div ref={popupRef}>{children}</div>
      </DialogWrapper>
    </>
  )
}
