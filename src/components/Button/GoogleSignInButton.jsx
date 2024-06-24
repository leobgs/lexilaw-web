import { Button } from './Button'
import images from 'assets/images'
import { useTranslation } from 'react-i18next'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import { LocalStorage, env } from 'utils'
import { Device } from '@capacitor/device'
import { getData } from 'hooks/useRequest'
import { useMutation } from 'react-query'
import { API } from 'config/api'
import { StorageKey } from 'config/storage'
import { useNavigate } from 'react-router-dom'
import { notifyError } from 'hooks/useToas'

export const GoogleSignInButton = ({ className, callback }) => {
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

  GoogleAuth.initialize({
    clientId: env(
      'REACT_APP_GOOGLE_OAUTH_CLIENT_ID_WEB',
      'REACT_APP_GOOGLE_OAUTH_CLIENT_ID_WEB'
    ),
    scopes: ['profile', 'email'],
    grantOfflineAccess: true,
  })

  const handleGoogleSignIn = async () => {
    const deviceInfo = (await Device.getInfo()).platform
    GoogleAuth.signIn()
      .then((response) => {
        mutateGoogleLogin({
          code: response.authentication.accessToken,
          id_token: response.authentication.idToken,
          device_id: deviceInfo,
          fcm_token: '',
        })
      })
      .catch((error) => {
        console.error('Google sign-in error:', error)
      })
  }

  return (
    <Button
      label={t('social_google', { keyPrefix: 'auth' })}
      iconLeft={images.google}
      iconClassName={'w-[20px] h-[20px] me-2'}
      className={className}
      onClick={handleGoogleSignIn}
    />
  )
}
