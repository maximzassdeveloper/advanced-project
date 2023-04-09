import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames'
import s from './langSwitcher.module.scss'

interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher: FC<LangSwitcherProps> = (props) => {
  const { className } = props
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
      className={classNames(s.langSwitcher, className)}
      onClick={toggleLanguage}
    >
      <i className='ph-translate' />
      <span>{t('language', defaultText)}</span>
    </div>
  )
}
