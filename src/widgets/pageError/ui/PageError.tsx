import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Row, Title } from '@/shared/ui'
import s from './pageError.module.scss'

export const PageError: FC = () => {
  const { t } = useTranslation()

  const reloadHandler = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  return (
    <Row
      className={s.pageError}
      justify='center'
      align='center'
      direction='column'
      gap={16}
    >
      <Title>{t('pageError.somethingWentWrong', 'Что-то пошло не так')}</Title>
      <Button onClick={reloadHandler}>{t('pageError.reloadBtn', 'Перезагрузить страницу')}</Button>
    </Row>
  )
}
