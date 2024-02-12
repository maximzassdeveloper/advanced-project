import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'

import { Button, Row, Title, Text } from '@/shared/ui'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'

import { getProfile } from '../../model/selectors/getProfile'
import { profileActions } from '../../model/slice/profileSlice'
import { saveProfile } from '../../model/services/saveProfile'
import { Profile, ProfileError } from '../../model/types/profile'
import s from './profile-header.module.scss'
import { getUserAuth } from '@/entities/User'

export const ProfileHeader: FC = memo(() => {
  const { t } = useTranslation(['profile'])
  const { handleSubmit, reset } = useFormContext<Profile>()

  const dispatch = useAppDispatch()
  const { error, isLoading, isReadonly, data: profile } = useAppSelector(getProfile)
  const user = useAppSelector(getUserAuth)

  const onStartEdit = () => {
    dispatch(profileActions.setIsReadonly(false))
  }

  const onCancel = () => {
    dispatch(profileActions.setIsReadonly(true))
    reset(profile)
  }

  const onSave = handleSubmit((values: Profile) => {
    dispatch(saveProfile(values))
  })

  const errorMessage = () => {
    if (!error) return
    switch (error) {
      case ProfileError.SERVER:
        return t('profile:errors.server', 'Ошибка сервера')
      case ProfileError.ON_SAVE:
        return t('profile:errors.onSave', 'Не удалось сохранить данные')
      case ProfileError.ON_GET:
        return t('profile:errors.onGet', 'Не удалось получить данные')
      default:
        return t('profile:errors.unknown', 'Непредвиденная ошибка')
    }
  }

  // eslint-disable-next-line
  const isOwner = profile?.id == user?.id

  return (
    <div className={s.header}>
      <Row justify='between'>
        <Title level='h1'>{t('profile:header.title', 'Профиль')}</Title>

        {isOwner && (
          <Row gap={8} justify='end'>
            {isReadonly ? (
              <>
                <Button disabled={isLoading} onClick={onStartEdit}>
                  {t('profile:header.buttons.edit', 'Редактировать')}
                </Button>
              </>
            ) : (
              <>
                <Button disabled={isLoading} onClick={onSave}>
                  {t('profile:header.buttons.save', 'Сохранить')}
                </Button>
                <Button disabled={isLoading} theme='outline' onClick={onCancel}>
                  {t('profile:header.buttons.cancel', 'Отмена')}
                </Button>
              </>
            )}
          </Row>
        )}
      </Row>

      {!!error && (
        <Text className={s.error} theme='error'>
          {errorMessage()}
        </Text>
      )}
    </div>
  )
})
