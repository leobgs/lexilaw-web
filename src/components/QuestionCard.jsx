import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

export const QuestionCard = ({ data, onClick, className }) => {
  const { t } = useTranslation()
  return (
    <div className={clsx('bg-white px-4 py-10 rounded-2xl lg:w-4/5', className)}>
      <div className="font-futura-bold font-bold text-xl text-center text-[#087b48] mb-6 md:text-start">
        {t('text', {
          keyPrefix: 'question_card',
        })}
      </div>

      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2`}>
        {data?.left?.map((item, index) => (
          <div
            key={index}
            className={`text-black-lightest px-2 py-5 rounded-xl border  mb-2 text-sm my-auto h-full flex items-center text-center`}
            // onClick={() =>
            //   onClick({
            //     message: item.question,
            //     file: null,
            //   })
            // }
          >
            {item.question}
          </div>
        ))}

        {data?.right?.map((item, index) => (
          <div
            key={index}
            className={`text-black-lightest px-2 py-5 rounded-xl border  mb-2 text-sm my-auto h-full flex items-center text-center break-all lg:break-keep`}
            // onClick={() =>
            //   onClick({
            //     message: item.question,
            //     file: null,
            //   })
            // }
          >
            {item.question}
          </div>
        ))}
      </div>
    </div>
  )
}
