import images from 'assets/images'
import clsx from 'clsx'
import AuthCard from 'components/Card/AuthCard'
import InputOTP from 'components/InputOTP'
import { API } from 'config/api'
import { useGlobalContext } from 'hooks/context'
import { getData } from 'hooks/useRequest'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useLocation } from 'react-router-dom'

const RegisterOTP = () => {
  const location = useLocation()
  const { fullName, email, user_uuid } = location.state
  const { openAlert } = useGlobalContext()
  const { showAuthLoader, closeAuthLoader } = useGlobalContext()
  const { t } = useTranslation()
  const [otp, setOTP] = useState('')
  const [isNotValidOtp, setIsNotValidOtp] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [loaderCountdown, setLoaderCountdown] = useState(null)

  const { mutate: otpPost } = useMutation(
    (form) => getData(API.OTP_CHECK, form),
    {
      onSuccess: (data) => {
        console.log(data)
      },
    }
  )

  useEffect(() => {
    let intervalId
    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevSeconds) => prevSeconds - 1)
      }, 1000)
    } else {
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId)
  }, [countdown])

  useEffect(() => {
    let intervalId
    if (loaderCountdown > 0) {
      intervalId = setInterval(() => {
        setLoaderCountdown((prevSeconds) => prevSeconds - 1)
      }, 1000)
    } else if (loaderCountdown == 0) {
      clearInterval(intervalId)
      showWelcomePopup()
      closeAuthLoader()
    }

    return () => clearInterval(intervalId)
  }, [loaderCountdown])

  useEffect(() => {
    setIsNotValidOtp(false)
    if (otp.length === 6) {
      otpPost({
        user_uuid,
        otp,
      })
      console.log('check OTP here', otp, user_uuid)
      if (otp === '123456') {
        success()
      } else {
        setIsNotValidOtp(true)
      }
    }
  }, [otp])

  const success = () => {
    setLoaderCountdown(3)
    showAuthLoader()
  }

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

  const formattedSeconds = countdown < 10 ? `0${countdown}` : countdown
  const isCountdownZero = countdown === 0

  const handleResendOTP = () => {
    if (countdown === 0) {
      setCountdown(30)
    }
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
        />

        <p className='text-base font-regular tracking-wide text-gray-700'>
          {t('countdown', {
            keyPrefix: 'auth.register.otp',
            second: `${formattedSeconds}`,
          })}{' '}
          <span
            className={clsx(
              'font-bold underline ms-1',
              !isCountdownZero ? 'text-[#768196]' : ''
            )}
            onClick={handleResendOTP}
          >
            {t('resend', { keyPrefix: 'auth.register.otp' })}
          </span>
        </p>
      </div>
    </AuthCard>
  )
}

export default RegisterOTP
