import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export function useValidationMessages() {
  const { t } = useTranslation(['common'])

  return useMemo(
    () => ({
      required: t('common:validation.required', 'Это поле обязательно'),
    }),
    [t]
  )
}
