import { API } from 'config/api'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input } from 'components'
import { putformData } from 'hooks/useRequest'
import InputImage from 'components/InputImage'
import images from 'assets/images'
import { useGlobalContext } from 'hooks/context'
import { useMutation } from 'react-query'

export const Profile = ({ userData }) => {
    const { t } = useTranslation()
    const { openAlert, closeAlert } = useGlobalContext()
    const [errorText, setErrorText] = useState('')
    const [imageUrl, setImageUrl] = useState('');
    const [form, setForm] = useState({ email: '', city_id: '', company_name: '', image: '' })
    const [error, setError] = useState({ email: '', city_id: '', company_name: '', image: '' })
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (userData) {
            setForm({ email: userData.email || '', city_id: userData.city_id || '', company_name: userData.company_name || '' });
            setImageUrl(userData.image_url);
        }
    }, [userData]);

    const validationForm = () => {
        const newError = { ...error }

        if (!form.email) {
            newError.email = t('email_empty', { keyPrefix: 'my_account' })
        } else if (!validateEmail(form.email)) {
            newError.email = t('email_incorect', { keyPrefix: 'my_account' })
        }
        if (!form.city_id) {
            newError.city_id = t('city_empty', { keyPrefix: 'my_account' })
        }
        return newError
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const handleImageChange = (newImage) => {
        setImageUrl(newImage);
    }

    const handleChangeForm = (e) => {
        const { name, value } = e
        setErrorText('')
        if (name) {
            setForm({ ...form, [name]: value })
            setError({ email: '', city_id: '', company_name: '' })
        }
    }

    const { mutate: changeProfile } = useMutation(
        (form) => {
            const formData = new FormData();
            formData.append('email', form.email)
            formData.append('company_name', form.company_name)
            formData.append('image_url', imageUrl)
            return putformData(API.UPDATE_PROFIL, formData);
        },
        {
            onSettled: (data) => {
                setIsLoading(false);
                if (data.status === 'Success') {
                    openAlert({
                        title: t('message_success_update_info', { keyPrefix: 'my_account' }),
                        icon: images.ic_tick,
                    })
                    let timeOut = setTimeout(() => {
                        closeAlert({ isConfirm: false, showLoading: false })
                    }, 1000)
                    return () => clearTimeout(timeOut)
                } else {
                    setErrorText(data?.message)
                    openAlert({
                        title: data?.message,
                        icon: images.ic_fail_red,
                    })
                    let timeOut = setTimeout(() => {
                        closeAlert({ isConfirm: false, showLoading: false })
                    }, 1000)
                    return () => clearTimeout(timeOut)
                }
            },
        }
    )

    const onSubmit = () => {
        if (isLoading) return;

        const findErrors = validationForm()
        if (Object.values(findErrors).some((err) => err !== '')) {
            setError(findErrors)
        } else {
            setIsLoading(true);
            changeProfile(form)
        }
        setErrorText('')
    }

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl mt-6 border md:border-0 border-neutral-70">
            <Input
                label="Email"
                labeblClassName='font-bold text-base'
                name='email'
                className='w-full flex flex-col !items-start'
                inputClass='font-medium !text-neutral-700 text-base'
                value={form.email}
                onChange={handleChangeForm}
                rowed="w-full"
                error={error.email}
            />
            <Input
                label={t('firm_name', { keyPrefix: 'my_account' })}
                labeblClassName='font-bold text-base'
                name='company_name'
                onChange={handleChangeForm}
                className='w-full flex flex-col mt-3'
                inputClass='font-medium !text-neutral-700 text-base'
                placeholder={t('firm_name_optional', { keyPrefix: 'my_account' })}
                rowed="w-full"
                value={form.company_name}
            />
            <InputImage
                className="mt-5"
                name='image'
                image={imageUrl}
                onImageSelect={handleImageChange}
            />

            <Button
                onClick={onSubmit}
                label={t('save_changes', { keyPrefix: 'my_account' })}
                className={
                    'btn-secondary-hover  mt-8 rounded-full font-medium ml-auto px-6 w-full md:w-fit'
                }
                disabled={isLoading}
            />
        </div>
    )
}
