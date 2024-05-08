import { Modal } from './Modal'
import images from 'assets/images'
import { Button } from './Button/Button'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { PAYMENT_METHOD } from 'utils/dummy'
import { useState } from 'react'
import { numberSeparator } from 'utils/numberSeparator'
import { useGlobalContext } from 'hooks/context'

export const PaymentMethodModal = ({
  dataLawyer,
  isShow,
  onHide = () => {},
}) => {
  const { t } = useTranslation()
  const [paymentMethods, setPaymentMethods] = useState(PAYMENT_METHOD)
  const [isAnyPaymentSelected, setIsAnyPaymentSelected] = useState(false)

  const handleOnSelectPaymentMethod = (id) => {
    const updatedPaymentMethods = paymentMethods.map((method) =>
      method.id === id
        ? { ...method, isSelected: true }
        : { ...method, isSelected: false }
    )
    const anyPaymentSelected = updatedPaymentMethods.some(
      (method) => method.isSelected
    )
    setIsAnyPaymentSelected(anyPaymentSelected)
    setPaymentMethods(updatedPaymentMethods)
  }

  return (
    <Modal
      show={isShow}
      onHide={() => {}}
      contentClassName='bg-[#FCFCFC] overflow-y-scroll no-scrollbar bg-white !w-11/12 max-h-full md:!w-5/6 lg:!w-2/4 rounded-lg md:rounded animate'
      className='bg-neutral-40'
    >
      <div className='flex justify-between items-center p-6'>
        <div className='text-xl font-bold'>Pembayaran by Midtrans</div>
        <img
          src={images.ic_close}
          alt='close'
          onClick={() => {
            handleOnSelectPaymentMethod(-1)
            onHide()
          }}
          className='inline-block'
        />
      </div>

      <div className='bg-[#D6D6D6] flex justify-between items-center p-6 border-y border-[#EEEEEE]'>
        <div className='text-lg font-regular'>Pembayaran Tagihan</div>
        <div className='text-lg font-bold md:font-semi-bold'>
          {numberSeparator(dataLawyer?.total_price, 'Rp', ',')}
        </div>
      </div>

      <PaymentMethodsList
        paymentMethods={paymentMethods}
        onSelect={handleOnSelectPaymentMethod}
      />

      <div className=' flex border-t border-[#EEEEEE]'>
        <Button
          label={'Bayar Sekarang'}
          onClick={() => {
            onHide()
          }}
          className={clsx(
            'w-full mx-8 my-[18px] bg-gradient-to-r from-[#1D1D1D] to-[#403E3E] font-bold text-[#E9E9E9] text-base rounded-md transition',
            isAnyPaymentSelected ? `` : `opacity-50`
          )}
          disabled={!isAnyPaymentSelected}
        />
      </div>
    </Modal>
  )
}

const PaymentMethodsList = ({ paymentMethods, onSelect = (id) => {} }) => {
  return (
    <div className='flex-row overflow-y-scroll no-scrollbar space-y-4 py-8 min-h-20 max-h-80'>
      {paymentMethods.map((method) => (
        <PaymentMethodCell
          key={method.name}
          data={method}
          onSelect={() => {
            onSelect(method.id)
          }}
        />
      ))}
    </div>
  )
}

export const PaymentMethodCell = ({ data, onSelect = () => {} }) => {
  return (
    <div
      className={clsx(
        `flex flex-row justify-between items-center h-[72px] rounded-md mx-8 md:mx-6 px-8 border-2`,
        data.isSelected ? `bg-[#F0ECEC]` : `bg-[#F6F6F6]`,
        data.isSelected ? `border-black` : `border-transparent`,
        data.isSelected ? `text-black` : `text-[#424242]`
      )}
      onClick={onSelect}
    >
      <p className='font-bold text'>{data.name}</p>

      <div className='flex flex-row gap-1'>
        {data.images.map((image) => (
          <img
            className='h-8 w-6 object-contain'
            src={image}
            alt='payment_method_logo'
          />
        ))}
      </div>
    </div>
  )
}
