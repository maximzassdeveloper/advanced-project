import { FC, memo, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Result, Spinner } from '@/shared/ui'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { useLoadAsyncReducer } from '@/shared/hooks/useLoadAsyncReducer'

import { ProfileHeader } from '../ProfileHeader/ProfileHeader'
import { ProfileForm } from '../ProfileForm/ProfileForm'

import { profileActions, profileReducer } from '../../model/slice/profileSlice'
import { fetchProfile } from '../../model/services/fetchProfile'
import { Profile, ProfileError } from '../../model/types/profile'
import { getProfileIsLoading } from '../../model/selectors/getPorfileIsLoading'
import { getProfileError } from '../../model/selectors/getProfileError'

interface EditableProfileProps {
  profileId: string
}

export const EditableProfile: FC<EditableProfileProps> = memo((props) => {
  const { profileId } = props
  const { t } = useTranslation(['profile'])

  useLoadAsyncReducer('profile', profileReducer)

  const form = useForm<Profile>()
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(getProfileIsLoading)
  const error = useAppSelector(getProfileError)

  useEffect(() => {
    if (__PROJECT__ === 'frontend') {
      dispatch(fetchProfile(Number(profileId)))
      profileActions.setIsReadonly(true)
    }
  }, [dispatch, profileId])

  if (error && error !== ProfileError.ON_SAVE) {
    return (
      <Result
        status='error'
        title={t('profile:error.title', 'Произошла ошибка')}
        desc={t('profile:error.desc', 'Попробуйте обновить страницу')}
      />
    )
  }

  return (
    <FormProvider {...form}>
      <form>
        <ProfileHeader />
        {isLoading ? <Spinner fullPage /> : <ProfileForm />}
      </form>
    </FormProvider>
  )
})
