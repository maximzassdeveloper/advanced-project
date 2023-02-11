import { MouseEvent, MouseEventHandler, RefObject, useCallback } from 'react'
import s from './wave.module.scss'

interface UseAddWaveResult<T> {
  onMouseUp: MouseEventHandler<T>
}

interface UseAddWaveOptions<T> {
  disabled?: boolean
  onMouseUp?: MouseEventHandler<T>
}

const createWave = <T extends HTMLElement>(node: T): HTMLElement => {
  const waveSpan = document.createElement('span')
  waveSpan.classList.add(s.wave)
  node.insertBefore(waveSpan, node.firstChild)

  return waveSpan
}

/**
 * Add wave effect on click
 * @param nodeRef
 * @param options
 */

export const useAddWave = <T extends HTMLElement>(
  nodeRef: RefObject<T>,
  options: UseAddWaveOptions<T> = {}
): UseAddWaveResult<T> => {
  const { disabled, onMouseUp: outOnMouseUp } = options

  const onMouseUp = useCallback(
    (e: MouseEvent<T>) => {
      if (!disabled && nodeRef.current) {
        const waveElement = createWave<T>(nodeRef.current)

        setTimeout(() => {
          waveElement.remove()
        }, 1000)
      }

      outOnMouseUp?.(e)
    },
    [nodeRef, outOnMouseUp, disabled]
  )

  return {
    onMouseUp,
  }
}
