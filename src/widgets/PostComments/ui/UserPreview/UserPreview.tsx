import { FC, ReactElement, useEffect, useState } from 'react'
import { User } from '../../model/types/comment'
import { Popover, Spinner } from '@/shared/ui'
import s from './UserPreview.module.scss'

interface UserPreviewProps {
  username: User['username']
  children: ReactElement
}

export const UserPreview: FC<UserPreviewProps> = (props) => {
  const { username, children } = props
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      // fake request
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [username, isOpen])

  return (
    <Popover
      className={s.userPreview}
      visible={isOpen}
      onVisibleChange={setIsOpen}
      align='start'
      trigger={['hover', 'click']}
      content={isLoading ? <Spinner fullPage /> : <div>{username}</div>}
    >
      {children}
    </Popover>
  )
}
