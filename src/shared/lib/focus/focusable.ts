export function isFocusable(element: HTMLElement | ChildNode) {
  if (!(element instanceof HTMLElement)) {
    return false
  }
  // Element with tabIndex < 0 may be focusable, but he won't be in the tabbing order
  if (element.tabIndex < 0) {
    return false
  }

  if (element.getAttribute('disabled')) {
    return false
  }

  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLButtonElement ||
    element instanceof HTMLAreaElement ||
    element instanceof HTMLIFrameElement ||
    (element instanceof HTMLAnchorElement && element.href && element.rel !== 'ignore') ||
    element.tabIndex >= 0 ||
    element.isContentEditable
  )
}

export function findFirstFocusableElement(
  element: HTMLElement | ChildNode,
  exclude?: (HTMLElement | ChildNode)[]
): HTMLElement | null {
  const childrens = element.childNodes

  for (let i = 0; i < childrens.length; i++) {
    const el = childrens[i]

    if (exclude) {
      const isExcludedEl = !!exclude.find((excludedEl) => excludedEl.isEqualNode(el))
      if (isExcludedEl) {
        continue
      }
    }

    if (isFocusable(el) && el instanceof HTMLElement) {
      return el
    }

    const childEl = findFirstFocusableElement(el)
    if (childEl) {
      return childEl
    }
  }

  return null
}
