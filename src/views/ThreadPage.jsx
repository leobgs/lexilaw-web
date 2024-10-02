import axios from 'axios'
import clsx from 'clsx'
import { InputChat } from 'components'
import { AutoScrollingDiv } from 'components/AutoScrollDiv'
import { ChatCard } from 'components/ChatCard'
import { API } from 'config/api'
import { apiURLQuery } from 'config/app'
import { useGlobalContext } from 'hooks/context'
import { decryptAESGCM, encryptAESGCM } from 'hooks/useEncryptDecryption'
import { getData } from 'hooks/useRequest'
import { notifyError } from 'hooks/useToas'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import { RIWAYAT_OROLAN } from 'utils/dummy'
import { isScheduleFn } from 'utils/isScheduleFn'

export const fetchMessage = async ({ pageParam }, URL) => {
  const respond = await axios
    .get(`${apiURLQuery + URL}?page=${pageParam}`)
    .then((res) => res)
    .catch((error) => error.response)
  return respond.data
}

export const ThreadPage = ({
  className,
  hasFile,
  isFirstTimeChat,
  onFirstTimeChat,
  currKey,
}) => {
  const params = useParams()
  const { state } = useLocation()
  const queryClient = useQueryClient()
  const [disableInput, setDisableInput] = useState(false)
  const [renderedMessage, setRenderedMessage] = useState(null)
  const { t } = useTranslation()
  const [messageUUIDtoRespond, setMessageUUIDtoRespond] = useState(null)
  const [messageUUID, setMessageUUID] = useState(null)
  const [isScrolled, setScrolled] = useState(true)
  const { setIsFirstTime } = useGlobalContext()

  useEffect(() => {
    if (params.uuid === '63926537') {
      const dataFiltered = RIWAYAT_OROLAN.find(
        (item) => item.uuid === '63926537'
      )
      setRenderedMessage(dataFiltered?.chat)
    } else {
      setRenderedMessage([])
    }

    if (state) {
      setMessageUUID(state)
    } else {
      setMessageUUID(params.uuid)
    }
  }, [params.uuid, state])

  const { mutate: sendMessage } = useMutation(
    (form) => getData(API.MESSAGE_SEND, form),
    {
      onSettled: (datas) => {
        if (datas?.status === 'Success') {
          const { data } = datas
          setMessageUUID(data.thread_uuid)
          setRenderedMessage((prevArray) => [
            ...prevArray,
            {
              type: 'loading',
              from_display: 'SYSTEM',
              message: `${t('error_text', {
                keyPrefix: 'chat.chat_text',
              })}`,
            },
          ])
        } else {
          setDisableInput(false)
          setRenderedMessage((prevArray) => [
            ...prevArray,
            {
              type: 'error',
              message: `${t('error_text', {
                keyPrefix: 'chat.chat_text',
              })}`,
              from_display: 'SYSTEM',
            },
          ])
        }
      },
    }
  )

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['thread_detail', params.uuid],
    () => getData(`${API.THREAD_DETAIL + params.uuid}?limit=9999`),
    {
      onSettled: async (datas) => {
        let tmp = []
        const decryptedArray = await Promise.all(
          datas.pages?.map(async (item) => {
            const decrypted = await decryptAESGCM(item.data, currKey)
            return decrypted
          })
        )
        try {
          const parsedArray = JSON.parse(decryptedArray)

          parsedArray?.forEach((items) => {
            const isSchdule = isScheduleFn(items.message)
            if (isSchdule) {
              items.lawyer_uuid = isSchdule
              items.type = 'schedule'
            }
            tmp.push(items)
          })

          setRenderedMessage([...tmp])
          // setRenderedMessage((prevMessages) => [...prevMessages, ...tmp])
        } catch (err) {
          console.error('Parsing error', err)
        }
      },
      getNextPageParam: (lastpage) => {
        const nextPage = parseInt(lastpage?.meta?.page) + 1
        return nextPage
      },
      enabled: !!params.uuid && params.uuid !== '63926537',
    }
  )

  const { mutate: sendReaction } = useMutation(
    ({ params, reaction }) =>
      getData(`${API.MESSAGE_THUMBS}${params}/thumbs`, { reaction }),
    {
      onSettled: () => {
        queryClient.invalidateQueries('thread_detail')
      },
    }
  )

  const { isFetching: loadingRespondChat } = useQuery(
    ['respond_chat', messageUUIDtoRespond],
    () => getData(`${API.MESSAGE_RESPONSE}${messageUUIDtoRespond}`),
    {
      onSettled: (datas) => {
        if (datas?.status === 'Success') {
          queryClient.invalidateQueries('thread_detail')
          queryClient.invalidateQueries('newest_thread')
        } else {
          if (messageUUIDtoRespond === params.uuid) {
            renderedMessage?.forEach((item) => {
              if (item.type === 'loading') {
                return {
                  ...item,
                  from_display: 'SYSTEM',
                  message: `${t('error_text', {
                    keyPrefix: 'chat.chat_text',
                  })}`,
                  type: 'error',
                }
              }
            })
            setRenderedMessage([...renderedMessage])
          }
        }
      },
      enabled: !!messageUUIDtoRespond,
      staleTime: 0,
    }
  )

  useQuery(
    ['check_status', messageUUID],
    () => getData(API.MESSAGE_STATUS + `${messageUUID}/status`),
    {
      onSettled: (datas) => {
        if (datas?.status === 'Success') {
          const isLoading = renderedMessage?.find(
            (item) => item.type === 'loading'
          )
          const { data } = datas

          if (data.status === 'completed') {
            queryClient.invalidateQueries('respond_chat')
            setDisableInput(false)
            setMessageUUIDtoRespond(data.thread_uuid)
            if (isFirstTimeChat) {
              onFirstTimeChat()
              setIsFirstTime(true)
              // setIsFirstTime((prev) => !prev)
            }
          } else if (
            data.status === 'in_progress' ||
            data.status === 'queued'
          ) {
            setDisableInput(true)

            // (data.thread_id, collection?.thread_id) ini nanti harusnya dibuat diluar biar tiap load halaman loading lgsg nampil
            if (!isLoading && data.thread_uuid === params?.uuid) {
              renderedMessage &&
                setRenderedMessage((prevArray) => [
                  ...prevArray,
                  {
                    type: 'loading',
                    from_display: 'SYSTEM',
                    message: `${t('error_text', {
                      keyPrefix: 'chat.chat_text',
                    })}`,
                  },
                ])
            }
          } else {
            if (!isLoading) {
              renderedMessage &&
                setRenderedMessage((prevArray) => [
                  ...prevArray,
                  {
                    type: 'error',
                    message: `${t('error_text', {
                      keyPrefix: 'chat.chat_text',
                    })}`,
                    from_display: 'SYSTEM',
                  },
                ])
            }
          }
        }
      },
      refetchInterval: (query) => {
        if (
          query?.data?.status === 'in_progress' ||
          query?.data?.status === 'queued'
        ) {
          return 3000
        } else {
          return false
        }
      },
      onError: (e) => {
        renderedMessage?.forEach((item) => {
          if (item.type === 'loading') {
            return {
              ...item,
              from_display: 'SYSTEM',
              message: `${t('error_text', {
                keyPrefix: 'chat.chat_text',
              })}`,
              type: 'error',
            }
          }
        })
        setRenderedMessage([...renderedMessage])
      },
      enabled: !!messageUUID,
      staleTime: 0,
    }
  )

  const handleAddChat = async (e) => {
    let encryptMessage = ''
    try {
      encryptMessage = await encryptAESGCM(e.message, currKey)
    } catch (error) {
      notifyError('Encryption failed:', error)
    }

    setScrolled(true)
    setRenderedMessage((prevArray) => [
      ...prevArray,
      { from: '', message: e.message },
    ])

    const dataMessage = {
      message: encryptMessage,
      thread_uuid: params.uuid,
      document: e.file,
    }

    const bodyFormData = new FormData()
    for (const [key, value] of Object.entries(dataMessage)) {
      bodyFormData.append(key, value)
    }

    sendMessage(bodyFormData)
    setDisableInput(true)
    setMessageUUID(null)
    setMessageUUIDtoRespond(null)
  }

  const handleReaction = (uuid, reaction) => {
    setScrolled(false)
    sendReaction({ params: uuid, reaction })
  }

  const handleNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      console.log('ayo fetching')

      // fetchNextPage()
    }
  }

  return (
    <div
      className={clsx(
        'flex h-full flex-col select-text relative mb-2',
        className
      )}
    >
      <AutoScrollingDiv shouldScrol={isScrolled} onNextScroll={handleNextPage}>
        {renderedMessage?.length !== 0 &&
          renderedMessage?.map((itms, index) => (
            <ChatCard
              key={index}
              item={itms}
              index={index}
              length={renderedMessage?.length}
              onClickChangeLangStyle={(e) =>
                handleAddChat({
                  message: e,
                  document: '',
                })
              }
              className={`flex-none ${
                hasFile ? '!md:w-[calc(100%-16px)]' : 'md:w-3/4 sm:w-full'
              }`}
              onLike={(e) => handleReaction(itms.uuid, e)}
              onDislike={(e) => handleReaction(itms.uuid, e)}
              disableInput={disableInput}
            />
          ))}
      </AutoScrollingDiv>

      <div>
        <InputChat
          onChange={(e) => handleAddChat(e)}
          className={`${hasFile ? '!md:w-full' : 'md:w-3/4'} w-full md:ml-2`}
          disable={disableInput}
        />
      </div>
    </div>
  )
}
