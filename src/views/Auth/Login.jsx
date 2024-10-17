import images from 'assets/images'
import { Button } from 'components/Button/Button'
import { InputPassword } from 'components/InputPassword'
import { Input } from 'components/Input'
import { useEffect, useState } from 'react'
import { useGlobalContext } from 'hooks/context'
import AuthCard from 'components/Card/AuthCard'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import { LocalStorage } from 'utils'
import { StorageKey } from 'config/storage'
import { useMutation } from 'react-query'
import { getData } from 'hooks/useRequest'
import { API } from 'config/api'
import { useDebounce } from 'hooks/useDebounce'

export const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { openAlert, closeAlert } = useGlobalContext()
  const storage = new LocalStorage()
  const [errorText, setErrorText] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState({ email: '', password: '' })
  const [errorInput, setErrorInput] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const debauncedEmail = useDebounce(form.email, 200)

  useEffect(() => {
    if (debauncedEmail) {
      setErrorEmail('')
      if (!validateEmail(form.email)) {
        setErrorEmail(t('auth.register.validate_email_format'))
      } else {
        setErrorEmail('')
      }
    }
  }, [debauncedEmail])

  const { mutate: loginInput, isLoading: loadingLogin } = useMutation(
    (form) => getData(API.LOGIN, form),
    {
      onSettled: (data) => {
        if (data.status === 'Success') {
          storage.setItem(StorageKey.ACCESS_TOKEN, {
            access_token: data?.data,
            token_type: 'Bearer',
          })
          storage.setItem(StorageKey.IS_LOGIN, true)
          openAlert({
            title: `${t('auth.login.welcome_message')},${
              data?.message?.split(',')[1]
            }`,
            icon: images.ai_profile_thumbnail,
          })
          let timeOut = setTimeout(() => {
            navigate('/', { replace: true })
            closeAlert({ isConfirm: false, showLoading: false })
          }, 800)
          return () => clearTimeout(timeOut)
        } else {
          if (data?.message === 'unverified user') {
            navigate('/auth/register/otp', {
              state: {
                isFromLogin: true,
                email: form.email,
                user_uuid: data?.data?.uuid,
              },
            })
          } else {
            setErrorText(data?.message)
            setErrorInput(true)
          }
        }
      },
    }
  )

  const validationForm = () => {
    const newError = { ...error }

    if (form.password.length < 7) {
      newError.password = t('auth.register.error_messages.password_characters')
    } else if (!form.password) {
      newError.password = t('auth.register.error_messages.password_not_empty')
    } else if (!validateEmail(form.email)) {
      newError.email = t('auth.register.validate_email_format')
    }
    return newError
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const onSubmit = () => {
    const findErrors = validationForm()
    if (Object.values(findErrors).some((err) => err !== '')) {
      setError(findErrors)
    } else {
      loginInput(form)
    }
    setErrorText('')
    setErrorInput('')
  }

  const handleChangeForm = (e) => {
    const { name, value } = e
    setErrorText('')
    setErrorInput('')
    if (name) {
      setForm({ ...form, [name]: value })
      setError({ email: '', password: '' })
    }
  }

  return (
    <AuthCard>
      <h2 className="mb-[1rem] text-green-900 text-xl font-semi-bold text-center">
        {t('login_using_registered_email', { keyPrefix: 'auth.register' })}
      </h2>

      <Input
        name="email"
        value={form.email}
        onChange={handleChangeForm}
        className="w-full rounded-full flex flex-col !items-start"
        inputClass={`!border-secondary-logo focus:outline-secondary-logo font-medium  ${
          errorInput || errorEmail
            ? '!border-[#DB0000] !bg-[#FFF5DB] text-[#DB0000]'
            : ''
        } `}
        rowed
        placeholder={t('email', { keyPrefix: 'auth.register' })}
        error={error.email || errorEmail}
        classNameError="!ms-auto"
      />

      <InputPassword
        name="password"
        className="w-full mt-[1.5rem] mb-[4px] justify-end"
        inputClassName={`!border-secondary-logo focus:outline-secondary-logo font-medium  ${
          errorInput ? '!border-[#DB0000] !bg-[#FFF5DB] text-[#DB0000]' : ''
        }`}
        placeholder={t('password', { keyPrefix: 'auth.register' })}
        value={form.password}
        onChange={handleChangeForm}
        error={error.password}
        classNameError="!justify-end"
      />

      <div
        className="font-bold text-gray-900 ms-[16px] mb-3 cursor-pointer text-sm"
        onClick={() => navigate('/auth/forgot-password')}
      >
        {t('forgot_password', { keyPrefix: 'auth.register' })}
      </div>

      {errorText && (
        <div className="text-error-base mb-4 text-xs text-center">
          {errorText}
        </div>
      )}

      <Button
        label={'Login'}
        onClick={onSubmit}
        iconRight={images.chevron_right}
        iconClassName={'absolute right-4'}
        disabled={
          !form.password ||
          !form.email ||
          errorEmail ||
          loadingLogin ||
          errorText
        }
        className={
          'btn-secondary-hover w-full mb-[1rem] rounded-full font-medium relative'
        }
      />

      <p className="text-center font-medium text-sm hidden md:inline-block">
        {t('dont_have_an_account_yet', { keyPrefix: 'auth.register' })}
        <NavLink
          className="font-bold text-gray-900 underline ms-1"
          to="/auth/register"
        >
          {t('registration', { keyPrefix: 'auth.register' })}
        </NavLink>
      </p>
    </AuthCard>
  )
}
