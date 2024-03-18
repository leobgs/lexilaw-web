import images from 'assets/images'
import { Spinner, Button, Input, InputPIN, InputSelect } from 'components'
import { Switch } from 'components'
import { useGlobalContext } from 'hooks/context'
import { useState } from 'react'

export const Components = () => {
  const { openAlert } = useGlobalContext()
  const [form, setForm] = useState({ pin: '', email: '', description: '' })
  const [error, setError] = useState({ pin: '', email: '', description: '' })
  const [isActive, setActive] = useState(false)

  const handleChangeForm = (e) => {
    setForm({
      ...form,
      [e.name]: e.value,
    })
    setError({ ...error, [e.name]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
    openAlert({
      messages: `email: ${form.email}, pin: ${form.pin}, desc: ${form.description}`,
    })
  }

  return (
    <div className='p-4 bg-primary-base'>
      <p>Typograph Inter</p>
      <p className='font-futura-bolds text-2xl font-bold'>Typograph Futura</p>

      <Spinner className={'mt-4'} />
      <InputSelect
        options={[{ label: 'Jakarta', value: 1 }]}
        className={'my-2'}
      />
      <Button
        className={'btn-outline my-4'}
        onClick={() => openAlert({ messages: 'Aloha mate!' })}
        label={'Click Me'}
      />
      <form onSubmit={handleSubmit}>
        <InputPIN
          onChange={handleChangeForm}
          label={'PIN/Password'}
          error={error.pin}
          name={'pin'}
          value={form.pin}
        />
        <Input
          onChange={handleChangeForm}
          label={'Email'}
          error={error.email}
          name={'email'}
          type='email'
          className={'mt-2'}
          value={form.email}
        />
        <Input
          onChange={handleChangeForm}
          label={'Description'}
          error={error.description}
          name={'description'}
          type='text-area'
          rows={3}
          className={'mt-2'}
          value={form.description}
        />
        <Button
          type={'submit'}
          label={'Submit'}
          onClick={() => void 0}
          className={
            'btn-secondary !rounded-3xl mt-4 w-1/2 items-center flex justify-between lg:w-1/6 xl:w-1/5'
          }
          iconRight={images.ic_vector_right}
          iconClassName={'!w-2 !h-3'}
          disabled={!form.description || !form.pin || !form.text}
        />
      </form>
    </div>
  )
}
