import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, InputSelect, InputPassword } from 'components'
export const Password = () => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    const [errorText, setErrorText] = useState('')
    const [form, setForm] = useState({ old_password: '', new_password: '' })
    const [error, setError] = useState({ old_password: '', new_password: '' })

    const validationForm = () => {
        const newError = { ...error }

        // if (!validateName(form.old_password)) {
        //     newError.old_password = 'Format Nama Tidak sesuai'
        // } else if (!validateName(form.new_password)) {
        //     newError.new_password = 'Format Nama Tidak sesuai'
        // }

        if (form.new_password.length < 7) {
            newError.new_password = 'Minimal Password 8 karakter'
        } else if (!form.new_password) {
            newError.new_password = 'Password tidak boleh kosong'
        } else if (!form.old_password) {
            newError.old_password = 'Password tidak boleh kosong'
        }

        return newError
    }



    const onSubmit = () => {
        const findErrors = validationForm()
        if (Object.values(findErrors).some((err) => err !== '')) {
            setError(findErrors)
        } else {
            console.log(form);
            setIsOpen(!isOpen);
        }
        setErrorText('')
    }

    const handleChangeForm = (e) => {
        const { name, value } = e
        setErrorText('')
        if (name) {
            setForm({ ...form, [name]: value })
            setError({ old_password: '', new_password: '' })
        }
    }




    return (
        <div className="bg-white p-6 md:p-8 rounded-xl mt-6 mb-3 border md:border-0 border-neutral-70">
            {!isOpen && (
                <div className="flex flex-col md:flex-row justify-between">
                    <p className='font-bold my-auto'>
                        {t('password', { keyPrefix: 'my_account' })}
                    </p>
                    <Button
                        label={t('change_password', { keyPrefix: 'my_account' })}
                        onClick={toggleCollapse}
                        className={
                            'btn-secondary-hover rounded-full font-medium md:ml-auto px-6 mt-8 md:mt-0 w-full md:w-fit'
                        }
                    />
                </div>)}
            {isOpen && (
                <div className="">

                    <div className="flex flex-col">
                        <p className='font-bold mb-2 capitalize'>
                            {t('old_password', { keyPrefix: 'my_account' })}
                        </p>
                        <InputPassword
                            name='old_password'
                            className='w-full'
                            inputClassName='!border-secondary-logo focus:outline-secondary-logo font-medium'
                            placeholder={t('old_password', { keyPrefix: 'my_account' })}
                            error={error.old_password}
                            value={form.old_password}
                            onChange={handleChangeForm}
                        />
                    </div>

                    <div className="flex flex-col mt-3">
                        <p className='font-bold mb-2 capitalize'>
                            {t('new_password', { keyPrefix: 'my_account' })}
                        </p>
                        <InputPassword
                            name='new_password'
                            className='w-full'
                            inputClassName='!border-secondary-logo focus:outline-secondary-logo font-medium'
                            placeholder={t('new_password', { keyPrefix: 'my_account' })}
                            error={error.new_password}
                            value={form.new_password}
                            onChange={handleChangeForm}
                        />
                    </div>

                    <Button
                        label={t('save_password', { keyPrefix: 'my_account' })}
                        onClick={onSubmit}
                        disabled={!form.new_password || !form.old_password}
                        className={
                            'btn-secondary-hover rounded-full font-medium ml-auto px-6 mt-6 w-full md:w-fit'
                        }
                    />
                </div>

            )}
        </div>
    )
}
