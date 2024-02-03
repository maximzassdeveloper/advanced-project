import { FC } from 'react'
import { Button, Icon, Row } from '@/shared/ui'
import { ArticleView } from '../../model/const'
import { classNames } from '@/shared/lib/classNames'

interface ArticlesViewSelectProps {
  value: ArticleView
  onChange: (value: ArticleView) => void
}

const views = [
  {
    type: ArticleView.GRID,
    icon: 'ph ph-grid-four',
  },
  {
    type: ArticleView.LIST,
    icon: 'ph ph-list-dashes',
  },
]

export const ArticlesViewSelect: FC<ArticlesViewSelectProps> = (props) => {
  const { value, onChange } = props

  return (
    <Row>
      {views.map((view) => (
        <Button
          key={view.type}
          className={classNames({ f: value === view.type })}
          onClick={() => onChange?.(view.type)}
        >
          <Icon icon={view.icon} />
        </Button>
      ))}
    </Row>
  )
}
