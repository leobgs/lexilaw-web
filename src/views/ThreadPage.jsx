import { InputChat } from 'components'
import { AutoScrollingDiv } from 'components/AutoScrollDiv'
import { ChatCard } from 'components/ChatCard'
import { API } from 'config/api'
import { useGlobalContext } from 'hooks/context'
import { getData } from 'hooks/useRequest'
import { notifyError } from 'hooks/useToas'
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import { RIWAYAT_OROLAN } from 'utils/dummy'

export const ThreadPage = () => {
  const { collection } = useGlobalContext()
  const params = useParams()
  const { state } = useLocation()
  const queryClient = useQueryClient()
  const [disableInput, setDisableInput] = useState(false)
  const [isDisplayImage, setDisplayImage] = useState()
  const [renderedMessage, setRenderedMessage] = useState(null)
  const [threadMessageIdtoRespond, setThreadMessageIdtoRespond] = useState({
    thread_id: '',
    message_id: '',
  })
  const [threadMessageId, setThreadMessageId] = useState({
    thread_id: '',
    message_id: '',
  })

  useEffect(() => {
    if (params.uuid === '63926537') {
      const dataFiltered = RIWAYAT_OROLAN.find(
        (item) => item.uuid === '63926537'
      )
      setRenderedMessage(dataFiltered?.chat)
    }

    if (state) {
      setThreadMessageId({
        thread_id: state.thread_id,
        message_id: state.message_id,
      })
    }
  }, [params.uuid, state])

  const { refetch: refetchDetail } = useQuery(
    ['thread_detail', params.uuid],
    () => getData(API.THREAD_DETAIL + params.uuid),
    {
      onSettled: (datas) => {
        if (datas?.status === 'Success') {
          const { data } = datas
          setRenderedMessage(data)
        } else if (datas?.status === 'Not Found') {
          refetchDetail()
        } else {
          notifyError(datas?.message)
        }
      },
      enabled: !!params.uuid && params.uuid !== '63926537',
      cacheTime: 0,
      staleTime: 0,
    }
  )

  useQuery(
    ['respond_chat', threadMessageIdtoRespond.thread_id],
    () =>
      getData(
        `${API.MESSAGE_RESPONSE}${threadMessageIdtoRespond.thread_id}/${threadMessageIdtoRespond.message_id}`
      ),
    {
      onSettled: (datas) => {
        if (datas?.status === 'Success') {
          queryClient.invalidateQueries('thread_detail')
        } else {
          renderedMessage?.forEach((item) => {
            if (item.type === 'isloading') {
              return {
                ...item,
                message: `${datas?.message}`,
                type: '',
              }
            }
          })
          setRenderedMessage([...renderedMessage])
        }
      },
      enabled: !!threadMessageIdtoRespond.thread_id,
    }
  )

  useQuery(
    ['check_status', threadMessageId],
    () =>
      getData(
        API.MESSAGE_STATUS +
          `${threadMessageId.thread_id}/${threadMessageId.message_id}/status`
      ),
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
            setThreadMessageIdtoRespond({
              thread_id: data.thread_id,
              message_id: data.message_id,
            })
          } else if (data.status === 'in_progress') {
            setDisableInput(true)

            if (!isLoading) {
              renderedMessage &&
                setRenderedMessage((prevArray) => [
                  ...prevArray,
                  { type: 'loading', from: '000000' },
                ])
            }
          } else {
            setDisableInput(true)
            if (!isLoading) {
              renderedMessage &&
                setRenderedMessage((prevArray) => [
                  ...prevArray,
                  { type: '', message: 'Answer on queued', from: '000000' },
                ])
            }
          }
        }
      },
      refetchInterval: (query) => {
        if (query?.data?.status !== 'in_progress') {
          return false
        } else {
          return 3000
        }
      },
      onError: (e) => console.log('eh error', e),
      enabled: !!threadMessageId.thread_id && !!threadMessageId.message_id,
    }
  )

  const { mutate: sendMessage } = useMutation(
    (form) => getData(API.MESSAGE_SEND, form),
    {
      onSettled: (datas) => {
        if (datas?.status === 'Success') {
          const { data } = datas
          setThreadMessageId({
            thread_id: data.thread_id,
            message_id: data.message_id,
          })
          refetchDetail()
        } else {
          notifyError(datas?.message)
          setDisableInput(false)
        }
      },
    }
  )

  const handleAddChat = (e) => {
    const dataMessage = {
      message: e.message,
      thread_id: state ? state?.thread_id : collection.thread_id,
      document: e.file,
    }

    const bodyFormData = new FormData()
    for (const [key, value] of Object.entries(dataMessage)) {
      bodyFormData.append(key, value)
    }
    sendMessage(bodyFormData)
    setDisableInput(true)
    setThreadMessageId({ message_id: '', thread_id: '' })
    setThreadMessageIdtoRespond({ message_id: '', thread_id: '' })
  }

  return (
    <div className='flex h-full flex-col select-text relative mb-2 '>
      <AutoScrollingDiv
        content={
          renderedMessage?.length !== 0 &&
          renderedMessage?.map((itms, index) => (
            <ChatCard key={index} item={itms} index={index} />
          ))
        }
      />

      <div>
        <InputChat
          onChange={(e) => handleAddChat(e)}
          onDisplayImage={(e) => setDisplayImage(e)}
          className='w-full md:w-3/4'
          disable={disableInput}
        />
      </div>
    </div>
  )
}
