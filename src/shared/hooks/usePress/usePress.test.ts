import { renderHook } from '@testing-library/react'
import { usePress } from './usePress'

describe('usePress', () => {
  test('basic case', () => {
    const onMouseDown = jest.fn()
    const onMouseUp = jest.fn()

    const { result } = renderHook(() => usePress({ onMouseDown, onMouseUp }))

    // expect(result.current).toEqual({
    //   isPressed: false,
    //   pressProps: {
    //     onMouseDown: () => undefined,
    //     onMouseUp: () => undefined,
    //   },
    // })
  })
})
