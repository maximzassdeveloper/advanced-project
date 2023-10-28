import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useValidationMessages } from '@/shared/hooks'
import { Button, Textarea, Title } from '@/shared/ui'

export interface AddCommentFormFields {
  text: string
  createdAt: string
}

interface AddCommentFormProps {
  onCreate: (values: AddCommentFormFields) => void
  isLoading?: boolean
  className?: string
}

export const AddCommentForm: FC<AddCommentFormProps> = memo((props) => {
  const { onCreate, isLoading, className } = props
  const { t } = useTranslation(['comments', 'common'])
  const { register, handleSubmit, formState } = useForm<AddCommentFormFields>()
  const { errors } = formState
  const validationMessages = useValidationMessages()

  const onSubmit = handleSubmit((values) => {
    onCreate({ ...values, createdAt: String(new Date()) })
  })

  return (
    <form
      className={className}
      onSubmit={onSubmit}
    >
      <Title level='h2'>{t('comments:add.title', 'Добавить комментарий')}</Title>
      <Textarea
        {...register('text', { required: validationMessages.required })}
        error={errors.text?.message}
        disabled={isLoading}
      />
      <Button
        className='mt-2'
        type='submit'
        loading={isLoading}
      >
        {t('common:buttons.add', 'Добавить')}
      </Button>
    </form>
  )
})
