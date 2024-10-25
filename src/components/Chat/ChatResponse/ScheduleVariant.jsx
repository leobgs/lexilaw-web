import images from 'assets/images'
import { API } from 'config/api'
import { getData } from 'hooks/useRequest'
import { notifyError } from 'hooks/useToas'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

export const ScheduleVariant = ({ item }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [schedules, setSchedules] = useState(null)

  useQuery(
    ['available_schedules'],
    () =>
      getData(
        API.AVAILABLE_SCHEDULES +
          `/${item.lawyer_uuid}/${item.thread_uuid}?page=1&limit=5`
      ),
    {
      onSettled: (data) => {
        if (
          data.status === 'Success' ||
          (data.status === 'Bad Request' && data.message === 'Done')
        ) {
          const updatedResponse = data?.data?.availability_schedules?.map(
            (item) => ({
              ...item,
              start_time_formatted_eng: convertTimeToUserTimezone(
                item.start_time
              ),
              start_time_formatted_ind: convertTimeToUserTimezone(
                item.start_time,
                'id-ID'
              ),
            })
          )
          setSchedules({
            ...data?.data,
            availability_schedules: updatedResponse,
          })
        } else {
          notifyError(data?.message)
        }
      },
    }
  )

  const handleSetSchedule = (url) => {
    navigate(`/schedule`, {
      state: {
        scheduling_url_event: url,
        lawyer_uuid: item.lawyer_uuid,
        thread_uuid: item.thread_uuid,
      },
    })
  }

  return (
    <div className="md:border-t-0 mt-2 md:flex-row">
      {<div className="border-t border-neutral-30 px-2 md:hidden pb-1.5" />}
      <div className="my-1.5 flex flex-wrap items-start gap-x-3 gap-y-1.5">
        {schedules?.availability_schedules?.map((scheduleItem, index) => (
          <ScheduleItem
            key={index}
            schedule={scheduleItem}
            lawyer_uuid={item.lawyer_uuid}
            thread_uuid={item.thread_uuid}
          />
        ))}
      </div>

      {schedules && schedules?.availability_schedules && (
        <button
          className="border-[#E0DBD1] bg-white border rounded-3xl gap-2 !py-0 !font-regular !h-[2rem] flex items-center text-sm px-2.5"
          onClick={() => handleSetSchedule(schedules.scheduling_url_event)}
        >
          <img src={images.ic_arrow_cornering} alt="place order" />
          <div>{t('set_yourself', { keyPrefix: 'chat_respond' })}</div>
        </button>
      )}
    </div>
  )
}

const ScheduleItem = ({ schedule, lawyer_uuid, thread_uuid }) => {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const handleSetSchedule = () => {
    navigate(`/schedule`, {
      state: {
        scheduling_url_event: schedule.scheduling_url,
        lawyer_uuid: lawyer_uuid,
        thread_uuid,
      },
    })
  }
  return (
    <div
      className="border-blue-dark border rounded-3xl bg-blue-sky gap-2 py-1.5 font-regular text-sm flex items-center px-2.5 text-center cursor-pointer whitespace-nowrap overflow-hidden"
      onClick={() => {
        handleSetSchedule(schedule.scheduling_url)
      }}
    >
      <img
        src={images.ic_change_style_lang}
        alt="change style"
        className="w-3"
      />
      <span className="whitespace-nowrap overflow-hidden">
        {isEn
          ? schedule?.start_time_formatted_eng
          : schedule?.start_time_formatted_ind}
      </span>
    </div>
  )
}

const convertTimeToUserTimezone = (utcTime, locale) => {
  const date = new Date(utcTime)
  const userLocale = locale || navigator.language // Mendapatkan locale otomatis dari browser

  return new Intl.DateTimeFormat(userLocale, {
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date)
}
