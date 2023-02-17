import { FC, ReactNode, useState } from 'react'
import { Dialog } from '@/shared/ui/Dialog'
import { classNames } from '@/shared/lib/classNames'
import s from './popover.module.scss'

interface PopoverProps {
  content?: ReactNode
  className?: string
}

export const Popover: FC<PopoverProps> = (props) => {
  const { children, content, className } = props
  
  return (
    <Dialog trigger={children}>
      <div className={classNames(s.popover, className)}>{content}</div>
    </Dialog>
  )
}
