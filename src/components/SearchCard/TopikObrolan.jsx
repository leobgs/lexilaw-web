import React from 'react'
import { HashLink } from 'react-router-hash-link'
import { useParams } from 'react-router-dom'

// TODO ADD ONCLICK props to navigate thread
const TopicObrolan = ({ title, uuid, searchText, search_uuid }) => {
  const { uuid: uuidThread } = useParams()

  return (
    <HashLink
      className={`flex py-6 px-2 items-center border-b border-black-lighter/10 hover:cursor-pointer hover:bg-black-lightest/20 group ${
        uuid === uuidThread && 'bg-green-900 rounded-md text-white hover:text-dark-50'
      }`}
      to={`thread/${uuid}`}
    >
      <p className={`text-sm truncate`}>{title}</p>
    </HashLink>
  )
}

export { TopicObrolan }
