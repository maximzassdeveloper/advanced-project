import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  useAppSelector,
  useAppDispatch,
  useValidationMessages,
  useLoadAsyncReducer,
} from '@/shared/hooks'
import { Button, Input, Title, Typography } from '@/shared/ui'
import { login } from '../../model/services/login'
import { getLogin } from '../../model/selectors/getLogin'
import { LoginError } from '../../model/types/loginSchema'
import { loginReducer } from '../../model/slices/loginSlice'
import s from './loginForm.module.scss'

interface LoginFormFields {
  username: string
  password: string
}

interface LoginFormProps {
  onSuccess: () => void
}

const LoginForm: FC<LoginFormProps> = (props) => {
  const { onSuccess } = props
  const { t } = useTranslation()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>()

  useLoadAsyncReducer('login', loginReducer)
  const validationMessages = useValidationMessages()
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector(getLogin)

  const submitHandler = async (values: LoginFormFields) => {
    const response = await dispatch(login(values)).unwrap()
    if (response) {
      onSuccess()
      reset()
    }
  }

  const getErrorMessage = () => {
    switch (error) {
      case LoginError.INCORRECT:
        return t('main:loginForm.errors.incorrect', 'Некорректные данные')
      case LoginError.SERVER:
        return t('main:loginForm.errors.server', 'Ошибка сервера')
      default:
        return t('main:loginForm.errors.unknown', 'Непредвиденная ошибка')
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={s.loginForm}>
      <Title level='h2' className='mb-16'>
        {t('main:loginForm.title', 'Авторизация')}
      </Title>

      {error && (
        <Typography.Text theme='error' className='mb-2'>
          {getErrorMessage()}
        </Typography.Text>
      )}

      <Input
        {...register('username', { required: validationMessages.required })}
        className='mb-12'
        label={t('main:loginForm.username', 'Имя')}
        error={errors.username?.message}
        placeholder={t('main:loginForm.username', 'Имя')}
      />
      <Input
        {...register('password', { required: validationMessages.required })}
        className='mb-24'
        label={t('main:loginForm.password', 'Пароль')}
        type='password'
        error={errors.password?.message}
        placeholder={t('main:loginForm.password', 'Пароль')}
      />
      <Button type='submit' className={s.loginBtn + ' full-width'} loading={isLoading}>
        {t('main:loginForm.loginBtn', 'Войти')}
      </Button>
    </form>
  )
}

export default LoginForm
