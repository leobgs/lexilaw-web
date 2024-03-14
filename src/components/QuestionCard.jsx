import clsx from 'clsx'

export const QuestionCard = ({ data, onClick, className }) => {
  return (
    <div
      className={clsx(
        'bg-white px-4 py-10 rounded-3xl md:w-1/2 md:outline md:outline-neutral-30',
        className
      )}
    >
      <div className='font-futura-bolds font-bold text-xl text-center text-secondary-base mb-6 md:text-start'>
        Ingin menanyakan apa?
      </div>

      <div>
        <div className='md:grid md:grid-cols-2 md:gap-2'>
          {data?.map((item, index) => (
            <div
              key={index}
              className='text-black-lightest px-6 py-5 bg-neutral-20 rounded-xl border border-neutral-10 mb-2'
              onClick={() =>
                onClick({
                  text: item.text,
                  file: null,
                })
              }
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
