import images from 'assets/images'

import { Modal } from './Modal'
import { useState } from 'react'
import { t } from 'i18next'
import { useDebounce } from 'hooks/useDebounce'
import { useSearch } from 'hooks/useSearch'
import { SearchCardSpinner } from './SearchCard/SearchCardSpinner'
import { SearchCard } from './SearchCard/SearchCard'
import { ObrolanCard } from './SearchCard/ObrolanCard'
import { DokumenCard } from './SearchCard/DokumenCard'
import { TopicObrolan } from './SearchCard/TopikObrolan'
import { EmptySearchResult } from './SearchCard/EmptySearchResult'

export const ModalSearch = ({ show, onHide = () => {}, searchText, setShowNav, onHeaderClick }) => {
  const [search, setSearch] = useState(searchText ?? '')

  const debounceText = useDebounce(search)
  const debounceSearch = search.length > 0 ? debounceText : ''

  const { isPendingSearch, searchData } = useSearch(debounceSearch, true)

  return (
    <Modal
      show={show}
      onHide={() => void 0}
      contentClassName="bg-white h-full px-4 md:!w-1/2 xl:!w-1/3 lg:!w-1/2 md:!h-[90%] md:rounded-xl overflow-y-auto no-scrollbar md:hidden"
    >
      <div className="bg-white border-b border-neutral-50 pb-4 -mx-4 px-4">
        <div className="flex justify-between items-center gap-2 mt-4 w-full outline-1 outline-neutral-10 outline rounded-3xl px-2 py-2">
          <img
            src={images.ic_back}
            alt="back"
            className="!w-[11px] !h-[18px] aspect-square mt-0.5 ml-2"
            onClick={() => {
              onHide()
              setSearch('')
            }}
          />
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            name="search"
            className="w-full !outline-none ml-2"
            placeholder={t('search', {
              keyPrefix: 'chat.chat_text',
            })}
          />
        </div>
      </div>

      {/* Search Result */}
      {debounceSearch.length > 0 ? (
        <>
          <SearchCardSpinner isPending={isPendingSearch} />
          {/* Thread Chat Obrolan */}
          <SearchCard
            title={'Obrolan'}
            isPending={isPendingSearch}
            onClickHide={() => {
              onHide()
              setShowNav((prev) => !prev)
            }}
          >
            {!searchData?.data?.thread_chat ? (
              <EmptySearchResult
                searchText={debounceSearch}
                onHeaderClick={() => {
                  setShowNav(false)
                  onHide()
                  onHeaderClick()
                  setSearch('')
                }}
              />
            ) : (
              searchData.data.thread_chat.map((item) => (
                <ObrolanCard
                  key={item.uuid}
                  message={item.message}
                  from_display={item.from_display}
                  thread_uuid={item.thread_uuid}
                  searchText={debounceSearch}
                  search_uuid={item.uuid}
                />
              ))
            )}
          </SearchCard>
          {/* Document */}
          <SearchCard
            title={'Document'}
            isPending={isPendingSearch}
            onClickHide={() => {
              onHide()
              setShowNav((prev) => !prev)
            }}
          >
            {!searchData?.data?.document ? (
              <EmptySearchResult
                searchText={debounceSearch}
                onHeaderClick={() => {
                  setShowNav(false)
                  onHeaderClick()
                  onHide()
                  setSearch('')
                }}
              />
            ) : (
              searchData.data.document.map((item) => (
                <DokumenCard
                  key={item.uuid}
                  title={item.filename}
                  thred_uuid={item.thread_uuid}
                  searchText={debounceSearch}
                  file_url={item.file_url}
                />
              ))
            )}
          </SearchCard>
          {/* Topik obrolan */}
          <SearchCard
            title={'Topik Obrolan'}
            isPending={isPendingSearch}
            onClickHide={() => {
              onHide()
              setShowNav((prev) => !prev)
            }}
          >
            {!searchData?.data?.thread ? (
              <EmptySearchResult
                searchText={debounceSearch}
                onHeaderClick={() => {
                  setShowNav(false)
                  onHide()
                  onHeaderClick()
                  setSearch('')
                }}
              />
            ) : (
              searchData.data.thread.map((item) => (
                <TopicObrolan title={item.title} uuid={item.uuid} searchText={debounceSearch} search_uuid={item.uuid} />
              ))
            )}
          </SearchCard>
        </>
      ) : null}
    </Modal>
  )
}
