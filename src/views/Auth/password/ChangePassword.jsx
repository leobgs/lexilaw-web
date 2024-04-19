import { useState } from 'react'
import AuthCard from 'components/Card/AuthCard'
import { InputPassword } from 'components/InputPassword'
import { Button } from 'components'
import images from 'assets/images'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { putData } from 'hooks/useRequest'
import { API } from 'config/api'
import { notifyError } from 'hooks/useToas'
import axios from 'axios'

export const ChangePassword = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [form, setForm] = useState({ password: '', confirm_password: '' })
  const [error, setError] = useState({ password: '', confirm_password: '' })
  const [isSuccess, setSuccess] = useState(false)
  const location = useLocation()
  const uuid = location.state

  const { mutate: changePassword } = useMutation(
    (form) => putData(`${API.RESET_PASSWORD}/${uuid}`, form),
    {
      onSettled: (data) => {
        if (data?.status === 'Success') {
          setSuccess(true)
        } else {
          notifyError(data?.message)
        }
      },
    }
  )

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/
    return passwordRegex.test(password)
  }

  const validateInput = (name, value) => {
    switch (name) {
      case 'password':
        return validatePassword(value)
          ? ''
          : 'Invalid password must contain at least 1 upper case characters and 8 characters minimum'
      case 'confirm_password':
        return form.password === value ? '' : 'Password not match'
      default:
        return ''
    }
  }

  const handleChangeForm = (e) => {
    const { value, name } = e
    const errorMessage = validateInput(name, value)
    setError({ ...error, [name]: errorMessage })
    setForm({ ...form, [name]: value })
  }

  const onSubmit = () => {
    changePassword({ password: form.confirm_password })
  }

  return (
    <AuthCard>
      {isSuccess ? (
        <>
          <h1 className='text-4xl font-futura-bold'>
            {t('after_change_header', { keyPrefix: 'auth.reset_password' })}
          </h1>
          <div className='text-gray-700 mb-4 mt-8 text-base'>
            {t('after_change_text1', { keyPrefix: 'auth.reset_password' })}
            <span
              className='ml-1.5 text-[#768196] underline font-semi-bold'
              onClick={() => navigate('/auth')}
            >
              {t('after_change_text2', { keyPrefix: 'auth.reset_password' })}
            </span>
          </div>
        </>
      ) : (
        <>
          <div className='text-center font-futura-bold text-3xl text-secondary-base'>
            Masukkan kata sandi baru
          </div>
          <>
            <InputPassword
              name='password'
              value={form.password}
              error={error.password}
              onChange={handleChangeForm}
              placeholder='Kata Sandi Baru'
              className='mb-4 mt-6'
            />

            <InputPassword
              name='confirm_password'
              value={form.confirm_password}
              error={error.confirm_password}
              onChange={handleChangeForm}
              placeholder='Konfirmasi Kata Sandi Baru'
            />
          </>

          <Button
            label={t('submit_button', { keyPrefix: 'auth.register' })}
            onClick={onSubmit}
            iconRight={images.chevron_right}
            iconClassName='absolute right-4'
            disabled={!form.confirm_password}
            className='btn-secondary-hover w-full rounded-full font-medium relative mt-6'
          />
        </>
      )}
    </AuthCard>
  )
}
