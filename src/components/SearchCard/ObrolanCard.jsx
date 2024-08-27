import React from 'react'
import images from 'assets/images'
import { useGlobalContext } from 'hooks/context'
import { cleanMessage } from 'utils/cleanMessage'
import { highlightFn } from 'utils/highlightFn'
import { extractMessage } from 'utils/extractMessage'

const ObrolanCard = ({ imgSrc, from_display = 'USER', message, thread_uuid, search_uuid, searchText }) => {
  const { collectionClick, collection } = useGlobalContext()
  const cleanText = cleanMessage(message)
  const extractedText = extractMessage(cleanText, searchText)
  const highlightText = highlightFn(extractedText, searchText, collection.clicked_uuid === search_uuid)

  if (!thread_uuid) {
    return null
  }
  return (
    <div
      className={`flex py-2 px-2 items-center border-b border-black-lighter/10 pb-2 hover:cursor-pointer hover:bg-black-lightest/20 group ${
        collection.clicked_uuid === search_uuid && 'bg-green-900 rounded-md'
      }`}
      onClick={() =>
        collectionClick({
          uuid: thread_uuid,
          clicked_uuid: search_uuid,
        })
      }
    >
      {/* image */}
      {from_display === 'USER' ? (
        <img
          className="size-10 rounded-full"
          src={imgSrc || images.ic_avatar_placeholder}
          alt="obrolan_photo"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = images.ic_avatar_placeholder
          }}
        />
      ) : (
        <img
          className="size-10 rounded-full"
          src={images.ic_profile_lexi}
          alt="obrolan_photo"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = images.ic_avatar_placeholder
          }}
        />
      )}

      {/* Chat Response */}
      <div className="flex flex-col flex-1 ml-4 min-w-0">
        {/* Username */}
        {from_display === 'USER' ? (
          <p
            className={`font-futura-bold text-sm ${
              collection.clicked_uuid === search_uuid
                ? 'text-white group-hover:text-secondary-base'
                : 'text-secondary-base'
            }`}
          >
            You
          </p>
        ) : (
          <p
            className={`font-futura-bold text-secondary-base text-sm  ${
              collection.clicked_uuid === search_uuid
                ? 'text-white group-hover:text-secondary-base'
                : 'text-secondary-base'
            } `}
          >
            Lexi{' '}
            <span
              className={`rounded-md px-1 text-xs ${
                collection.clicked_uuid !== search_uuid
                  ? 'text-white bg-secondary-base group-hover:text-black-dark group-hover:bg-white'
                  : 'text-secondary-base bg-white group-hover:text-white group-hover:bg-secondary-base'
              }`}
            >
              AI
            </span>
          </p>
        )}

        {/* Chat */}
        <p
          className={`text-sm truncate ${
            collection.clicked_uuid === search_uuid
              ? 'text-white group-hover:text-secondary-base'
              : 'text-secondary-base'
          } `}
          dangerouslySetInnerHTML={{
            __html: highlightText,
          }}
        />
      </div>
    </div>
  )
}

export { ObrolanCard }
