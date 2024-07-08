import { useState } from 'react'
import AuthCard from 'components/Card/AuthCard'
import { Button, Input, InputSelect } from 'components'
import { InputPassword } from 'components/InputPassword'
import images from 'assets/images'
import InputImage from 'components/InputImage'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from 'hooks/context'
import clsx from 'clsx'
import { API } from 'config/api'
import { useMutation, useQuery } from 'react-query'
import { getData } from 'hooks/useRequest'

export const Register = () => {
  const { t } = useTranslation()
  const { registerForm, registerFormReducer } = useGlobalContext()
  const [errorText, setErrorText] = useState('')
  const [optionCity, setOptionCity] = useState([])
  const [selectedCity, setSelectedCity] = useState()
  const navigate = useNavigate()
  const [error, setError] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
  })

  useQuery(['city_list'], () => getData(API.LIST_CITY), {
    onSettled: (datas) => {
      if (datas.status === 'Success') {
        const { data } = datas
        let tmp = []
        data?.forEach((item) => {
          tmp.push({ label: item.name, value: item.id })
        })
        setOptionCity([...tmp])
      } else {
        setOptionCity([
          {
            label: t('city_not_found', { keyPrefix: 'auth.register' }),
            value: 0,
          },
        ])
      }
    },
  })

  const { mutate: registerData } = useMutation(
    (form) => getData(API.REGISTER, form),
    {
      onSettled: (data) => {
        if (data.status === 'Success') {
          navigate('/auth/register/otp', {
            state: {
              email: registerForm.email,
              fullName: fullName,
              user_uuid: data?.data?.user_uuid,
            },
          })
        } else {
          setErrorText(data.message)
        }
      },
    }
  )

  const fullName = registerForm.first_name + ' ' + registerForm.last_name

  const validateName = (value) => {
    const nameRegex = /^[a-zA-Z\s.',]*$/
    return nameRegex.test(value)
  }

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
    return passwordRegex.test(password)
  }

  const validateInput = (name, value) => {
    switch (name) {
      case 'first_name':
      case 'last_name':
        return validateName(value)
          ? ''
          : t('validate_name_format', { keyPrefix: 'auth.register' })
      case 'email':
        return validateEmail(value)
          ? ''
          : t('validate_email_format', { keyPrefix: 'auth.register' })
      default:
        return ''
    }
  }

  const isAnyError = () => {
    let errorCheck =
      error.first_name === null ||
      error.email === null ||
      error.password === null ||
      error.password_confirm === null ||
      error.password_confirm !== ''
    return errorCheck
  }

  const isAnyEmptyForm = () => {
    let errorCheck =
      registerForm.first_name === null ||
      registerForm.first_name === '' ||
      registerForm.last_name === null ||
      registerForm.last_name === '' ||
      registerForm.email === null ||
      registerForm.email === '' ||
      registerForm.password === null ||
      registerForm.password === '' ||
      registerForm.password_confirm === null ||
      registerForm.password_confirm === '' ||
      registerForm.city === null ||
      registerForm.city === ''
    return errorCheck
  }

  const validatePasswordMatch = (e) => {
    const { name, value } = e
    if (name === 'password') {
      if (registerForm.password_confirm) {
        if (value !== registerForm.password_confirm) {
          if (validatePassword(value)) {
            if (value !== registerForm.password_confirm) {
              setError({
                ...error,
                password: '',
                password_confirm: t('password_match', {
                  keyPrefix: 'auth.register',
                }),
              })
            } else {
              setError({ ...error, password: '' })
            }
          } else {
            setError({
              ...error,
              password_confirm: t('password_match', {
                keyPrefix: 'auth.register',
              }),
              password: t('validate_password', { keyPrefix: 'auth.register' }),
            })
          }
        } else {
          setError({
            ...error,
            password_confirm: '',
          })
        }
      } else {
        return validatePassword(value)
          ? setError({ ...error, password: '' })
          : setError({
              ...error,
              password_confirm: t('password_match', {
                keyPrefix: 'auth.register',
              }),
              password: t('validate_password', { keyPrefix: 'auth.register' }),
            })
      }
    } else if (name === 'password_confirm') {
      if (registerForm.password) {
        if (value !== registerForm.password) {
          setError({
            ...error,
            password_confirm: t('password_match', {
              keyPrefix: 'auth.register',
            }),
          })
        } else if (value === registerForm.password) {
          if (validatePassword(value)) {
            setError({ ...error, password_confirm: '' })
          } else {
            setError({
              ...error,
              password_confirm: t('validate_password', {
                keyPrefix: 'auth.register',
              }),
            })
          }
        }
      } else {
        setError({
          ...error,
          password_confirm: t('input_password_first', {
            keyPrefix: 'auth.register',
          }),
        })
      }
    }
  }

  const isValidForm = !isAnyEmptyForm() && !isAnyError()

  const handleChangeForm = (e) => {
    const { name, value } = e

    if (name === 'password_confirm' || name === 'password') {
      validatePasswordMatch(e)
      registerFormReducer(name, value)
    } else {
      const errorMessage = validateInput(name, value)
      registerFormReducer(name, value)
      setError({ ...error, [name]: errorMessage })
    }
  }

  const handleImageChange = (newImage) => {
    registerFormReducer(['image'], newImage)
  }

  const onSubmit = () => {
    const bodyFormData = new FormData()
    for (const [key, value] of Object.entries(registerForm)) {
      bodyFormData.append(key, value)
    }
    registerData(bodyFormData)
    setErrorText('')
  }

  const handleChangeCity = (e) => {
    setSelectedCity(e)
    registerFormReducer(['city'], e.value)
  }

  return (
    <AuthCard className>
      <div className='grid grid-cols-1 gap-y-4 h-fit'>
        <div className='flex flex-wrap xl:flex-nowrap gap-4 align-top items-start'>
          <Input
            name='first_name'
            value={registerForm.first_name}
            onChange={handleChangeForm}
            className='w-full rounded-full flex-wrap'
            inputClass={clsx(
              '!border-secondary-logo focus:outline-secondary-logo text-base',
              registerForm.first_name === '' ? 'font-regular' : ' font-medium'
            )}
            rowed
            placeholder={t('firstName', { keyPrefix: 'auth.register' })}
            error={error.first_name}
          />

          <Input
            name='last_name'
            value={registerForm.last_name}
            onChange={handleChangeForm}
            className='w-full rounded-full flex-wrap'
            inputClass={clsx(
              '!border-secondary-logo focus:outline-secondary-logo text-base',
              registerForm.first_name === '' ? 'font-regular' : ' font-medium'
            )}
            rowed
            placeholder={t('lastName', { keyPrefix: 'auth.register' })}
            error={error.last_name}
          />
        </div>

        <Input
          name='email'
          value={registerForm.email}
          onChange={handleChangeForm}
          className='w-full rounded-full flex-wrap'
          inputClass={clsx(
            '!border-secondary-logo focus:outline-secondary-logo text-base',
            registerForm.first_name === '' ? 'font-regular' : ' font-medium'
          )}
          rowed
          placeholder={t('email', { keyPrefix: 'auth.register' })}
          error={error.email}
        />

        <div className='flex flex-wrap md:flex-nowrap gap-4 align-top items-start'>
          <InputPassword
            name='password'
            className='w-full flex-wrap'
            inputClass={clsx(
              '!border-secondary-logo focus:outline-secondary-logo text-base',
              registerForm.first_name === '' ? 'font-regular' : ' font-medium'
            )}
            placeholder={t('password', { keyPrefix: 'auth.register' })}
            value={registerForm.password}
            onChange={handleChangeForm}
            error={error.password}
            maxLength={8}
          />

          <InputPassword
            name='password_confirm'
            className='w-full flex-wrap'
            inputClass={clsx(
              '!border-secondary-logo focus:outline-secondary-logo text-base',
              registerForm.first_name === '' ? 'font-regular' : ' font-medium'
            )}
            placeholder={t('password_confirm', {
              keyPrefix: 'auth.register',
            })}
            maxLength={8}
            value={registerForm.password_confirm}
            onChange={handleChangeForm}
            error={error.password_confirm}
          />
        </div>

        <InputSelect
          placeholder={t('select_city', { keyPrefix: 'auth.register' })}
          onChange={handleChangeCity}
          options={optionCity}
          value={selectedCity}
          isSearchable
        />

        <Input
          name='company_name'
          value={registerForm.company_name}
          onChange={handleChangeForm}
          className='w-full rounded-full flex-wrap'
          inputClass={clsx(
            '!border-secondary-logo focus:outline-secondary-logo text-base',
            registerForm.first_name === '' ? 'font-regular' : ' font-medium'
          )}
          rowed
          placeholder={t('firm_name', { keyPrefix: 'auth.register' })}
        />

        <InputImage
          name='image'
          image={registerForm.image}
          onImageSelect={handleImageChange}
        />

        <Button
          label={t('register_button', { keyPrefix: 'auth.register' })}
          onClick={onSubmit}
          iconRight={images.chevron_right}
          iconClassName={'absolute right-4'}
          disabled={!isValidForm}
          className={
            'btn-secondary-hover w-full mt-1 rounded-full font-medium relative'
          }
        />

        {errorText && (
          <div className='bg-error-base bg-opacity-20 border-1 border-error-base border rounded-lg w-fit'>
            <p className='font-semi-bold text-error-base px-2'>{errorText}</p>
          </div>
        )}

        <div className='text-center font-medium flex justify-center text-sm'>
          <p>{t('already_have_account', { keyPrefix: 'auth.register' })}</p>
          <p
            className='font-bold text-gray-900 underline ms-1'
            onClick={() => navigate('/auth/login')}
          >
            {t('login', { keyPrefix: 'common' })}
          </p>
        </div>
      </div>
    </AuthCard>
  )
}
