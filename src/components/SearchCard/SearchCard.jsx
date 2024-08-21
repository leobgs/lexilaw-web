import React from 'react'

// TODO ADD ONCLICK props to navigate thread
const SearchCard = ({ title, children }) => {
  return (
    <div className="my-4 shadow-lg border border-black-lighter/10 rounded-md">
      {/* Title */}
      <p className="border-b-2 border-black-lighter/10 p-2 tracking-wide text-black-lighter text-[15px] mb-2">
        {title}
      </p>

      <div className="px-2">
        {/* Children */}
        {children}
      </div>
    </div>
  )
}

export { SearchCard }
