import { ClientRegion } from '../../types/dialog'

export class ClientRegionDTO implements ClientRegion {
  clientHeight = 0
  clientWidth = 0
  scrollLeft = 0
  scrollTop = 0

  constructor(clientWidth = 0, clientHeight = 0, scrollLeft = 0, scrollTop = 0) {
    this.clientWidth = clientWidth
    this.clientHeight = clientHeight
    this.scrollLeft = scrollLeft
    this.scrollTop = scrollTop
  }
}

export class DOMRect {
  x = 0
  y = 0
  left = 0
  right = 0
  top = 0
  bottom = 0
  width = 0
  height = 0

  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x
    this.y = y
    this.left = x
    this.top = y
    this.width = width
    this.height = height
    this.bottom = y + height
    this.right = x + width
  }

  toJSON() {
    return this.toString()
  }
}
