import { FC } from 'react'
import { Badge } from '../Badge/Badge'
import { Icon } from '@/shared/ui'
import s from './Karma.module.scss'
import { classNames } from '@/shared/lib/classNames'

interface KarmaProps {
  karma: number
  upVoted: boolean
  downVoted: boolean
  onKarmaUp?: (karma: number) => void
  onKarmaDown?: (karma: number) => void
}

export const Karma: FC<KarmaProps> = (props) => {
  const { karma, upVoted, downVoted, onKarmaDown, onKarmaUp } = props

  return (
    <div className={s.karma}>
      <Badge className={classNames({ [s.active]: upVoted })} onClick={() => onKarmaUp?.(karma + 1)}>
        <Icon icon='ph ph-arrow-fat-up' />
      </Badge>
      <span>{karma}</span>
      <Badge
        className={classNames({ [s.active]: downVoted })}
        onClick={() => onKarmaDown?.(karma - 1)}
      >
        <Icon icon='ph ph-arrow-fat-down' />
      </Badge>
    </div>
  )
}
