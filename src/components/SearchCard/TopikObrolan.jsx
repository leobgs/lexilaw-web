import React from 'react'

// TODO ADD ONCLICK props to navigate thread
const TopicObrolan = ({ title }) => {
  return (
    <div className="flex my-2 items-center border-b border-black-lighter/10 pb-2 hover:cursor-pointer hover:bg-black-lightest/20">
      <p className="text-sm truncate">{title}</p>
    </div>
  )
}

export { TopicObrolan }
