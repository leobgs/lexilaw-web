import axios from 'axios'
import { InputChat } from 'components'
import { AutoScrollingDiv } from 'components/AutoScrollDiv'
import { ChatCard } from 'components/ChatCard'
import { API } from 'config/api'
import { apiURLQuery } from 'config/app'
import { useGlobalContext } from 'hooks/context'
import { getData } from 'hooks/useRequest'
import { notifyError } from 'hooks/useToas'
import { useEffect, useRef, useState } from 'react'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import { RIWAYAT_OROLAN } from 'utils/dummy'

export const fetchMessage = async ({ pageParam }, URL) => {
  const respond = await axios
    .get(`${apiURLQuery + URL}?page=${pageParam}`)
    .then((res) => res)
    .catch((error) => error.response)
  return respond.data
}

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

  const lastPostRef = useRef(null)
  // const { ref, entry } = useIntersection({
  //   root: lastPostRef.current,
  //   threshold: 1,
  // })

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
          // refetchDetail()
          fetchDetail()
        } else {
          notifyError(datas?.message)
          setDisableInput(false)
        }
      },
    }
  )

  const {
    refetch: fetchDetail,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['thread_detail', params.uuid],
    () => getData(`${API.THREAD_DETAIL + params.uuid}?limit=1200`),
    {
      onSettled: (datas, dat) => {
        let tmp = []
        datas.pages?.map((item) =>
          item.data?.forEach((items) => {
            tmp.push(items)
          })
        )
        setRenderedMessage(tmp)
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
      onSettled: (respond, err, variables) => {
        queryClient.invalidateQueries('thread_detail')
      },
    }
  )

  // useEffect(() => {
  //   if (entry?.isIntersecting) {
  //     fetchNextPage()
  //   }
  // }, [entry])

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
      staleTime: 0,
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

            // (data.thread_id, collection?.thread_id) ini nanti harusnya dibuat diluar biar tiap load halaman loading lgsg nampil
            if (!isLoading && data.thread_id === collection?.thread_id) {
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
                  {
                    type: 'queued',
                    message: 'Answer on queued',
                    from: '000000',
                  },
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
      staleTime: 0,
    }
  )

  console.log(renderedMessage)

  const handleAddChat = (e) => {
    const dataMessage = {
      message: e.message,
      thread_id: state?.thread_id ? state?.thread_id : collection?.thread_id,
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

  const handleReaction = (uuid, reaction) => {
    sendReaction({ params: uuid, reaction })
  }

  return (
    <div className='flex h-full flex-col select-text relative mb-2 '>
      <AutoScrollingDiv
        content={
          renderedMessage?.length !== 0 &&
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
              onLike={(e) => handleReaction(itms.uuid, e)}
              onDislike={(e) => handleReaction(itms.uuid, e)}
            />
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
