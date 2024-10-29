import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, InputPassword } from 'components'
import { useGlobalContext } from 'hooks/context'
import images from 'assets/images'
import { useMutation } from 'react-query'
import { putData } from 'hooks/useRequest'
import { API } from 'config/api'

export const Password = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleCollapse = () => {
    setIsOpen(!isOpen)
  }

  const [errorText, setErrorText] = useState('')
  const [form, setForm] = useState({ old_password: '', new_password: '' })
  const [error, setError] = useState({ old_password: '', new_password: '' })
  const { openAlertSelfClosed } = useGlobalContext()

  const handleChangeForm = (e) => {
    const { name, value } = e
    setErrorText('')
    if (name) {
      setForm({ ...form, [name]: value })
      setError({ old_password: '', new_password: '' })
    }
  }

  const validationForm = () => {
    const newError = { ...error }

    newError.new_password = validatePassword(form.new_password)
    newError.old_password = validatePassword(form.old_password)

    if (form.new_password === form.old_password) {
      newError.new_password = t('message_new_password_must_not_same', {
        keyPrefix: 'my_account',
      })
    }
    return newError
  }

  const validatePassword = (password) => {
    if (password.length < 8) {
      return t('password_format_fail')
    }

    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    const digitRegex = /\d/
    const uppercaseRegex = /[A-Z]/ // Menambahkan validasi huruf kapital

    if (!symbolRegex.test(password)) {
      return t('password_format_fail')
    }

    if (!digitRegex.test(password)) {
      return t('password_format_fail')
    }

    if (!uppercaseRegex.test(password)) {
      // Mengecek keberadaan huruf kapital
      return t('password_format_fail')
    }

    return ''
  }

  const { mutate: updatePassword } = useMutation(
    (form) =>
      putData(API.UPDATE_PASSWORD, {
        password: form.old_password,
        new_password: form.new_password,
      }),
    {
      onSettled: (data) => {
        if (data.status === 'Success') {
          openAlertSelfClosed({
            title: t('message_password_success', { keyPrefix: 'my_account' }),
            icon: images.ic_tick,
          })
          setForm((prevForm) => ({
            ...prevForm,
            new_password: '',
            old_password: '',
          }))
          setIsOpen(!isOpen)
        } else {
          setErrorText(data.message)
          setError({
            ...error,
            old_password: t('message_password_wrong', {
              keyPrefix: 'my_account',
            }),
          })
        }
      },
    }
  )

  const onSubmit = () => {
    const findErrors = validationForm()
    if (Object.values(findErrors).some((err) => err !== '')) {
      setError(findErrors)
    } else {
      updatePassword(form)
    }
    setErrorText('')
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl mt-6 mb-12 border md:border-0 border-neutral-70">
      {!isOpen && (
        <div className="flex flex-col md:flex-row justify-between">
          <p className="font-bold my-auto">
            {t('password', { keyPrefix: 'my_account' })}
          </p>
          <Button
            label={t('change_password', { keyPrefix: 'my_account' })}
            onClick={toggleCollapse}
            className={
              'btn-secondary-hover rounded-full font-medium md:ml-auto px-6 mt-8 md:mt-0 w-full md:w-fit'
            }
          />
        </div>
      )}
      {isOpen && (
        <div className="">
          <div className="flex flex-col">
            <p className="font-bold mb-2 capitalize">
              {t('old_password', { keyPrefix: 'my_account' })}
            </p>
            <InputPassword
              name="old_password"
              className="w-full"
              inputClassName="!border-secondary-logo focus:outline-secondary-logo font-medium"
              placeholder={t('old_password', { keyPrefix: 'my_account' })}
              error={error.old_password}
              value={form.old_password}
              onChange={handleChangeForm}
            />
          </div>

          <div className="flex flex-col mt-3">
            <p className="font-bold mb-2 capitalize">
              {t('new_password', { keyPrefix: 'my_account' })}
            </p>
            <InputPassword
              name="new_password"
              className="w-full"
              inputClassName="!border-secondary-logo focus:outline-secondary-logo font-medium"
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
