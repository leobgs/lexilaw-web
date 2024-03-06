import images from 'assets/images'
import { Button } from 'components/Button/Button'
import { InputPassword } from 'components/InputPassword'
import { Input } from 'components/Input'
import { Toggle } from 'components/Toggle/Toggle'
import React, { useState } from 'react';

import './Login.scss';

export const Login = () => {
  // const { openAlert } = useGlobalContext()

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleToggle = (isVisible) => {
    const elements = [
      { selector: '.card', action: isVisible ? 'remove' : 'add' },
      { selector: '.togglelanguage', action: isVisible ? 'remove' : 'add' },
      { selector: '.navBar', action: isVisible ? 'remove' : 'add' },
      { selector: '.logo', action: isVisible ? 'add' : 'remove' },
      { selector: '.desc', action: isVisible ? 'add' : 'remove' }
    ];

    elements.forEach(({ selector, action }) => {
      const element = document.querySelector(selector);
      if (element) {
        element.classList[action]('hidden');
      }
    });
  };


  const handleSignEmail = () => {
    handleToggle(true);
  };

  const handleBackLogin = () => {
    handleToggle(false);
  };

  const onSubmit = () => {
    console.log(form.email);
    console.log(form.password);
  };

  const handleChangeForm = (e) => {
    console.log(e);
    // if (!e) return;
    const { name, value } = e;

    if (name) {
      setForm({ ...form, [name]: value });
      setError('');
    }
  };


  return (
    <div className='bg-contain bg-center h-screen bg_auth flex items-center	flex-col'>
      <img
        src={images.bg_register_login}
        alt='register login'
        className='absolute bottom-0 h-5/6 w-full'
      />


      <div className="navBar border-b-2 border-green-900 hidden md:!hidden w-full">
        <Button
          label={'Login'}
          iconLeft={images.chevron_left}
          iconClassName={'w-[20px] h-[20px] me-2'}
          onClick={handleBackLogin}
          className={' text-white bg-transparent'}
        />
      </div>

      <div className="container mx-auto py-3 relative z-1 px-4 md:px-0 my-auto lg:px-[2rem]">

        <img src={images.lexilaw_logo} alt="" className='logo md:!block pb-[2rem] mx-auto md:mx-0 w-[120px] md:w-[160px] lg:w-[200px] md:ms-[-20px] lg:ms-0 lg:ms-[-30px]' />
        <div className="grid md:grid-cols-2 md:gap-5 xl:gap-12 2xl:gap-32">
          <div className='desc flex md:!flex flex-col justify-center'>
            <h1 className='text-5xl	 md:text-7xl text-white text-center md:text-start font-bold'>Legal Cepat<br /> &  Simple</h1>
            <p className='pt-[0.5rem] text-white text-center md:text-start font-light'>
              Cari solusi cepat dan mudah menggunakan Lexi AI, ditenagai oleh teknologi terkini memungkinkan kamu untuk mendapatkan bantuan hukum tanpa kendala biaya dan akses legal!
            </p>

          </div>

          <div>
            <Toggle className="togglelanguage hidden md:flex" />

            <div className="card rounded-lg p-[2.4rem] mb-[1.5rem] md:mb-0 md:!block hidden">

              <h2 className='mb-[1rem] text-green-900 text-2xl font-semibold text-center'>Login Menggunakan Email Terdaftar</h2>

              <Input
                name='email'
                value={form.email}
                onChange={handleChangeForm} 
                className='w-full rounded-full'
                inputClass='!border-secondary-logo focus:outline-secondary-logo'
                rowed
                placeholder='Alamat email'
              />

              <InputPassword
                name='password'
                className='w-full mt-[1.5rem]'
                inputClassName='!border-secondary-logo focus:outline-secondary-logo'
                placeholder='Kata sandi'
                value={form.password}
                onChange={handleChangeForm}
                error={error}
              />


              <Button
                // onClick={() => openAlert({ title: 'Halo Dek,', messages: 'Prima Kusumo', image: images.apple })}
                label={'Login'}
                onClick={onSubmit}
                iconRight={images.chevron_right}
                iconClassName={'absolute right-4'}
                disabled={
                  !form.password || !form.email
                }
                className={'btn-secondary-hover w-full mt-[2rem] mb-[1rem] rounded-full font-medium relative'}
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
                onClick={handleSignEmail}
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
