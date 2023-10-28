import { Align, ClientRegion, Placement } from './Dialog'

function getPopupPlacementRect(
  popupRect: DOMRect,
  triggerRect: DOMRect,
  offset: number,
  placement: Placement,
  align: Align
) {
  let offsetX = 0
  let offsetY = 0

  if (placement === 'bottom') {
    offsetY = triggerRect.bottom + offset
    offsetX = triggerRect.left

    if (align === 'center') {
      offsetX = triggerRect.left + triggerRect.width / 2 - popupRect.width / 2
    } else if (align === 'end') {
      offsetX = triggerRect.right - popupRect.width
    }
  }

  // Top
  if (placement === 'top') {
    offsetY = triggerRect.top - popupRect.height - offset
    offsetX = triggerRect.left

    if (align === 'center') {
      offsetX = triggerRect.left + triggerRect.width / 2 - popupRect.width / 2
    } else if (align === 'end') {
      offsetX = triggerRect.right - popupRect.width
    }
  }

  // Left
  if (placement === 'left') {
    offsetX = triggerRect.left - popupRect.width - offset
    offsetY = triggerRect.top

    if (align === 'center') {
      offsetY = triggerRect.top + triggerRect.height / 2 - popupRect.height / 2
    } else if (align === 'end') {
      offsetY = triggerRect.bottom - popupRect.height
    }
  }

  // Right
  if (placement === 'right') {
    offsetX = triggerRect.right + offset
    offsetY = triggerRect.top

    if (align === 'center') {
      offsetY = triggerRect.top + triggerRect.height / 2 - popupRect.height / 2
    } else if (align === 'end') {
      offsetY = triggerRect.bottom - popupRect.height
    }
  }

  return new DOMRect(offsetX, offsetY, popupRect.width, popupRect.height)
}

function getAvailablePlacement(
  popupRect: DOMRect,
  triggerRect: DOMRect,
  { clientWidth, clientHeight }: ClientRegion,
  placementOrder: Placement[],
  boundary: number
) {
  for (const place of placementOrder) {
    if (
      (place === 'top' && triggerRect.top - boundary > popupRect.height) ||
      (place === 'bottom' && clientHeight - triggerRect.bottom - boundary > popupRect.height) ||
      (place === 'left' && triggerRect.left - boundary > popupRect.width) ||
      (place === 'right' && clientWidth - triggerRect.right - boundary > popupRect.width)
    ) {
      return place
    }
  }

  return placementOrder[0]
}

function getShiftRect(
  popupRect: DOMRect,
  triggerRect: DOMRect,
  { clientHeight, clientWidth }: ClientRegion,
  boundary: number
) {
  let offsetX = popupRect.left
  let offsetY = popupRect.top

  if (clientHeight - popupRect.bottom <= boundary) {
    offsetY = clientHeight - boundary - popupRect.height

    if (triggerRect.bottom > offsetY + popupRect.height) {
      offsetY = triggerRect.bottom - popupRect.height
    }
  }
  if (popupRect.top < boundary) {
    offsetY = boundary

    if (triggerRect.top < offsetY) {
      offsetY = triggerRect.top
    }
  }

  if (clientWidth - popupRect.right <= boundary) {
    offsetX = clientWidth - boundary - popupRect.width

    if (triggerRect.right > offsetX + popupRect.width) {
      offsetX = triggerRect.right - popupRect.width
    }
  }
  if (popupRect.left < boundary) {
    offsetX = boundary

    if (triggerRect.left < offsetX) {
      offsetX = triggerRect.left
    }
  }

  return { offsetX, offsetY }
}

export function calcPosition(
  popupEl: HTMLElement,
  triggerEl: HTMLElement,
  offset: number,
  placementOrder: Placement[],
  align: Align,
  boundary: number
) {
  const triggerRect = triggerEl.getBoundingClientRect()
  const initialPopupRect = popupEl.getBoundingClientRect()

  const doc = popupEl.ownerDocument
  const { clientWidth, clientHeight, scrollTop, scrollLeft } = doc.documentElement

  const clientRegion: ClientRegion = {
    clientWidth,
    clientHeight,
    scrollTop,
    scrollLeft,
  }

  const placement = getAvailablePlacement(
    initialPopupRect,
    triggerRect,
    clientRegion,
    placementOrder,
    boundary
  )

  const popupRect = getPopupPlacementRect(initialPopupRect, triggerRect, offset, placement, align)

  const { offsetX, offsetY } = getShiftRect(popupRect, triggerRect, clientRegion, boundary)

  return {
    offsetX: offsetX + clientRegion.scrollLeft,
    offsetY: offsetY + clientRegion.scrollTop,
  }
}
