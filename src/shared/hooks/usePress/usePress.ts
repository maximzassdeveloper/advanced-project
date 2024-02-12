import { HTMLAttributes, MouseEvent, MouseEventHandler, useCallback, useState } from 'react'

interface UsePressResult<T> {
  isPressed: boolean
  pressProps: {
    onMouseDown: MouseEventHandler<T>
    onMouseUp: MouseEventHandler<T>
  }
}

export const usePress = <T extends HTMLElement>(
  props: HTMLAttributes<T> = {}
): UsePressResult<T> => {
  const { onMouseDown: outOnMouseDown, onMouseUp: outOnMouseUp } = props

  const [isPressed, setIsPressed] = useState(false)

  const onMouseDown = useCallback(
    (e: MouseEvent<T>) => {
      setIsPressed(true)
      outOnMouseDown?.(e)
    },
    [outOnMouseDown]
  )

  const onMouseUp = useCallback(
    (e: MouseEvent<T>) => {
      setIsPressed(false)
      outOnMouseUp?.(e)
    },
    [outOnMouseUp]
  )

  return {
    isPressed,
    pressProps: {
      onMouseDown,
      onMouseUp,
    },
  }
}

