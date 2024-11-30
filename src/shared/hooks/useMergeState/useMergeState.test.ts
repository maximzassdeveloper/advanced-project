import { act, renderHook } from '@testing-library/react'
import { useMergeState } from './useMergeState'

describe('useMergeState', () => {
  test('should correct work innerState', () => {
    const { result, rerender } = renderHook(() =>
      useMergeState(undefined, { defaultValue: 'init' })
    )
    const [state, setState] = result.current

    expect(state).toBe('init')
    expect(setState).toBeInstanceOf(Function)

    act(() => setState('newState'))
    rerender()
    expect(result.current[0]).toBe('newState')
  })

  test('should correct work innerState with prevState', () => {
    const { result, rerender } = renderHook(() =>
      useMergeState(undefined, {
        defaultValue: 'init',
      })
    )
    const [state, setState] = result.current

    expect(state).toBe('init')
    expect(setState).toBeInstanceOf(Function)

    act(() => setState((prev) => prev + '111'))
    rerender()
    expect(result.current[0]).toBe('init111')
  })

  test('should correct work outState', () => {
    const onChange = jest.fn()
    const { result, rerender } = renderHook(() =>
      useMergeState('outValue', {
        defaultValue: '',
        onChange,
      })
    )
    const [state, setState] = result.current

    expect(state).toBe('outValue')
    expect(setState).toBeInstanceOf(Function)

    act(() => setState('newOuValue'))
    rerender()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('newOuValue')
    expect(result.current[0]).toBe('outValue')
  })

  test('should correct work outState with prevState', () => {
    const onChange = jest.fn()
    const { result, rerender } = renderHook(() =>
      useMergeState<string>('outValue', {
        defaultValue: '',
        onChange,
      })
    )
    const [state, setState] = result.current

    expect(state).toBe('outValue')
    expect(setState).toBeInstanceOf(Function)

    act(() => setState((prev) => prev + '111'))
    rerender()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('outValue111')
    expect(result.current[0]).not.toBe('outValue111')
  })

  test('should call onChange when change innerState', () => {
    const onChange = jest.fn()
    const { result, rerender } = renderHook(() =>
      useMergeState<string>(undefined, {
        defaultValue: 'innerValue',
        onChange,
      })
    )
    const [state, setState] = result.current

    expect(state).toBe('innerValue')
    expect(setState).toBeInstanceOf(Function)

    act(() => setState('newInnerValue'))
    rerender()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('newInnerValue')
    expect(result.current[0]).toBe('newInnerValue')
  })

  test('should work wihout options', () => {
    const { result, rerender } = renderHook(() => useMergeState<string>(undefined))
    const [state, setState] = result.current

    expect(state).toBe(undefined)
    expect(setState).toBeInstanceOf(Function)

    act(() => setState('newInnerValue'))
    rerender()
    expect(result.current[0]).toBe('newInnerValue')
  })
})
