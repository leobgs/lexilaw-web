import images from 'assets/images'
import { Button } from 'components/Button/Button'
import { InputPassword } from 'components/InputPassword'
import { Input } from 'components/Input'
import React, { useState } from 'react'
import { useGlobalContext } from 'hooks/context'
import AuthCard from 'components/Card/AuthCard'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { LocalStorage } from 'utils'
import { StorageKey } from 'config/storage'

export const Login = () => {
  const { t } = useTranslation()
  const storage = new LocalStorage()
  const { openAlert, closeAlert } = useGlobalContext()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const onSubmit = () => {
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
  }

  const handleChangeForm = (e) => {
    // if (!e) return;
    const { name, value } = e

    if (name) {
      setForm({ ...form, [name]: value })
      setError('')
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
        className='w-full rounded-full'
        inputClass='!border-secondary-logo focus:outline-secondary-logo font-medium'
        rowed
        placeholder={t('email', { keyPrefix: 'auth.register' })}
      />

      <InputPassword
        name='password'
        className='w-full mt-[1.5rem] mb-[4px]'
        inputClassName='!border-secondary-logo focus:outline-secondary-logo font-medium'
        placeholder={t('password', { keyPrefix: 'auth.register' })}
        value={form.password}
        onChange={handleChangeForm}
        error={error}
      />

      <a className='font-bold text-gray-900 ms-[16px]' href=''>
        {t('forgot_password', { keyPrefix: 'auth.register' })}
      </a>

      <Button
        // onClick={() => openAlert({ title: 'Halo Dek,', messages: 'Prima Kusumo', image: images.apple })}
        label={'Login'}
        onClick={onSubmit}
        iconRight={images.chevron_right}
        iconClassName={'absolute right-4'}
        disabled={!form.password || !form.email}
        className={
          'btn-secondary-hover w-full mt-[2rem] mb-[1rem] rounded-full font-medium relative'
        }
      />

      <p className='text-center font-medium'>
        {t('dont_have_an_account_yet', { keyPrefix: 'auth.register' })}
        <a
          className='font-bold text-gray-900 underline ms-1'
          href='/auth/register'
        >
          {t('registration', { keyPrefix: 'auth.register' })}
        </a>
      </p>
    </AuthCard>
  )
}
