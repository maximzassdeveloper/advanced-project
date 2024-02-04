import { useEffect, useRef } from 'react'
import { useEvent } from './useEvent'

export const useDebounceCallback = (cb: ((...args: any[]) => any) | undefined, ms: number) => {
  const timeoutRef = useRef<NodeJS.Timeout>()

  const callback = useEvent((...args: any[]) => {
    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      cb?.(...args)
    }, ms)
  })

  useEffect(() => {
    return () => {
      clearInterval(timeoutRef.current)
    }
  }, [])

  return callback
}
