import { FC, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames'
import s from './langSwitcher.module.scss'

interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher: FC<LangSwitcherProps> = memo((props) => {
  const { className } = props
  const {
    i18n: { language, changeLanguage },
  } = useTranslation()

  const languageText = useMemo(() => (language === 'ru' ? 'Ru' : 'En'), [language])

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'ru' : 'en')
  }

  return (
    <div
      className={classNames(s.langSwitcher, className)}
      onClick={toggleLanguage}
    >
      <i className='ph-translate' />
      <span>{languageText}</span>
    </div>
  )
})
