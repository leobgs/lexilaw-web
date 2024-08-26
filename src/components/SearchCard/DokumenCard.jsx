import React from 'react'
import { highlightFn } from 'utils/highlightFn'
import { useGlobalContext } from 'hooks/context'

// TODO ADD ONCLICK props to navigate thread
const DokumenCard = ({ title, thred_uuid, searchText, file_url }) => {
  const { collectionClick } = useGlobalContext()
  const highlightText = highlightFn(title, searchText)
  const googleViewer = `https://docs.google.com/gview?url=${encodeURIComponent(file_url)}&embedded=true&rm=minimal`

  if (!thred_uuid) {
    return null
  }

  return (
    <div
      className="flex justify-between my-2 items-center border-b border-black-lighter/10 my-2 px-2 hover:cursor-pointer hover:bg-black-lightest/20"
      onClick={() =>
        collectionClick({
          uuid: thred_uuid,
        })
      }
    >
      {/* Title */}
      <p
        className="text-sm truncate"
        dangerouslySetInnerHTML={{
          __html: highlightText,
        }}
      />

      {/* Document Image */}
      <div className="relative">
        <iframe src={googleViewer} className="flex-shrink-0 ml-2 h-10 w-10" title={title} />
        <div className="absolute inset-0 bg-transparent select-none" />
      </div>
    </div>
  )
}

export { DokumenCard }
