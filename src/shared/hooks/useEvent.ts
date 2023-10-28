import { useCallback } from 'react'
import { useCashProps } from './useCashedProps'

export const useEvent = <T extends (...args: any[]) => any>(callback: T) => {
  const cashedCallback = useCashProps(callback)

  const resultCallback = useCallback(
    (...args: Parameters<T>) => {
      cashedCallback.current.apply(null, args)
    },
    [cashedCallback]
  )

  return resultCallback
}
