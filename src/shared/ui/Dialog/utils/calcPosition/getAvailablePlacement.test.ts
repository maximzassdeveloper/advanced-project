import { getAvailablePlacement } from './calcPosition'
import { ClientRegionDTO, DOMRect } from './test-utils'

describe('getAvailablePlacement', () => {
  test('basic case', () => {
    const result = getAvailablePlacement({
      popupRect: new DOMRect(0, 0, 300, 350),
      triggerRect: new DOMRect(570, 430, 50, 38),
      clientRegion: new ClientRegionDTO(1000, 1000),
      placementOrder: ['bottom', 'top', 'left', 'right'],
      boundary: 20,
      offset: 5,
    })
    expect(result).toBe('bottom')
  })

  test('available only top position', () => {
    const result = getAvailablePlacement({
      popupRect: new DOMRect(0, 0, 100, 100),
      triggerRect: new DOMRect(30, 300, 400, 200),
      clientRegion: new ClientRegionDTO(500, 500),
      placementOrder: ['left', 'top', 'bottom', 'right'],
      boundary: 30,
      offset: 30,
    })
    expect(result).toBe('top')
  })

  test('available only left position', () => {
    const result = getAvailablePlacement({
      popupRect: new DOMRect(0, 0, 100, 200),
      triggerRect: new DOMRect(230, 100, 200, 400),
      clientRegion: new ClientRegionDTO(500, 500),
      placementOrder: ['left', 'top', 'bottom', 'right'],
      boundary: 0,
      offset: 20,
    })
    expect(result).toBe('left')
  })

  test('available only bottom position', () => {
    const result = getAvailablePlacement({
      popupRect: new DOMRect(0, 0, 100, 100),
      triggerRect: new DOMRect(30, 100, 400, 200),
      clientRegion: new ClientRegionDTO(500, 500),
      placementOrder: ['left', 'top', 'bottom', 'right'],
      boundary: 30,
      offset: 30,
    })
    expect(result).toBe('bottom')
  })

  test('available only right position', () => {
    const result = getAvailablePlacement({
      popupRect: new DOMRect(0, 0, 100, 200),
      triggerRect: new DOMRect(30, 100, 200, 400),
      clientRegion: new ClientRegionDTO(500, 500),
      placementOrder: ['left', 'top', 'bottom', 'right'],
      boundary: 30,
      offset: 30,
    })
    expect(result).toBe('right')
  })

  test('no available variants', () => {
    const result = getAvailablePlacement({
      popupRect: new DOMRect(0, 0, 500, 500),
      triggerRect: new DOMRect(350, 350, 20, 20),
      clientRegion: new ClientRegionDTO(700, 700),
      placementOrder: ['bottom', 'top', 'right', 'left'],
      boundary: 150,
      offset: 10,
    })
    expect(result).toBe('bottom')
  })

  test('trigger element greather client region', () => {
    const result = getAvailablePlacement({
      popupRect: new DOMRect(0, 0, 500, 500),
      triggerRect: new DOMRect(350, 350, 600, 600),
      clientRegion: new ClientRegionDTO(500, 500),
      placementOrder: ['bottom', 'top', 'right', 'left'],
      boundary: 10,
      offset: 10,
    })
    expect(result).toBe('bottom')
  })

  test('placementOrder empty, should return default', () => {
    const result = getAvailablePlacement({
      popupRect: new DOMRect(0, 0, 0, 0),
      triggerRect: new DOMRect(0, 0, 0, 0),
      clientRegion: new ClientRegionDTO(500, 500),
      placementOrder: [],
      boundary: 0,
      offset: 0,
    })
    expect(result).toBe('bottom')
  })
})
