import images from 'assets/images'
import { API } from 'config/api'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { Name } from './Name'
import { Profile } from './Profile'
import { Password } from './Password'
import { useQuery } from 'react-query'
import { getData } from 'hooks/useRequest'
import { useEffect, useState } from 'react'

export const Account = () => {
    const { t } = useTranslation()
    const [userData, setUserData] = useState([]);

    const getUserDetail = useQuery(['user'], () => getData(API.USER_DETAIL))


    useEffect(() => {
        if (getUserDetail.data?.status === 'Success') {
            setUserData(getUserDetail.data.data);
        }
    }, [getUserDetail]);

    return (
        <div className='bg-primary-base p-4 h-full md:h-screen md:p-4'>
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

                    <Name userData={userData} />
                    <Profile userData={userData} />
                    <Password />
                </main>
            </div>
        </div>
    )
}
