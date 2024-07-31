import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input } from 'components'
import { useGlobalContext } from 'hooks/context'
import images from 'assets/images'
import { API } from 'config/api'
import { getData } from 'hooks/useRequest'
import { useMutation } from 'react-query'

export const Name = ({ userData }) => {
    const { t } = useTranslation()
    const [errorText, setErrorText] = useState('')
    const [form, setForm] = useState({ first_name: '', last_name: '' })
    const [error, setError] = useState({ first_name: '', last_name: '' })
    const { openAlert, closeAlert } = useGlobalContext()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        if (userData) {
            setFirstName(userData.first_name || '');
            setLastName(userData.last_name || '');
        }
    }, [userData]);


    const validationForm = () => {
        const newError = { ...error };

        if (!validateName(form.first_name)) {
            newError.first_name = t('incorrect_name_format');
        }

        if (!validateName(form.last_name)) {
            newError.last_name = t('incorrect_name_format');
        }

        return newError;
    }

    const validateName = (value) => {
        const regex = /^[a-zA-Z\s.',]*$/;
        return regex.test(value); 
    }


    const { mutate: changeName } = useMutation(
        (form) => getData(API.UPDATE_NAME, form),
        {
            onSettled: (data) => {
                if (data.status === 'Success') {
                    openAlert({
                        title: t('message_name_success', { keyPrefix: 'my_account' }),
                        icon: images.ic_tick,
                    })
                    let timeOut = setTimeout(() => { 
                        setForm({ ...form, first_name: '', last_name: '' });
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
        const findErrors = validationForm()
        if (Object.values(findErrors).some((err) => err !== '')) {
            setError(findErrors)
        } else {
            changeName(form)
        }
        setErrorText('')
    }

    const handleChangeForm = (e) => {
        const { name, value } = e
        setErrorText('')
        if (name) {
            setForm({ ...form, [name]: value })
            setError({ first_name: '', last_name: '' })
        }
    }

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl border md:border-0 border-neutral-70">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="">
                    <p className='font-bold text-base'>
                        {t('current_name', { keyPrefix: 'my_account' })}
                    </p>
                    <Input
                        name='text'
                        className='w-full mt-[.5rem] mb-[4px]'
                        inputClass='font-medium !text-neutral-30 text-base	'
                        value={lastName}
                        rowed="w-full"
                        isDisabled={true}
                    />
                </div>
                <div className="flex">
                    <Input
                        name='old_lastName'
                        className='w-full mb-[4px] md:mt-auto'
                        inputClass='font-medium !text-neutral-30 text-base'
                        value={lastName}
                        rowed="w-full "
                        isDisabled={true}
                    />
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
                <div className="">
                    <p className='font-bold text-base'>
                        {t('propose_new_name', { keyPrefix: 'my_account' })}
                    </p>
                    <Input
                        name='first_name'
                        value={form.first_name}
                        onChange={handleChangeForm}
                        className='w-full mt-[.5rem] mb-[4px]'
                        inputClass='font-medium !text-neutral-700 text-base'
                        placeholder={t('first_name', { keyPrefix: 'my_account' })}
                        rowed="w-full"
                    />
                </div>
                <div className="flex">
                    <Input
                        name='last_name'
                        value={form.last_name}
                        onChange={handleChangeForm}
                        className='w-full mb-[4px] md:mt-auto'
                        inputClass='font-medium !text-neutral-700 text-base'
                        rowed="w-full "
                        placeholder={t('last_name', { keyPrefix: 'my_account' })}
                    />
                </div>
            </div>
            <p className='text-neutral-40 mt-4 font-regular'>
                {t('pre_change_text_p', { keyPrefix: 'my_account' })}
            </p>

            <Button
                label={t('button_change_name', { keyPrefix: 'my_account' })}
                onClick={onSubmit}
                disabled={!form.first_name || !form.last_name || !validateName(form.first_name) || !validateName(form.last_name)}
                className={
                    'btn-secondary-hover  mt-8 rounded-full font-medium ml-auto px-6 w-full md:w-fit'
                }
            />
        </div>
    )
}
