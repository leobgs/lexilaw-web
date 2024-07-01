import clsx from 'clsx'

export const QuestionCard = ({ data, onClick, className }) => {
  return (
    <div
      className={clsx(
        'bg-white px-4 py-10 rounded-2xl md:w-1/2 md:outline md:outline-1 md:outline-neutral-30 shadow-lg',
        className
      )}
    >
      <div className='font-futura-bold font-bold text-xl text-center text-secondary-base mb-6 md:text-start'>
        Ingin menanyakan apa?
      </div>

      <div className='md:grid md:grid-cols-2 md:gap-2 md:h-60 h-96 overflow-y-scroll'>
        <div>
          {data?.left?.map((item, index) => (
            <div
              key={index}
              className={`text-black-lightest px-6 py-5 bg-[#F8F6F3] rounded-xl border border-neutral-10 mb-2 text-sm my-auto col-start-1`}
              onClick={() =>
                onClick({
                  message: item.question,
                  file: null,
                })
              }
            >
              {item.question}
            </div>
          ))}
        </div>
        <div>
          {data?.right?.map((item, index) => (
            <div
              key={index}
              className={`text-black-lightest px-6 py-5 bg-[#F8F6F3] rounded-xl border border-neutral-10 mb-2 text-sm my-auto col-start-2`}
              onClick={() =>
                onClick({
                  message: item.question,
                  file: null,
                })
              }
            >
              {item.question}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
