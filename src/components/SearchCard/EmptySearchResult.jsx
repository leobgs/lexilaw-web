import images from 'assets/images'
import React from 'react'
import { useTranslation } from 'react-i18next'

const EmptySearchResult = ({ searchText, onHeaderClick }) => {
  const { t } = useTranslation()
  return (
    <div className="bg-white rounded-md p-4">
      {/* Search Result */}
      <p className="font-bold">"{searchText}"</p>
      <p>
        {t('empty_search', {
          keyPrefix: 'search',
        })}
      </p>

      <div className="flex justify-center items-center my-4">
        <button
          className="border rounded-full px-2 py-2 flex-1 bg-blue-dark text-white flex justify-center items-center gap-2"
          onClick={(e) => {
            e.stopPropagation()
            onHeaderClick && onHeaderClick()
          }}
        >
          {t('button_new_chat', {
            keyPrefix: 'search',
          })}

          <img src={images.ic_new_chat} alt="new_chat" />
        </button>
      </div>
    </div>
  )
}

export { EmptySearchResult }
