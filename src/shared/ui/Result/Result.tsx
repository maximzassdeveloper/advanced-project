import { ReactNode, memo } from 'react'
import { Title, Text } from '@/shared/ui'
import { classNames } from '@/shared/lib/classNames'
import s from './result.module.scss'

interface ResultProps {
  status?: 'success' | 'warning' | 'error' | 'default'
  className?: string
  title: string
  desc?: string
  extra?: ReactNode
}

export const Result = memo((props: ResultProps) => {
  const { className, status = 'default', title, desc, extra } = props

  return (
    <div className={classNames(s.result, className, s[status])}>
      <div className={s.icon}>
        {status === 'success' && <i className='ph ph-smiley' />}
        {status === 'error' && <i className='ph ph-smiley-sad' />}
        {status === 'warning' && <i className='ph ph-smiley-meh' />}
      </div>

      <Title
        className={s.title}
        level='h2'
      >
        {title}
      </Title>

      {!!desc && <Text className={s.desc}>{desc}</Text>}

      {extra}
    </div>
  )
})
