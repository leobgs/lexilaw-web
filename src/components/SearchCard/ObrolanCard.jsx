import images from 'assets/images'
import React from 'react'

const ObrolanCard = ({ imgSrc, from_display = 'USER', message }) => {
  return (
    <div className="flex my-2 items-center border-b border-black-lighter/10 pb-2 hover:cursor-pointer hover:bg-black-lightest/20">
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
      <div className="flex flex-col flex-1 ml-4">
        {/* Username */}
        {from_display === 'USER' ? (
          <p className="font-futura-bold text-secondary-base text-sm ">You</p>
        ) : (
          <p className="font-futura-bold text-secondary-base text-sm ">
            Lexi <span className="bg-secondary-base rounded-md text-white px-1 text-xs">AI</span>
          </p>
        )}

        {/* Chat */}
        <p className="text-sm truncate">{message}</p>
      </div>
    </div>
  )
}

export { ObrolanCard }
