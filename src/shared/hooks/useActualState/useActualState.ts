import { Dispatch, SetStateAction, useState } from 'react'
import { useEvent } from '@/shared/hooks'

export const useActualState = <T>(
  outState: T | undefined,
  defaultInnerState: T,
  onChangeState?: (val: T) => void
) => {
  const [innerState, setInnerState] = useState(defaultInnerState)

  const state = outState === undefined ? innerState : outState

  const setState = useEvent((value: T | ((v: T) => T)) => {
    if (outState === undefined) {
      return setInnerState(value)
    }

    if (typeof value === 'function') {
      const typedValue = value as (v: T) => T
      onChangeState?.(typedValue(state))
    } else {
      onChangeState?.(value)
    }
  })

  return [state, setState] as [T, Dispatch<SetStateAction<T>>]
}
