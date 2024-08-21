import React from 'react'

// TODO ADD ONCLICK props to navigate thread
const DokumenCard = ({ title }) => {
  return (
    <div className="flex my-2 items-center border-b border-black-lighter/10 pb-2 hover:cursor-pointer hover:bg-black-lightest/20">
      {/* Title */}
      <p className="text-sm truncate">{title}</p>

      {/* Document Image */}
      <div className="ml-2 h-10 w-10 bg-black-lighter flex-shrink-0" />
    </div>
  )
}

export { DokumenCard }
