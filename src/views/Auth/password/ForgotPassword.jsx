import { Button, Input } from 'components'
import AuthCard from 'components/Card/AuthCard'
import { useState } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import images from 'assets/images'
import { CounterDown } from 'components/CounterDown'

export const ForgotPassword = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [showCheckCard, setCheckCard] = useState(false)
  const [timesUpTimer, setTimesUpTimer] = useState(false)

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  const handleChangeForm = (e) => {
    setEmail(e.value)
    const errorMessage = validateEmail(e.value) ? '' : 'Invalid email format'
    setError(errorMessage)
    console.log(e.value)
  }

  const onSubmit = () => {
    console.log(email)
    setCheckCard(true)
  }

  return (
    <AuthCard>
      {showCheckCard ? (
        <>
          <div className='mb-4 font-futura-bold text-3xl'>
            {t('header', {
              keyPrefix: 'auth.set_password',
            })}
          </div>
          <div className='text-neutral-40 text-xl'>
            {t('text', {
              keyPrefix: 'auth.set_password',
            })}{' '}
            <span className='font-semi-bold'>{email}</span>
          </div>
          <div className='text-base font-regular tracking-wide text-gray-700 flex mt-14'>
            <p className='flex'>
              {t('countdownbefore', {
                keyPrefix: 'auth.register.otp',
              })}
              <CounterDown
                time={30}
                timesUp={(e) => {
                  setTimesUpTimer(e)
                }}
                format='second'
                className='mx-1'
              />
              {t('countdownafter', {
                keyPrefix: 'auth.register.otp',
              })}
            </p>

            <span
              className={clsx(
                'ms-1',
                timesUpTimer ? 'text-[#768196] underline font-bold' : ''
              )}
              onClick={!timesUpTimer ? void 0 : () => console.log({ email })}
            >
              {t('resend', { keyPrefix: 'auth.register.otp' })}
            </span>
          </div>
        </>
      ) : (
        <>
          <div className='mb-4 text-center text-xl font-futura-bold'>
            {t('auth.forget_password_header')}
          </div>

          <Input
            name='email'
            value={email}
            onChange={handleChangeForm}
            className='w-full rounded-full flex-wrap'
            inputClass={clsx(
              '!border-secondary-logo focus:outline-secondary-logo text-base'
            )}
            rowed
            placeholder={t('email', { keyPrefix: 'auth.register' })}
            error={error}
          />

          <Button
            label={t('submit_button', { keyPrefix: 'auth.register' })}
            onClick={onSubmit}
            iconRight={images.chevron_right}
            iconClassName={'absolute right-4'}
            disabled={!email || error}
            className={
              'btn-secondary-hover w-full rounded-full font-medium relative mt-8'
            }
          />
        </>
      )}
    </AuthCard>
  )
}
