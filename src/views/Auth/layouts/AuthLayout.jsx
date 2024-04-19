import { useEffect, useState } from 'react'
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import images from 'assets/images'
import { Button } from 'components/Button/Button'
import { Toggle } from 'components/Toggle/Toggle'
import { useTranslation } from 'react-i18next'
import '../Login.scss'
import { AppleSignInButton } from 'components/Button/AppleSiginInButton'
import { AuthLoader } from 'components/AuthLoader'
import { GoogleSignInButton } from 'components/Button/GoogleSignInButton'

export default function AuthLayout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const { uuid } = useParams()

  const isOnAuthPage =
    location.pathname === '/auth/register' ||
    location.pathname === '/auth/login' ||
    location.pathname === '/auth/register/otp' ||
    location.pathname === '/auth/forgot-password' ||
    location.pathname === '/auth/changed-password' ||
    location.pathname === `/auth/prechanged-password/${uuid}`

  const isOnMobileSize = windowWidth <= 768

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleSignEmail = () => {
    navigate('/auth/login')
  }

  const handleBackLogin = () => {
    location.pathname === '/auth/login' ||
    location.pathname === '/auth/prechanged-password'
      ? navigate('/auth')
      : navigate(-1)
  }

  const handleLabelHeader = (pathname) => {
    switch (pathname) {
      case '/auth/login':
        return t('login', { keyPrefix: 'auth.navbar' })
      case '/auth':
        return t('login', { keyPrefix: 'auth.navbar' })
      case '/auth/register':
        return t('register', { keyPrefix: 'auth.navbar' })
      case '/auth/forgot-password':
        return t('change_password', { keyPrefix: 'auth.navbar' })
      case '/auth/changed-password':
        return t('change_password', { keyPrefix: 'auth.navbar' })
      case '/auth/prechanged-password':
        return t('change_password', { keyPrefix: 'auth.navbar' })
      default:
        return t('otp', { keyPrefix: 'auth.navbar' })
    }
  }

  const handleSocialMediaButton = (pathname) => {
    switch (pathname) {
      case '/auth/login':
        return (
          <div className='grid lg:grid-cols-2 lg:gap-5 px-3'>
            <GoogleSignInButton
              className={
                'whitespace-nowrap bg-outline-transparent text-white w-full mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs'
              }
              callback={(response) => {
                console.log(response)
              }}
            />

            <AppleSignInButton
              className={
                'whitespace-nowrap bg-outline-transparent text-white w-full lg:mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs'
              }
              callback={(response) => {
                console.log(response)
              }}
            />

            <Button
              label={t('social_email', { keyPrefix: 'auth' })}
              iconLeft={images.email_outline}
              iconClassName={'w-[20px] h-[20px] me-2'}
              onClick={handleSignEmail}
              className={
                'md:hidden bg-outline bg-white text-green-900 w-full lg:mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs'
              }
            />

            <p className='text-center text-gray-400 font-medium md:hidden'>
              {t('not_have_account', { keyPrefix: 'auth.login' })}
              <NavLink
                className='font-bold text-white underline ms-1'
                to='/auth/register'
              >
                {t('register', { keyPrefix: 'auth.login' })}
              </NavLink>
            </p>
          </div>
        )

      case '/auth':
        return (
          <div className='grid lg:grid-cols-2 lg:gap-5 px-3'>
            <GoogleSignInButton
              className={
                'whitespace-nowrap bg-outline-transparent text-white w-full mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs'
              }
              callback={(response) => {
                console.log(response)
              }}
            />

            <AppleSignInButton
              className={
                'whitespace-nowrap bg-outline-transparent text-white w-full lg:mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs'
              }
              callback={(response) => {
                console.log(response)
              }}
            />

            <Button
              label={t('social_email', { keyPrefix: 'auth' })}
              iconLeft={images.email_outline}
              iconClassName={'w-[20px] h-[20px] me-2'}
              onClick={handleSignEmail}
              className={
                'md:hidden bg-outline bg-white text-green-900 w-full lg:mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs'
              }
            />

            <p className='text-center text-gray-400 font-medium md:hidden'>
              {t('not_have_account', { keyPrefix: 'auth.login' })}
              <NavLink
                className='font-bold text-white underline ms-1'
                to='/auth/register'
              >
                {t('register', { keyPrefix: 'auth.login' })}
              </NavLink>
            </p>
          </div>
        )

      case '/auth/register':
        return (
          <div className='grid lg:grid-cols-2 lg:gap-5 px-3'>
            <GoogleSignInButton
              className={
                'whitespace-nowrap bg-outline-transparent text-white w-full mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs'
              }
              callback={(response) => {
                console.log(response)
              }}
            />

            <Button
              label={t('social_google', { keyPrefix: 'auth' })}
              iconLeft={images.google}
              iconClassName={'w-[20px] h-[20px] me-2'}
              className={
                'whitespace-nowrap bg-outline-transparent text-white w-full mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs'
              }
            />

            <AppleSignInButton
              className={
                'whitespace-nowrap bg-outline-transparent text-white w-full lg:mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs'
              }
              callback={(response) => {
                console.log(response)
              }}
            />

            <Button
              label={t('social_email', { keyPrefix: 'auth' })}
              iconLeft={images.email_outline}
              iconClassName={'w-[20px] h-[20px] me-2'}
              onClick={handleSignEmail}
              className={
                'md:hidden bg-outline bg-white text-green-900 w-full lg:mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs'
              }
            />

            <p className='text-center text-gray-400 font-medium md:hidden'>
              {t('not_have_account', { keyPrefix: 'auth.login' })}
              <NavLink
                className='font-bold text-white underline ms-1'
                to='/auth/register'
              >
                {t('register', { keyPrefix: 'auth.login' })}
              </NavLink>
            </p>
          </div>
        )

      default:
        return <></>
    }
  }

  return (
    <div className='bg-contain bg-center h-screen bg_auth flex items-center flex-col relative'>
      <AuthLoader />

      {isOnMobileSize && isOnAuthPage && (
        <div className='navBar border-b-2 border-green-900 md: w-full'>
          <Button
            label={handleLabelHeader(location.pathname)}
            iconLeft={images.chevron_left}
            iconClassName={'w-[20px] h-[20px] me-2'}
            onClick={handleBackLogin}
            className='text-white bg-transparent'
          />
        </div>
      )}

      <div className='container mx-auto py-3 relative z-1 px-4 md:px-0 my-auto lg:px-[2rem]'>
        {!isOnMobileSize && (
          <img
            src={images.lexilaw_logo}
            alt=''
            className='logo md:!block pb-[2rem] mx-auto md:mx-0 w-[120px] md:w-[160px] lg:w-[200px] md:ms-[-20px] lg:ms-0'
          />
        )}

        <div className='grid md:grid-cols-2 md:gap-5 xl:gap-12 2xl:gap-32'>
          {(!isOnMobileSize ||
            (isOnMobileSize && location.pathname === '/auth')) && (
            <div className='desc flex md:!flex flex-col justify-center'>
              <h1 className='font-bold text-5xl md:text-7xl text-white text-center md:text-start font-futura-bold'>
                {t('tagline')}
              </h1>

              <p className='pt-[0.5rem] text-white text-center md:text-start font-light'>
                {t('sub_tagline')}
              </p>
            </div>
          )}

          <div>
            {(isOnAuthPage && isOnMobileSize) || !isOnMobileSize ? (
              <>
                <Toggle className='togglelanguage md:flex' />
                <Outlet />
              </>
            ) : null}

            {handleSocialMediaButton(location.pathname)}
          </div>
        </div>
      </div>
    </div>
  )
}
