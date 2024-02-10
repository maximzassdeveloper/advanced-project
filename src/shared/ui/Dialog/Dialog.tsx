import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { Portal, PortalProps } from '../Portal/Portal'
import DomWrapper from './DomWrapper'
import { mergeProps } from '@/shared/lib/mergeProps'
import { useClickOutside, useCashProps } from '@/shared/hooks'
import { findDomNode } from './utils/findDomNode'
import { calcPosition } from './utils/calcPosition/calcPosition'
import { Align, Placement } from './types/dialog'

interface DialogProps extends PortalProps {
  trigger?: React.ReactElement
  autoWidth?: boolean
  onClose?: () => void
  triggerProps?: React.HTMLAttributes<HTMLElement>
  offset?: number
  boundary?: number
  placement?: Placement | Placement[]
  align?: Align
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

    const {
      visible,
      autoWidth,
      align = 'center',
      boundary = 20,
      offset = 10,
      placement = ['bottom', 'top', 'left', 'right'],
    } = propsRef.current

    if (visible) {
      const { offsetX, offsetY } = calcPosition({
        popupEl: popupRef.current,
        triggerEl,
        offset,
        placementOrder: Array.isArray(placement) ? placement : [placement],
        align,
        boundary,
      })

      const popupStyle = popupRef.current.style
      popupStyle.left = `${offsetX}px`
      popupStyle.top = `${offsetY}px`

      if (autoWidth) {
        const triggerRect = triggerEl.getBoundingClientRect()
        popupStyle.width = `${triggerRect.width}px`
      }
    }
  }, [propsRef, triggerEl])

  const onChangePosition = useCallback(() => {
    requestAnimationFrame(calcPopupPosition)
  }, [calcPopupPosition])

  useEffect(() => {
    if (trigger instanceof HTMLElement || !wrapperRef.current) return

    const node = findDomNode<HTMLElement>(wrapperRef.current)
    if (!node) return

    setTriggerEl(node)

    window.addEventListener('resize', onChangePosition)

    return () => {
      window.removeEventListener('resize', onChangePosition)
    }
  }, [trigger, onChangePosition])

  useEffect(() => {
    onChangePosition()
  }, [visible, onChangePosition])

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
