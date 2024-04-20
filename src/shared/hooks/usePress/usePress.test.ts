import { MouseEvent } from 'react'
import { act, renderHook } from '@testing-library/react'
import { usePress } from './usePress'

describe('usePress', () => {
  test('correct change isPressed state', () => {
    const { result, rerender } = renderHook(() => usePress())
    expect(result.current.isPressed).toBe(false)

    act(() => {
      result.current.pressProps.onMouseDown({} as MouseEvent<HTMLElement>)
    })
    rerender()
    expect(result.current.isPressed).toBe(true)

    act(() => {
      result.current.pressProps.onMouseUp({} as MouseEvent<HTMLElement>)
    })
    rerender()
    expect(result.current.isPressed).toBe(false)
  })

  test('call onMouseDown and onMouseUp from props', () => {
    const onMouseDown = jest.fn()
    const onMouseUp = jest.fn()

    const { result } = renderHook(() => usePress({ onMouseDown, onMouseUp }))

    act(() => {
      result.current.pressProps.onMouseDown({} as MouseEvent<HTMLElement>)
    })
    expect(onMouseDown).toHaveBeenCalledTimes(1)

    act(() => {
      result.current.pressProps.onMouseUp({} as MouseEvent<HTMLElement>)
    })
    expect(onMouseUp).toHaveBeenCalledTimes(1)
  })
})
