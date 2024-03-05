import images from 'assets/images'

import { useGlobalContext } from 'hooks/context'
import { InputPassword } from 'components/InputPassword'
import { Input } from 'components/Input'
import { Toggle } from 'components/Toggle/Toggle'

import './Login.scss';

export const Login = () => {
  const { openAlert } = useGlobalContext()


  return (
    <div className='bg-contain bg-center h-screen bg_auth'>
      <img
        src={images.bg_register_login}
        alt='register login'
        className='absolute bottom-0 right-0 h-5/6 w-full'
      />

      <div className="container mx-auto pt-2 md:pt-[80px] relative z-1 px-4 md:px-0">
        <img src={images.lexilaw_logo} alt="" className='pb-[2rem] mx-auto md:mx-0 w-[120px] md:w-[160px] lg:w-[200px] md:ms-[-20px] lg:ms-0' />
        <div className="grid md:grid-cols-2 md:gap-5 xl:gap-12 2xl:gap-32">
          <div className='flex flex-col justify-center'>
            <h1 className='text-5xl	 md:text-7xl text-white text-center md:text-start lg:ps-[2rem] font-bold'>Legal Cepat<br /> &  Simple</h1>
            <p className='pt-[0.5rem] text-white text-center md:text-start lg:ps-[2rem] font-light'>
              Cari solusi cepat dan mudah menggunakan Lexi AI, ditenagai oleh teknologi terkini memungkinkan kamu untuk mendapatkan bantuan hukum tanpa kendala biaya dan akses legal!
            </p>
          </div>

          <div>
            <Toggle className="mx-4 flex justify-end align-center hidden md:block" />

            <div className="card rounded-lg	p-[2.4rem] hidden md:block">
              <h2 className='mb-[1rem] text-green-900 text-2xl font-semibold text-center'>Login Menggunakan Email Terdaftar</h2>

              <Input
                name='username'
                // value={form.username}
                // onChange={handleChangeForm}
                className='w-full rounded-full'
                inputClass='!border-secondary-logo focus:outline-secondary-logo'
                rowed
                placeholder='Alamat Email'
              />


              <InputPassword
                name='password'
                className='w-full mt-[1.5rem]'
                inputClassName='!border-secondary-logo focus:outline-secondary-logo'
                placeholder='Kata sandi'
                value=''
                onChange=''
                error=''
              />


              <Button
                onClick={() => openAlert({ title: 'Halo Dek,', messages: 'Prima Kusumo', image: images.apple })}
                label={'Login'}
                iconRight={images.chevron_right}
                iconClassName={'absolute right-4'}
                className={'btn-arrow w-full mt-[2rem] mb-[1rem] rounded-full font-medium relative'}
              />


              <p className='text-center font-medium'>Belum punya Akun?
                <a className='font-bold text-gray-900 underline ms-1' href="">Registrasi</a></p>

            </div>


            <div className="grid lg:grid-cols-2 lg:gap-5 px-3">
              <Button
                label={'MASUK DENGAN GOOLGE'}
                iconLeft={images.google}
                iconClassName={'w-[20px] h-[20px] me-2'}
                className={'bg-outline-transparent text-white w-full mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs'}
              />

              <Button
                label={'MASUK DENGAN APPLE ID'}
                iconLeft={images.apple}
                iconClassName={'w-[20px] h-[20px] me-2'}
                className={'bg-outline-transparent text-white w-full lg:mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs'}
              />

              <Button
                label={'MASUK DENGAN EMAIL'}
                iconLeft={images.email_outline}
                iconClassName={'w-[20px] h-[20px] me-2'}
                className={'md:hidden bg-outline bg-white text-green-900 w-full lg:mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs'}
              />


              <p className='text-center text-gray-400 font-medium md:hidden'>Belum punya Akun?
                <a className='font-bold text-white underline ms-1' href="">Registrasi</a></p>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}
