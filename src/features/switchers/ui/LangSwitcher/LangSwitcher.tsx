import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import s from './langSwitcher.module.scss'

export const LangSwitcher: FC = () => {
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation()

  const defaultText = useMemo(() => (language === 'ru' ? 'Рус' : 'En'), [language])

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'ru' : 'en')
  }

  return (
    <div
      className={s.langSwitcher}
      onClick={toggleLanguage}
    >
      <i className='ph-translate' />
      <span>{t('language', defaultText)}</span>
    </div>
  )
}
