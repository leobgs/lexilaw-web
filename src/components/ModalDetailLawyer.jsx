import images from 'assets/images'
import { Modal } from './Modal'
import { Tabs } from './Tabs'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { copyToClipboard } from 'utils'
import { Button } from './Button/Button'
import { API } from 'config/api'
import { useInfiniteQuery, useMutation, useQuery } from 'react-query'
import { getData } from 'hooks/useRequest'
import { useTranslation } from 'react-i18next'
import { formatDate, formatTime } from 'utils/formatTime'
import { useGlobalContext } from 'hooks/context'
import { notifyBottomError } from 'hooks/useToas'

export const ModalDetailLawyer = ({
  data,
  show = false,
  onHide = () => { },
}) => {
  const { t, i18n } = useTranslation()
  const [currText, setCurrText] = useState(
    t('results', { keyPrefix: 'my_lawyer' })
  )
  const [dataDocumment, setDataDocumment] = useState([])
  const [dataListDocumment, setDataListDocumment] = useState([])
  const [lawyerData, setlawyerData] = useState([])

  const { currentLanguage } = useGlobalContext()
  const navigate = useNavigate()
  const scheduleContainerRef = useRef(null)
  const scheduleRef = useRef(null)

  const getdetailLawyer = useQuery(['detailLawyer', show], () => {
    if (show) {
      return getData(API.MY_LAWYER_DETAIL + show)
    } else {
      return Promise.resolve(null)
    }
  })

  const {
    data: lawyerSchedulesPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['lawyerSchedules', show],
    ({ pageParam = 1 }) => {
      if (show) {
        return getData(
          API.MY_LAWYER_SCHEDULES + show + `?page=${pageParam}&limit=1000`
        )
      } else {
        return Promise.resolve(null)
      }
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const totalPage = Math.ceil(lastPage.meta.total / lastPage.meta.limit)
        if (lastPage.meta.page < totalPage) {
          return lastPage.meta.page + 1
        }
        return undefined
        // Assuming your API returns a `nextPage` property when there's more data
        // return lastPage.meta.page + 1 ?? undefined;
      },
      enabled: !!show,
    }
  )

  const lawyerSchedules =
    lawyerSchedulesPages?.pages.flatMap((page) => page.data) ?? []

  const getdocument = useQuery(['documentlawyer', show], () => {
    if (show) {
      return getData(API.MY_LAWYER_DOCUMENT + show)
    } else {
      return Promise.resolve(null)
    }
  })

  const callbackObserver = useCallback(
    (entries) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [hasNextPage, fetchNextPage, isFetchingNextPage]
  )

  useEffect(() => {
    if (show) {
      if (getdetailLawyer?.data?.status === 'Success') {
        setlawyerData(getdetailLawyer.data.data)
      }
      if (getdocument?.data?.status === 'Success') {
        setDataListDocumment(getdocument.data.data)
      }
    }
  }, [show, getdetailLawyer, getdocument])

  useEffect(() => {
    const scheduleContainer = scheduleContainerRef.current
    const schedule = scheduleRef.current

    if (!schedule || !scheduleContainer) return
    const observer = new IntersectionObserver(callbackObserver, {
      threshold: 1,
      root: scheduleContainer,
    })

    if (schedule) {
      observer.observe(schedule)
    }

    return () => {
      if (schedule) {
        observer.unobserve(schedule)
      }
    }
  }, [callbackObserver, currText])

  useEffect(() => {
    if (dataListDocumment && dataListDocumment.length > 0) {
      dataListDocumment.forEach((item, index) => {
        item.isActive = index === 0
      })

      setDataDocumment([...dataListDocumment])
    } else {
      setDataDocumment([])
    }
  }, [dataListDocumment])

  const { mutate: getSchedules, error } = useMutation(
    ({ thread_uuid, lawyer_uuid }) =>
      getData(
        API.AVAILABLE_SCHEDULES +
        `/${lawyer_uuid}/${thread_uuid}?page=1&limit=1`
      ),
    {
      onSettled: (data, error, variables) => {
        if (error || data.status !== 'Success') {
          notifyBottomError(t('error', { keyPrefix: 'schedule' }))
        } else if (data.status === 'Success') {
          const thread_uuid = variables.thread_uuid
          navigate(`/schedule`, {
            state: {
              scheduling_url_event: data.data.scheduling_url_event,
              lawyer_uuid: lawyerData.uuid,
              thread_uuid,
            },
          })
        }
      },
    }
  )

  const handleAddSchedule = (thread_uuid, lawyer_uuid) => {
    if (thread_uuid !== null) {
      getSchedules({ thread_uuid, lawyer_uuid })
    }
  }

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ')
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'
    }
    return text
  }

  const lawyerDescription = truncateText(
    getdetailLawyer.data?.data?.description || '',
    200
  )

  const handleShowHideDiv = (id) => {
    setDataDocumment((prevDataDocumment) =>
      prevDataDocumment.map((item) =>
        item.thread_uuid === id ? { ...item, isActive: !item.isActive } : item
      )
    )
  }

  return (
    <Modal
      show={show}
      onHide={() => void 0}
      contentClassName="bg-screen h-full px-4 md:!w-1/2 xl:!w-1/3 lg:!w-1/2 md:!h-[90%] md:rounded-xl overflow-y-auto no-scrollbar"
      className="bg-neutral-40 h-full"
    >
      <div className="md:hidden">
        <div className="bg-neutral-60 -mx-4 px-4 py-4 flex items-center gap-2 top fixed w-full">
          <img
            src={images.ic_back}
            alt="back"
            onClick={() => onHide()}
            className="h-6 w-4 "
          />
          <div className="flex items-center">
            <img
              src={lawyerData.image_url}
              alt="images"
              className="rounded-full w-12 h-12"
            />
            <div className="ml-2">
              <div className="font-semi-bold text-secondary-base">
                {lawyerData.first_name} {lawyerData.last_name}
              </div>
              <div className="text-xs text-neutral-40">{lawyerData.city}</div>
            </div>
          </div>
        </div>

        <div
          className={`bg-neutral-60 mb-3 -mx-4 px-4 py-4 ${currText === t('results', { keyPrefix: 'my_lawyer' })
            ? ''
            : 'hidden'
            }`}
        >
          <div className="line-clamp-5 text mt-20">{lawyerDescription}</div>
          <div className={`grid grid-cols-10 mt-4 gap-2`}>
            {lawyerData.lawyer_filed?.map((item, index) => (
              <div
                className="bg-[#FFFBF5] rounded-lg py-1 px-2 font-semi-bold text-center text-dark-50 my-auto line-clamp-1 text-xs col-span-4 first:col-span-5"
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:flex pb-4 bg-neutral-60 overflow-y-auto -mx-4 relative flex-col">
        <div className="bg-neutral-60 px-4 py-4 flex items-center gap-2 justify-between rounded-t-2xl fixed md:!w-1/2 xl:!w-1/3 lg:!w-1/2 bg-img-detail">
          <div className="flex items-center">
            <img
              src={lawyerData.image_url}
              alt="images"
              className="rounded-full w-12 h-12"
            />
            <div className="ml-2">
              <div className="font-semi-bold text-secondary-base">
                {lawyerData.first_name} {lawyerData.last_name}
              </div>
              <div className="text-xs text-neutral-40">{lawyerData.city}</div>
            </div>
          </div>
          <img
            src={images.ic_close}
            alt="back"
            onClick={() => onHide()}
            className="h-4 w-4"
          />
        </div>
        <div className="line-clamp-5 text px-4 mt-20">{lawyerDescription}</div>

        <div className={`flex flex-wrap mt-4 gap-2 mx-4`}>
          {lawyerData.lawyer_filed?.map((item, index) => (
            <div
              className="w-fit bg-[#FFFBF5] rounded-full py-1 px-2 text-center text-neutral-40 my-auto line-clamp-1 text-xs font-medium"
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <Tabs
        className={`${currText === t('results', { keyPrefix: 'my_lawyer' })
          ? 'md:mt-4'
          : 'mt-24 md:mt-4 mb-4'
          } font-semibold text-sm`}
        textArr={[
          t('results', { keyPrefix: 'my_lawyer' }),
          t('schedule', { keyPrefix: 'my_lawyer' }),
        ]}
        onTabClick={(e) => setCurrText(e)}
        currText={currText}
      />

      {currText === t('results', { keyPrefix: 'my_lawyer' }) ? (
        <>
          <div className="md:h-[66%] h-full overflow-y-auto">
            {dataDocumment && dataDocumment.length > 0 ? (
              dataDocumment.map((item) => (
                <div
                  className="bg-white p-4 rounded-2xl mb-4 last:mb-4 first:mt-4"
                  key={item.thread_uuid}
                >
                  <div
                    className="flex justify-between mb-2"
                    onClick={() => handleShowHideDiv(item.thread_uuid)}
                  >
                    <div className="text-sm">{item.thread_title}</div>
                    <img
                      src={images.ic_menu_down_darker}
                      alt="updown"
                      className={`${item.isActive ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {item.isActive && (
                    <div className="gap-2 grid grid-cols-3 lg:grid-cols-4">
                      {item.files?.map((itm) => (
                        <div key={itm.uuid}>
                          {itm.file_url ? (
                            <div
                              className="relative w-full aspect-square cursor-pointer"
                              onClick={() => {
                                if (itm.file_url.endsWith('.pdf') || itm.file_url.endsWith('.docx')) {
                                  window.open(`https://docs.google.com/gview?url=${itm.file_url}`, '_blank');
                                } else if (itm.file_url.endsWith('.png') || itm.file_url.endsWith('.jpg') || itm.file_url.endsWith('.jpeg') || itm.file_url.endsWith('.PNG') || itm.file_url.endsWith('.JPG') || itm.file_url.endsWith('.JPEG')) {
                                  window.open(itm.file_url, '_blank');
                                }
                              }}
                            >
                              <div className="absolute top-0 left-0 w-full h-full z-10 bg-transparent"></div>
                              {itm.file_url.endsWith('.pdf') || itm.file_url.endsWith('.docx') ? (
                                <iframe
                                  src={`https://docs.google.com/gview?url=${encodeURIComponent(itm.file_url)}&embedded=true&rm=minimal`}
                                  className="w-full rounded-md aspect-square"
                                  title="Document Viewer"
                                ></iframe>
                              ) : itm.file_url.endsWith('.png') || itm.file_url.endsWith('.jpg') || itm.file_url.endsWith('.jpeg') || itm.file_url.endsWith('.PNG') || itm.file_url.endsWith('.JPG') || itm.file_url.endsWith('.JPEG') ? (
                                <img
                                  src={itm.file_url}
                                  alt="Default Image"
                                  className="w-full rounded-md aspect-square object-cover"
                                />
                              ) : null}
                            </div>
                          ) : (
                            <div className="bg-[#E2DFDA] w-full rounded-md aspect-square flex justify-center items-center">
                              <img
                                src={images.ic_time_sand}
                                alt="Default Image"
                                className="w-4 "
                              />
                            </div>
                          )}
                          <div
                            onClick={() => {
                              if (itm.file_url.endsWith('.pdf') || itm.file_url.endsWith('.docx')) {
                                window.open(`https://docs.google.com/gview?url=${itm.file_url}`, '_blank');
                              } else if (itm.file_url.endsWith('.png') || itm.file_url.endsWith('.jpg') || itm.file_url.endsWith('.jpeg') || itm.file_url.endsWith('.PNG') || itm.file_url.endsWith('.JPG') || itm.file_url.endsWith('.JPEG')) {
                                window.open(itm.file_url, '_blank');
                              }
                            }}
                            className="text-neutral-40 text-xs mt-1 cursor-pointer"
                          >
                            {i18n.language === 'en'
                              ? itm.service_name_english
                              : itm.service_name_indonesia}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="h-[100%] w-[300px] flex flex-col justify-center items-center mx-auto">
                <img
                  src={images.ic_file}
                  alt="documment attached"
                  className="mb-3 w-14 h-14"
                />
                <p className="text-center text-sm text-dark-50">
                  {t('you_haven_results_lawyer', { keyPrefix: 'my_lawyer' })}
                </p>
                <div className="text-center text-sm font-semi-bold text-[#073A77]">
                  {t('chat_with_lexi', { keyPrefix: 'my_lawyer' })} ↗️
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          className="md:h-[66%] h-full overflow-y-scroll no-scrollbar"
          ref={scheduleContainerRef}
        >
          {lawyerSchedules &&
            lawyerSchedules.length > 0 &&
            lawyerSchedules.map((item, index) => (
              <>
                {item && item.thread_name
                  ? (
                    <div
                      className="bg-white mb-4 p-4 rounded-2xl shadow-md"
                      key={item?.created_at + 11}
                    >
                      <div className="font-bold text-2xl md:text-base md:font-semi-bold mb-3">
                        {item.thread_name
                          ? item.thread_name
                          : dataDocumment[index].name_event}
                      </div>
                      {item.join_url ? (
                        <>
                          <div className="font-light">
                            {t('schedule_at', { keyPrefix: 'my_lawyer' })}
                          </div>
                          <div className="font-semi-bold">
                            {formatDate(item.start_time, currentLanguage)} |&nbsp;
                            {formatTime(item.start_time)} -{' '}
                            {formatTime(item.end_time)}
                          </div>
                        </>
                      ) : (
                        <div className="font-light">
                          {t('no_schedule', { keyPrefix: 'my_lawyer' })}
                        </div>
                      )}
                      <div div className="bg-screen -mx-4 -mb-4 px-4 py-4 rounded-b-2xl mt-4" >
                        {item.join_url ? (
                          <div className="flex justify-between">
                            <div>
                              <p className="text-blue-dark/30 text-sm font-medium">
                                {t('meeting_room', { keyPrefix: 'my_lawyer' })}
                              </p>
                              <div className="flex gap-2 items-center w-fit">
                                <Link
                                  to={item.join_url}
                                  className="a-link w-[240px] text-ellipsis line-clamp-1 font-medium"
                                >
                                  {item.join_url}
                                </Link>
                                <button
                                  className="w-4 h-4"
                                  onClick={() =>
                                    copyToClipboard({
                                      text: item.join_url,
                                      title: t('copy_to_clipboard'),
                                    })
                                  }
                                >
                                  <img
                                    src={images.ic_copy_button}
                                    alt="copy"
                                    className="bg-transparent"
                                  />
                                </button>
                              </div>
                            </div>
                            <Button
                              onClick={() => window.open(item.join_url, '_blank')}
                              label="Join Call"
                              iconRight={images.ic_handycam}
                              iconClassName="!w-4 !h-2.5"
                              className="bg-blue-sky rounded-full"
                            />
                          </div>
                        ) : (
                          <div className="flex justify-end mt-2">
                            <Button
                              onClick={() => {
                                handleAddSchedule(item.thread_uuid, item.lawyer_uuid)
                              }}
                              label={t('add_schedule', { keyPrefix: 'my_lawyer' })}
                              iconRight={images.ic_calendar_white_outline}
                              iconClassName="!w-4 !h-4"
                              className="bg-[#1D6DF6] text-white rounded-full !font-medium"
                            />
                          </div>
                        )}
                      </div>
                    </div>)
                  : (
                    <></>)
                }
              </>
            ))
          }
          <div ref={scheduleRef} className="h-10 bg-red-500">
            {hasNextPage ? '' : ''}
          </div>
        </div >
      )
      }
    </Modal >
  )
}
