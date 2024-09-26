import images from 'assets/images'
import AuthCard from 'components/Card/AuthCard'
import { API } from 'config/api'
import { getData } from 'hooks/useRequest'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

export const PreChangePassword = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [showButton, setShowButton] = useState(true)
  const [errMessage, setErrMessage] = useState('')
  const { uuid } = useParams()

  useQuery(
    ['check_validation'],
    () => getData(API.RESET_PASSWORD_CHECK_EMAIL + '/' + uuid),
    {
      onSettled: (data) => {
        if (data?.status === 'Success') {
          setShowButton(true)
        } else {
          setShowButton(false)
          setErrMessage(data?.message)
        }
      },
    }
  )

  return (
    <AuthCard>
      {showButton ? (
        <>
          <h1 className="text-4xl font-futura-bold">Halo, Prima Kusumo</h1>
          <div className="text-xl text-gray-700 my-4">
            {t('pre_change_text', { keyPrefix: 'auth.reset_password' })}
          </div>
          <div
            className="outline-1 outline rounded-3xl text-center p-3"
            onClick={() => navigate('/auth/changed-password', { state: uuid })}
          >
            <div className="flex w-full items-center">
              <div className="w-full">
                {t('pre_change_btn_text', { keyPrefix: 'auth.reset_password' })}
              </div>
              <img
                src={images.ic_right_vector}
                alt="right appron"
                className="h-4"
              />
            </div>
          </div>
        </>
      ) : errMessage === 'Request data not found' ? (
        <>
          <h1 className="text-4xl font-futura-bold">Halo, Prima Kusumo</h1>
          <div className="text-xl text-gray-700 my-4">
            {t('pre_change_text_fail', { keyPrefix: 'auth.reset_password' })}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-futura-bold">Halo, Prima Kusumo</h1>
          <div className="text-xl text-gray-700 my-4">
            {t('pre_change_text_finish', { keyPrefix: 'auth.reset_password' })}
          </div>
        </>
      )}
    </AuthCard>
  )
}
