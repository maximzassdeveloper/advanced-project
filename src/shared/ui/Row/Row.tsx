import { ReactNode } from 'react'
import s from './row.module.scss'
import { RowAlign, RowDirection, RowGap, RowJustify } from './types'
import { classNames } from '@/shared/lib/classNames'

interface RowProps {
  className?: string
  direction?: RowDirection
  gap?: RowGap
  align?: RowAlign
  justify?: RowJustify
  children: ReactNode
}

const directionClasses: Record<RowDirection, string> = {
  row: s.row,
  column: s.column,
}

const gapClasses: Record<RowGap, string> = {
  0: s.gap0,
  2: s.gap2,
  4: s.gap4,
  8: s.gap8,
  16: s.gap16,
  24: s.gap24,
}

const alignClasses: Record<RowAlign, string> = {
  center: s.alignCenter,
  start: s.alignStart,
  end: s.alignEnd,
}

const jusitfyClasses: Record<RowJustify, string> = {
  between: s.justifyBetween,
  center: s.justifyCenter,
  start: s.justifyStart,
  end: s.justifyEnd,
}

export const Row = (props: RowProps) => {
  const { children, className, direction, gap, align, justify } = props

  const classes = classNames(
    className,
    s.flex,
    directionClasses[direction ?? 'row'],
    gapClasses[gap ?? 0],
    alignClasses[align ?? 'center'],
    jusitfyClasses[justify ?? 'start']
  )

  return <div className={classes}>{children}</div>
}
