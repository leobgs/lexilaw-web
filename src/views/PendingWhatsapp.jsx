import images from 'assets/images'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

/**
 *
 * @deprecated sudah tidak digunakan, gunakan komponent WhatsappFitBit
 *
 * @returns {React.ReactNode}
 */
export const PendingWhatsapp = () => {
  const { t } = useTranslation()
  return (
    <div className="bg-primary-base p-4 md:h-screen md:p-4">
      <NavLink className="flex items-center w-fit" to="/">
        <img
          className="me-2 h-[18px]"
          src={images.ic_chevron_left}
          alt="back"
        />
        <div className="font-futura-bold font-bold text-xl text-dark-50 ">
          {t('chat.profile_menu.connecting_whatsapp')}
        </div>
      </NavLink>

      <div className="flex justify-between mt-6 md:mt-12">
        {/* card */}
        <div className="bg-white rounded-md w-[800px] mx-auto">
          {/* content */}
          <div className="flex flex-col justify-center items-center px-4 w-[338px] lg:w-[400px] mx-auto my-16">
            {/* Icon Sand Time */}
            <img alt="sand-time" src={images.ic_sand_time_big} />

            <h1 className="font-futura-bold text-[24px] lg:text-[32px] text-center text-dark-50">
              {t('chat.profile_menu.pending_whatsapp_heading')}
            </h1>
            <p
              className="text-center my-2 text-dark-50 text-[15px] lg:text-[16px]"
              dangerouslySetInnerHTML={{
                __html: t('chat.profile_menu.pending_whatsapp_description'),
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  )
}
