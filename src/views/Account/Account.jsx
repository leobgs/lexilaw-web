import images from 'assets/images'
import { API } from 'config/api'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, Input, InputSelect, InputPassword } from 'components'
import { getData } from 'hooks/useRequest'
// import { LocalStorage } from 'utils'
import { useGlobalContext } from 'hooks/context'
import InputImage from 'components/InputImage'
import { Name } from './Name'
import { Profile } from './Profile'
import { Password } from './Password'

export const Account = () => {
    const { t } = useTranslation()
    return (
        <div className='bg-primary-base p-4 md:h-full md:p-4'>
            <NavLink
                className='flex items-center w-fit'
                to='/'
            >
                <img className='me-2 h-[18px]' src={images.ic_chevron_left} alt='back' />
                <div className="font-futura-bold font-bold text-xl text-dark-50 ">
                    {t('my_account', { keyPrefix: 'my_account' })}
                </div>
            </NavLink>

            <div className='md:flex md:justify-between mt-12'>

                <main className='mx-auto md:w-[740px]'>

                    <Name />
                    <Profile />
                    <Password />
                </main>
            </div>
        </div>
    )
}
