import React from 'react'

// TODO add props spinner
const SearchCardSpinner = ({ isPending }) => {
  if (!isPending) {
    return null
  }
  return (
    <div className="flex justify-center my-4 ">
      <div className="h-16 w-16 bg-green-900 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-green-700 to-green-900 animate-spin">
        <div className="h-12 w-12 bg-primary-darker rounded-full"></div>
      </div>
    </div>
  )
}

export { SearchCardSpinner }
