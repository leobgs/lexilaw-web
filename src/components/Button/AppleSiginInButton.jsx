import { SignInWithApple } from '@capacitor-community/apple-sign-in'
import { Button } from './Button'
import images from 'assets/images'
import { useTranslation } from 'react-i18next'
import { appleClientId, redirectURL } from 'config/app'
import { Device } from '@capacitor/device'
import { useMutation } from 'react-query'
import { LocalStorage } from 'utils'
import { API } from 'config/api'
import { getData } from 'hooks/useRequest'
import { StorageKey } from 'config/storage'
import { notifyError } from 'hooks/useToas'
import { useNavigate } from 'react-router-dom'

export const AppleSignInButton = ({ className, callback }) => {
  const storage = new LocalStorage()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { mutate: mutateAppleLogin } = useMutation(
    (form) => getData(API.APPLE_LOGIN, form),
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

  let options = {
    clientId: appleClientId,
    redirectURI: redirectURL,
    scopes: 'email name',
    state: '12345',
    nonce: 'nonce',
  }

  const handleAppleSignIn = async () => {
    const deviceInfo = (await Device.getInfo()).platform
    SignInWithApple.authorize(options)
      .then((result) => {
        const { response } = result
        mutateAppleLogin({
          code: response.authorizationCode,
          id_token: response.identityToken,
          device_id: deviceInfo,
          fcm_token: '',
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Button
      label={t('social_apple', { keyPrefix: 'auth' })}
      iconLeft={images.apple}
      iconClassName={' me-2'}
      className={className}
      onClick={handleAppleSignIn}
    />
  )
}
