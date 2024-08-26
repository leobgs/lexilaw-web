import { useGlobalContext } from 'hooks/context'
import React from 'react'
import { highlightFn } from 'utils/highlightFn'

// TODO ADD ONCLICK props to navigate thread
const TopicObrolan = ({ title, uuid, searchText, search_uuid }) => {
  const { collectionClick, collection } = useGlobalContext()
  const highlighText = highlightFn(title, searchText)

  return (
    <div
      className={`flex py-6 px-2 items-center border-b border-black-lighter/10 hover:cursor-pointer hover:bg-black-lightest/20 group ${
        collection.clicked_uuid === search_uuid && 'bg-green-900 rounded-md'
      }`}
      onClick={() => collectionClick({ uuid, clicked_uuid: search_uuid })}
    >
      <p
        className={`text-sm truncate ${
          collection.clicked_uuid === search_uuid ? 'text-white group-hover:text-secondary-base' : 'text-secondary-base'
        } `}
        dangerouslySetInnerHTML={{ __html: highlighText }}
      />
    </div>
  )
}

export { TopicObrolan }
