import { FC, memo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/shared/ui/Icon'
import { classNames } from '@/shared/lib/classNames'
import { Popover } from '../Popover'
import s from './code.module.scss'

interface CodeProps {
  code?: string
  className?: string
}

export const Code: FC<CodeProps> = memo((props) => {
  const { code = '', className } = props
  const { t } = useTranslation(['common'])
  const [isVisibleCopiedTooltip, setIsVisibleCopiedTooltip] = useState(false)
  const copiedTooltipTimeout = useRef<NodeJS.Timeout>()

  const onCopy = () => {
    clearTimeout(copiedTooltipTimeout.current)

    navigator.clipboard.writeText(code)
    setIsVisibleCopiedTooltip(true)

    copiedTooltipTimeout.current = setTimeout(() => {
      setIsVisibleCopiedTooltip(false)
    }, 500)
  }

  return (
    <div className={classNames(s.code, className)}>
      <Popover
        visible={isVisibleCopiedTooltip}
        content={t('common.ui.code.copied', 'Скопировано!')}
      >
        <Icon
          icon='ph-copy'
          className={s.copyIcon}
          onClick={onCopy}
          hovered
          size='l'
        />
      </Popover>
      <pre>{code}</pre>
    </div>
  )
})
