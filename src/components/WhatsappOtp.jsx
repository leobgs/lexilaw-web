import { notifyInfo } from 'hooks/useToas'
import { useEffect, useState } from 'react'

export const WhatsappOtp = () => {
  const [second, setSecond] = useState(45)

  const isDisabled = second !== 0

  const handleOnSubmit = () => {}

  useEffect(() => {
    const interval = setInterval(() => {
      if (second > 0) {
        setSecond((prev) => prev - 1)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [second])
  return (
    <div className="rounded-md w-[536px] bg-neutral-80">
      <div className="p-8">
        {/* Header */}
        <div>
          <h1 className="text-center font-bold mb-2">OTP Terkirim ke</h1>
          <div className="flex items-center gap-x-2 justify-center">
            <h1 className="font-bold">+62 8787 1680 132</h1>
            <span className="font-semi-bold py-1 px-2 border rounded-full border-full text-xs bg-blue-sky hover:cursor-pointer">
              Ganti
            </span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className="flex justify-center">
            <input
              type="tel"
              placeholder="Masukkan 6 digit angka"
              maxLength={6}
              className="border-b-2 font-bold text-[32px] bg-neutral-80 block placeholder:text-center text-center focus:outline-none mt-4 placeholder:text-[20px] placeholder:font-medium"
            />
          </div>
        </form>
      </div>

      <div className="mt-2 mb-12">
        <p className="text-center">
          Tunggu {second.toString().length <= 1 ? '0' + second : second} Detik untuk melakukan{' '}
          <span
            className={`font-bold underline underline-offset-4 ${
              !isDisabled ? 'hover:cursor-pointer' : 'hover:cursor-not-allowed opacity-30'
            }`}
            onClick={() => {
              if (!isDisabled) {
                notifyInfo('Handle Kirim Ulang [nunggu BE]')
                setSecond(45)
              }
            }}
          >
            Kirim Ulang
          </span>
        </p>
      </div>
    </div>
  )
}
