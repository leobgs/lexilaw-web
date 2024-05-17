import images from 'assets/images'
import { API } from 'config/api'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Button, Input, InputSelect } from 'components'
import { getData } from 'hooks/useRequest'
import { useGlobalContext } from 'hooks/context'
import InputImage from 'components/InputImage'

export const Profile = ({ userData }) => {
    const { t } = useTranslation()
    const { registerForm, registerFormReducer } = useGlobalContext()
    const [optionCity, setOptionCity] = useState([])
    const [selectedCity, setSelectedCity] = useState(null);

    const [emailAddress, setEmailAddress] = useState('');
    const [cityId, setCityId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (userData) {
            setEmailAddress(userData.email || '');
            setCityId(userData.city_id || '');
            setCompanyName(userData.company_name || '');
            setImageUrl(userData.image_url ? userData.image_url : images.ic_avatar_placeholder);
        }
    }, [userData]);

    useQuery(['city_list'], () => getData(API.LIST_CITY), {
        onSettled: (datas) => {
            if (datas.status === 'Success') {
                const { data } = datas;
                let tmp = [];
                data?.forEach((item) => {
                    tmp.push({ label: item.name, value: item.id });
                });
                setOptionCity([...tmp]);

                const matchedCity = tmp.find(city => city.value === cityId);
                if (matchedCity) {
                    setSelectedCity(matchedCity);
                }
            } else {
                setOptionCity([{ label: 'Kota tidak dapat ditemukan', value: 0 }]);
            }
        },
    });

    useEffect(() => {
        if (cityId) {
            const matchedCity = optionCity.find(city => city.value === cityId);
            if (matchedCity) {
                setSelectedCity(matchedCity);
            }
        }
    }, [cityId, optionCity]);

    const handleChangeCity = (selectedOption) => {
        setSelectedCity(selectedOption);
        registerFormReducer(['city'], selectedOption.value);
    };

    const handleImageChange = (newImage) => {
        registerFormReducer(['image'], newImage)
        setImageUrl(newImage);
    }

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl mt-6 border md:border-0 border-neutral-70">
            <Input
                label="Email"
                labeblClassName='font-bold text-[14px]'
                name='email'
                className='w-full flex flex-col'
                inputClass='font-medium !text-neutral-700 text-base'
                value={emailAddress}
                rowed="w-full"
            />
            <div className="mt-3">
                <p className='font-bold mb-2'>
                    {t('city_dropdown_placeholder', { keyPrefix: 'my_account' })}
                </p>
                <InputSelect
                    placeholder={t('city_dropdown_placeholder', { keyPrefix: 'my_account' })}
                    onChange={handleChangeCity}
                    className="font-medium !text-base"
                    options={optionCity}
                    value={selectedCity}
                    isSearchable
                />
            </div>
            <Input
                label={t('firm_name', { keyPrefix: 'my_account' })}
                labeblClassName='font-bold text-[14px]'
                name='text'
                className='w-full flex flex-col mt-3'
                inputClass='font-medium !text-neutral-700 text-base'
                placeholder={t('firm_name_optional', { keyPrefix: 'my_account' })}
                rowed="w-full"
                value={companyName}
            />

            <InputImage
                className="mt-5"
                name='image'
                image={imageUrl}
                onImageSelect={handleImageChange}
            />

            <Button
                label={t('save_changes', { keyPrefix: 'my_account' })}
                className={
                    'btn-secondary-hover  mt-8 rounded-full font-medium ml-auto px-6 w-full md:w-fit'
                }
            />
        </div>


    )
}
