import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui'
import s from './pageError.module.scss'

export const PageError: FC = () => {
  const { t } = useTranslation()

  const reloadHandler = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  return (
    <div className={s.pageError}>
      <h3 className={s.title}>{t('pageError.somethingWentWrong', 'Что-то пошло не так')}</h3>
      <Button onClick={reloadHandler}>{t('pageError.reloadBtn', 'Перезагрузить страницу')}</Button>
    </div>
  )
}
