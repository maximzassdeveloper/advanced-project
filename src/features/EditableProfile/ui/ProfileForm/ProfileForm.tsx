import { FC, memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller, useFormContext } from 'react-hook-form'

import { Avatar, Input, Text } from '@/shared/ui'
import { useAppSelector, useValidationMessages } from '@/shared/hooks'
import { CountySelect } from '@/entities/Country'
import { CurrencySelect } from '@/entities/Currency'

import { Profile } from '../../model/types/profile'
import { getProfileData } from '../../model/selectors/getProfileData'
import { getProfileIsReadonly } from '../../model/selectors/getProfileIsReadonly'
import s from './profile-form.module.scss'

export const ProfileForm: FC = memo(() => {
  const { t } = useTranslation(['profile'])
  const {
    register,
    reset,
    control,
    watch,
    formState: { errors },
  } = useFormContext<Profile>()

  const validationMessages = useValidationMessages()
  const profileData = useAppSelector(getProfileData)
  const isReadonly = useAppSelector(getProfileIsReadonly)

  useEffect(() => {
    reset(profileData)
  }, [profileData, reset])

  return (
    <div className={s.form}>
      <div className={s.avatarBlock}>
        <Avatar src={watch('avatar')} size={150} />
      </div>

      <div className={s.fieldsBlock}>
        <div className={s.field}>
          <Text>{t('profile:form.username', 'Имя пользователя:')}</Text>
          <Input
            {...register('username', {
              required: validationMessages.required,
              minLength: { value: 3, message: validationMessages.minLength(3) },
            })}
            readOnly={isReadonly}
            error={errors.username?.message}
          />
        </div>

        <div className={s.field}>
          <Text>{t('profile:form.firstname', 'Имя:')}</Text>
          <Input
            {...register('fullName', { required: validationMessages.required })}
            readOnly={isReadonly}
            error={errors.fullName?.message}
          />
        </div>

        {/* <div className={s.field}>
          <Text>{t('profile:form.lastname', 'Фамилия:')}</Text>
          <Input
            {...register('', { required: validationMessages.required })}
            readOnly={isReadonly}
            error={errors.lastname?.message}
          />
        </div>

        <div className={s.field}>
          <Text>{t('profile:form.age', 'Возраст:')}</Text>
          <Input
            {...register('age', {
              min: {
                value: 0,
                message: validationMessages.min(0),
              },
              max: {
                value: 200,
                message: validationMessages.max(200),
              },
            })}
            type='number'
            readOnly={isReadonly}
            error={errors.age?.message}
          />
        </div>

        <div className={s.field}>
          <Text>{t('profile:form.city', 'Город:')}</Text>
          <Input {...register('city')} readOnly={isReadonly} />
        </div> */}

        <div className={s.field}>
          <Text>{t('profile:form.country', 'Страна:')}</Text>
          <Controller
            control={control}
            name='country'
            render={({ field: { onChange, value } }) => (
              <CountySelect readOnly={isReadonly} value={value} onChange={onChange} />
            )}
          />
        </div>

        <div className={s.field}>
          <Text>{t('profile:form.currency', 'Валюта:')}</Text>
          <Controller
            control={control}
            name='currency'
            render={({ field: { onChange, value } }) => (
              <CurrencySelect readOnly={isReadonly} value={value} onChange={onChange} />
            )}
          />
        </div>

        <div className={s.field}>
          <Text>{t('profile:form.avatar', 'Изображение:')}</Text>
          <Input {...register('avatar')} readOnly={isReadonly} />
        </div>
      </div>
    </div>
  )
})
