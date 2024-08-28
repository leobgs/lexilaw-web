import React from 'react'

// TODO add props spinner
const SearchCardSpinner = ({ isPending }) => {
  if (!isPending) {
    return null
  }
  return (
    <div className="flex justify-center my-4 ">
      <div className="h-32 w-32 bg-green-900 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-green-700 to-green-900 animate-spin">
        <div className="h-24 w-24 bg-primary-darker rounded-full"></div>
      </div>
    </div>
  )
}

export { SearchCardSpinner }
