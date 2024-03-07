import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import images from 'assets/images';
import { Button } from 'components/Button/Button';
import { Toggle } from 'components/Toggle/Toggle';

export default function AuthLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isOnLogin = location.pathname === '/login';
  const isOnRegister = location.pathname === '/register';
  const isOnAuthPage = isOnRegister || isOnLogin;
  const isOnMobileSize = windowWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSignEmail = () => {
    navigate('/login');
  };

  const handleBackLogin = () => {
    navigate(-1);
  };

  return (
    <div className="bg-contain bg-center  h-screen bg_auth flex items-center flex-col relative">
      {(isOnMobileSize && isOnAuthPage) && (
        <div className="navBar border-b-2 border-green-900 md: w-full">
          <Button
            label={ isOnLogin ? "Login" : "Daftar Sekarang" }
            iconLeft={images.chevron_left}
            iconClassName={"w-[20px] h-[20px] me-2"}
            onClick={handleBackLogin}
            className={" text-white bg-transparent"}
          />
        </div>
      )}

      <div className="container mx-auto py-3 relative z-1 px-4 md:px-0 my-auto lg:px-[2rem]">
        { ((!isOnAuthPage && isOnMobileSize) || !isOnMobileSize) &&
          <img src={images.lexilaw_logo} alt="" className="logo md:!block pb-[2rem] mx-auto md:mx-0 w-[120px] md:w-[160px] lg:w-[200px] md:ms-[-20px] lg:ms-0 lg:ms-[-30px]"/>
          }

        <div className="grid md:grid-cols-2 md:gap-5 xl:gap-12 2xl:gap-32">
        { ((!isOnAuthPage && isOnMobileSize) || !isOnMobileSize) &&
          <div className="desc flex md:!flex flex-col justify-center">
            <h1 className="font-bold text-5xl	 md:text-7xl text-white text-center md:text-start">
              Legal Cepat
              <br /> & Simple
            </h1>
            <p className="pt-[0.5rem] text-white text-center md:text-start font-light">
              Cari solusi cepat dan mudah menggunakan Lexi AI, ditenagai oleh
              teknologi terkini memungkinkan kamu untuk mendapatkan bantuan
              hukum tanpa kendala biaya dan akses legal!
            </p>
          </div>
          }

          <div>
            {(isOnAuthPage && isOnMobileSize) || !isOnMobileSize ? (
              <>
              <Toggle className="togglelanguage md:flex" />

              <Outlet />
              </>
            ) : null}

            <div className="grid lg:grid-cols-2 lg:gap-5 px-3">
              <Button
                label={"MASUK DENGAN GOOLGE"}
                iconLeft={images.google}
                iconClassName={"w-[20px] h-[20px] me-2"}
                className={
                  "whitespace-nowrap bg-outline-transparent text-white w-full mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs"
                }
              />

              <Button
                label={"MASUK DENGAN APPLE ID"}
                iconLeft={images.apple}
                iconClassName={"w-[20px] h-[20px] me-2"}
                className={
                  "whitespace-nowrap bg-outline-transparent text-white w-full lg:mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs"
                }
              />

              <Button
                label={"MASUK DENGAN EMAIL"}
                iconLeft={images.email_outline}
                iconClassName={"w-[20px] h-[20px] me-2"}
                onClick={handleSignEmail}
                className={
                  "md:hidden bg-outline bg-white text-green-900 w-full lg:mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs"
                }
              />

              <p className="text-center text-gray-400 font-medium md:hidden">
                Belum punya Akun?
                <a className="font-bold text-white underline ms-1" href="">
                  Registrasi
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
