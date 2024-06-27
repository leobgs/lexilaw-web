import { Button } from './Button'
import images from 'assets/images'
import { useTranslation } from 'react-i18next'
import { LocalStorage } from 'utils'
import { getData } from 'hooks/useRequest'
import { useMutation } from 'react-query'
import { API } from 'config/api'
import { StorageKey } from 'config/storage'
import { useNavigate } from 'react-router-dom'
import { notifyError } from 'hooks/useToas'
import { useGoogleLogin } from '@react-oauth/google'

export const GoogleSignInButton = ({ className }) => {
  const storage = new LocalStorage()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { mutate: mutateGoogleLogin } = useMutation(
    (form) => getData(API.GOOGLE_LOGIN, form),
    {
      onSettled: (data) => {
        if (data.status === 'Success') {
          storage.setItem(StorageKey.ACCESS_TOKEN, {
            access_token: data?.data,
            token_type: 'Bearer',
          })
          storage.setItem(StorageKey.IS_LOGIN, true)
          navigate('/', { replace: true })
        } else {
          notifyError(data?.message)
        }
      },
    }
  )

  const handleGoogleSignIn = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      mutateGoogleLogin({
        code: code,
      })
    },
  })

  return (
    <>
      <Button
        label={t('social_google', { keyPrefix: 'auth' })}
        iconLeft={images.google}
        iconClassName={'w-[20px] h-[20px] me-2'}
        className={className}
        onClick={handleGoogleSignIn}
      />
    </>
  )
}
