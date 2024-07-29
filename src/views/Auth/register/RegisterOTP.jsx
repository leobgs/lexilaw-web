import images from 'assets/images'
import clsx from 'clsx'
import AuthCard from 'components/Card/AuthCard'
import { CounterDown } from 'components/CounterDown'
import InputOTP from 'components/InputOTP'
import { API } from 'config/api'
import { StorageKey } from 'config/storage'
import { useGlobalContext } from 'hooks/context'
import { getData } from 'hooks/useRequest'
import { notifyError, notifySuccess } from 'hooks/useToas'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { LocalStorage } from 'utils'

const RegisterOTP = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const storage = new LocalStorage()
  const { fullName, email, user_uuid } = location.state
  const { openAlert, closeAlert } = useGlobalContext()
  const { t } = useTranslation()
  const [otp, setOTP] = useState('')
  const [otpTime, setOtpTime] = useState(30)
  const [isNotValidOtp, setIsNotValidOtp] = useState(false)
  const [timesUpTimer, setTimesUpTimer] = useState(false)
  const [errorMessage, setErrorMessage] = useState('Unknown')

  const { mutate: otpCeck } = useMutation(
    (form) => getData(API.OTP_CHECK, form),
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
          setIsNotValidOtp(true)
          setErrorMessage(data?.message)
        }
      },
    }
  )

  const { mutate: otpResend } = useMutation(
    (form) => getData(API.OTP_RESEND, form),
    {
      onSettled: (data) => {
        if (data?.status === 'Success') {
          notifySuccess(data?.message)
          setTimesUpTimer(false)
          setOtpTime(30)
        } else {
          notifyError(data?.message)
        }
      },
    }
  )

  useEffect(() => {
    setIsNotValidOtp(false)
    if (otp.length === 6) {
      otpCeck({
        user_uuid,
        otp,
      })
    }
  }, [otp])

  const showWelcomePopup = () => {
    openAlert({
      title: 'Selamat bergabung 👋 ',
      messages: fullName,
      icon: images.ai_profile_thumbnail,
    })
  }

  const handleOtpChanged = (newValue) => {
    setOTP(newValue)
  }

  return (
    <AuthCard>
      <div className='grid grid-cols-1 gap-y-4 h-fit'>
        <h1 className='text-[32px] text-dark-50 font-futura-bold tracking-tight'>
          {t('heading', { keyPrefix: 'auth.register.otp' })}
        </h1>

        <h3 className='text-xl font-regular tracking-wide text-gray-700'>
          {t('send_to', { keyPrefix: 'auth.register.otp' })}
          <span className='block font-bold'>{email}</span>
        </h3>

        <InputOTP
          placeholder={t('placeholder', { keyPrefix: 'auth.register.otp' })}
          value={otp}
          isNotValid={isNotValidOtp}
          onValueChanged={handleOtpChanged}
          textErr={errorMessage}
        />

        <div className='text-base font-regular tracking-wide text-gray-700 flex'>
          <div className='flex'>
            {t('countdownbefore', {
              keyPrefix: 'auth.register.otp',
            })}

            {!timesUpTimer ? (
              <CounterDown
                time={otpTime}
                timesUp={(e) => {
                  setTimesUpTimer(e)
                }}
                format='second'
                className='mx-1'
              />
            ) : (
              ' 00 '
            )}

            {t('countdownafter', {
              keyPrefix: 'auth.register.otp',
            })}
          </div>

          <span
            className={clsx(
              'ms-1',
              timesUpTimer ? 'text-[#768196] underline font-bold' : ''
            )}
            onClick={!timesUpTimer ? void 0 : () => otpResend({ user_uuid })}
          >
            {t('resend', { keyPrefix: 'auth.register.otp' })}
          </span>
        </div>
      </div>
    </AuthCard>
  )
}

export default RegisterOTP
