import { FC } from 'react'
import { Button, Icon, Row } from '@/shared/ui'
import { ArticleView } from '../../model/const'
import { classNames } from '@/shared/lib/classNames'
import s from './articles-view-select.module.scss'

const views = [
  {
    type: ArticleView.GRID,
    icon: 'ph-bold ph-squares-four',
  },
  {
    type: ArticleView.LIST,
    icon: 'ph-bold ph-rows',
  },
]

interface ArticlesViewSelectProps {
  value: ArticleView
  onChange: (value: ArticleView) => void
  className?: string
}

export const ArticlesViewSelect: FC<ArticlesViewSelectProps> = (props) => {
  const { value, onChange, className } = props

  return (
    <Row className={className}>
      {views.map((view) => (
        <Button
          key={view.type}
          theme='icon'
          color=''
          className={classNames(s.btn, { [s.active]: value === view.type })}
          onClick={() => onChange?.(view.type)}
        >
          <Icon icon={view.icon} />
        </Button>
      ))}
    </Row>
  )
}
