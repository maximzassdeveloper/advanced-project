import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export function useValidationMessages() {
  const { t } = useTranslation(['common'])

  return useMemo(
    () => ({
      required: t('common:validation.required', 'Это поле обязательно'),
      min: (num: number) => t('common:validation.min', 'Минимальное число: {{ num }}', { num }),
      max: (num: number) => t('common:validation.max', 'Максимальное число: {{ num }}', { num }),
      minLength: (num: number) =>
        t('common:validation.minLength', 'Минимальная длина: {{ num }}', { num }),
      maxLength: (num: number) =>
        t('common:validation.maxLength', 'Максимальная длина: {{ num }}', { num }),
    }),
    [t]
  )
}
