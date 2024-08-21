import React from 'react'

// TODO add props spinner
const SearchCardSpinner = () => {
  return (
    <div className="flex justify-center my-4 ">
      <div className="h-32 w-32 bg-green-900 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-green-700 to-green-900 animate-spin">
        <div className="h-20 w-20 bg-primary-darker rounded-full"></div>
      </div>
    </div>
  )
}

export { SearchCardSpinner }
