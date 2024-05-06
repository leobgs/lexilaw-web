import images from 'assets/images'
import { Button } from 'components/Button/Button'
import { InputPassword } from 'components/InputPassword'
import { Input } from 'components/Input'
import { useState } from 'react'
import { useGlobalContext } from 'hooks/context'
import AuthCard from 'components/Card/AuthCard'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LocalStorage } from 'utils'
import { StorageKey } from 'config/storage'
import { useMutation } from 'react-query'
import { getData } from 'hooks/useRequest'
import { API } from 'config/api'

export const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { openAlert, closeAlert } = useGlobalContext()
  const storage = new LocalStorage()
  const [errorText, setErrorText] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState({ email: '', password: '' })

  const { mutate: loginInput } = useMutation(
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
            title: data?.message,
            icon: images.ai_profile_thumbnail,
          })
          let timeOut = setTimeout(() => {
            navigate('/', { replace: true })
            closeAlert({ isConfirm: false, showLoading: false })
          }, 500)
          return () => clearTimeout(timeOut)
        } else {
          setErrorText(data?.message)
        }
      },
    }
  )

  const validationForm = () => {
    const newError = { ...error }

    if (form.password.length < 7) {
      newError.password = 'Minimal Password 8 karakter'
    } else if (!form.password) {
      newError.password = 'Password tidak boleh kosong'
    } else if (!validateEmail(form.email)) {
      newError.email = 'Format Email Tidak sesuai'
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
  }

  const handleChangeForm = (e) => {
    const { name, value } = e
    setErrorText('')
    if (name) {
      setForm({ ...form, [name]: value })
      setError({ email: '', password: '' })
    }
  }

  return (
    <AuthCard>
      <h2 className='mb-[1rem] text-green-900 text-xl font-semi-bold text-center'>
        {t('login_using_registered_email', { keyPrefix: 'auth.register' })}
      </h2>

      <Input
        name='email'
        value={form.email}
        onChange={handleChangeForm}
        className='w-full rounded-full flex flex-col !items-start'
        inputClass='!border-secondary-logo focus:outline-secondary-logo font-medium'
        rowed
        placeholder={t('email', { keyPrefix: 'auth.register' })}
        error={error.email}
      />

      <InputPassword
        name='password'
        className='w-full mt-[1.5rem] mb-[4px]'
        inputClassName='!border-secondary-logo focus:outline-secondary-logo font-medium'
        placeholder={t('password', { keyPrefix: 'auth.register' })}
        value={form.password}
        onChange={handleChangeForm}
        error={error.password}
      />

      <div
        className='font-bold text-gray-900 ms-[16px] cursor-pointer text-sm'
        onClick={() => navigate('/auth/forgot-password')}
      >
        {t('forgot_password', { keyPrefix: 'auth.register' })}
      </div>

      <Button
        label={'Login'}
        onClick={onSubmit}
        iconRight={images.chevron_right}
        iconClassName={'absolute right-4'}
        disabled={!form.password || !form.email || !validateEmail(form.email)}
        className={
          'btn-secondary-hover w-full mt-[2rem] mb-[1rem] rounded-full font-medium relative'
        }
      />

      {errorText && (
        <div className='bg-error-base bg-opacity-20 border-1 border-error-base border rounded-lg w-fit mb-4'>
          <p className='font-semi-bold text-error-base px-2'>{errorText}</p>
        </div>
      )}

      <p className='text-center font-medium text-sm'>
        {t('dont_have_an_account_yet', { keyPrefix: 'auth.register' })}
        <NavLink
          className='font-bold text-gray-900 underline ms-1'
          to='/auth/register'
        >
          {t('registration', { keyPrefix: 'auth.register' })}
        </NavLink>
      </p>
    </AuthCard>
  )
}
