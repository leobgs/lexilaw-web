export const ChatCard = ({ data, onClick }) => {
  return (
    <div className='bg-white px-4 py-10 rounded-3xl md:w-2/3'>
      <div className='font-futura-bolds font-bold text-xl text-center text-secondary-base mb-6'>
        Ingin menanyakan apa?
      </div>

      <div className='md:grid md:grid-cols-2 md:gap-2'>
        {data?.map((item, index) => (
          <div
            key={index}
            className='text-black-lightest px-6 py-5 bg-neutral-20 rounded-xl border border-neutral-10 mb-2'
            onClick={() => onClick(item)}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}
