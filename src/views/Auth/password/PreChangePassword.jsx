import images from 'assets/images'
import AuthCard from 'components/Card/AuthCard'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const PreChangePassword = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <AuthCard>
      <h1 className='text-4xl font-futura-bold'>Halo, Prima Kusumo</h1>
      <div className='text-xl text-gray-700 my-4'>
        {t('pre_change_text', { keyPrefix: 'auth.reset_password' })}
      </div>
      <div
        className='outline-1 outline rounded-3xl text-center p-3'
        onClick={() => navigate('/auth/changed-password')}
      >
        <div className='flex w-full items-center'>
          <div className='w-full'>
            {t('pre_change_btn_text', { keyPrefix: 'auth.reset_password' })}
          </div>
          <img
            src={images.ic_right_vector}
            alt='right appron'
            className='h-4'
          />
        </div>
      </div>
    </AuthCard>
  )
}
