import images from 'assets/images'
import { Button } from 'components/Button/Button'
import { InputPassword } from 'components/InputPassword'
import { Input } from 'components/Input'
import { useState } from 'react'
import { useGlobalContext } from 'hooks/context'
import AuthCard from 'components/Card/AuthCard'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import { LocalStorage } from 'utils'
import { StorageKey } from 'config/storage'
import { useMutation } from 'react-query'
import { getData } from 'hooks/useRequest'
import { API } from 'config/api'

export const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { openAlert, closeAlert } = useGlobalContext()
  const storage = new LocalStorage()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState({ email: '', password: '' })

  const { mutate: loginInput } = useMutation(
    (form) => getData(API.LOGIN, form),
    {
      onSuccess: () => {
        storage.setItem(StorageKey.ACCESS_TOKEN, {
          access_token: 'acess_token_dummy',
          token_type: 'Bearer',
        })
        storage.setItem(StorageKey.IS_LOGIN, true)

        openAlert({
          title: 'Halo lagi,',
          messages: 'Prima Kusumo',
          icon: images.ai_profile_thumbnail,
        })
        let timeOut = setTimeout(() => {
          navigate('/')
          closeAlert({ isConfirm: false, showLoading: false })
        }, 1200)
        return () => clearTimeout(timeOut)
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
      console.log(findErrors)
    } else {
      loginInput(form)
    }
  }

  const handleChangeForm = (e) => {
    const { name, value } = e
    if (name) {
      setForm({ ...form, [name]: value })
      setError({ email: '', password: '' })
    }
  }

  return (
    <AuthCard>
      <h2 className='mb-[1rem] text-green-900 text-2xl font-semibold text-center'>
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
        className='font-bold text-gray-900 ms-[16px] cursor-pointer'
        onClick={() => console.log('Tautan diklik!')}
      >
        {t('forgot_password', { keyPrefix: 'auth.register' })}
      </div>

      <Button
        // onClick={() => openAlert({ title: 'Halo Dek,', messages: 'Prima Kusumo', image: images.apple })}
        label={'Login'}
        onClick={onSubmit}
        iconRight={images.chevron_right}
        iconClassName={'absolute right-4'}
        disabled={!form.password || !form.email || !validateEmail(form.email)}
        className={
          'btn-secondary-hover w-full mt-[2rem] mb-[1rem] rounded-full font-medium relative'
        }
      />

      <p className='text-center font-medium'>
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
