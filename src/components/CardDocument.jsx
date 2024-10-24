import images from 'assets/images'
import { useGlobalContext } from 'hooks/context'
import { useWindowWidth } from 'hooks/useWindowWidth'
import { useEffect, useState } from 'react'
import { FilePreview } from './FilePreview'

export const CardDocument = ({ item }) => {
  const [fileCategory, setFileCategory] = useState('UNKNOWN')
  const { currentLanguage } = useGlobalContext()
  const { windowWidth } = useWindowWidth()
  const isMobile = windowWidth <= 768

  const itemName =
    currentLanguage === 'id'
      ? item.service_name_indonesia
      : item.service_name_english

  useEffect(() => {
    if (item.url) {
      const extension = item.url.split('.').pop().toLowerCase()
      const imageExtensions = ['png', 'jpeg', 'jpg', 'gif', 'webp']
      const documentExtensions = ['pdf', 'xls', 'doc', 'docx', 'xlsx']

      if (imageExtensions.includes(extension)) {
        setFileCategory('IMAGE')
      } else if (documentExtensions.includes(extension)) {
        setFileCategory('DOKUMEN')
      } else {
        setFileCategory('UNKNOWN')
      }
    }
  }, [item.url])

  const handleDownload = (url, name) => {
    const link = document.createElement('a')
    link.href = url
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenNewTab = (url_item) => {
    window.open(url_item, '_blank')
  }

  return (
    <div className="h-full w-full">
      {/* Jika belum ada file url */}
      {!item?.url ? (
        <div className="flex items-center justify-start gap-2 my-2 py-2 border-b border-b-[#D7D7D7] md:border-none md:block md:mb-0 md:py-0">
          <div className="bg-[#E4E4DE] aspect-square border-[#0042250D/50] items-center justify-center flex h-[72px] w-[72px] border-2 border-secondary-base rounded-md relative shadow-card-file md:shadow-none md:w-full md:h-full md:border-[#0042251A]">
            <img
              src={isMobile ? images.ic_sand_time_mobile : images.ic_sand_time}
              alt="displayed file"
              className="w-5 h-5 aspect-auto m-2 rounded-lg"
            />
          </div>
          <p className="md:mt-2 font-semi-bold md:font-medium md:text-xs">
            {itemName}
          </p>
        </div>
      ) : (
        <div
          className="flex items-center justify-start gap-2 my-2 py-2 border-b border-b-[#D7D7D7] md:border-none md:block md:mb-0 md:py-0 hover:cursor-pointer"
          onClick={() => handleOpenNewTab(item.url)}
        >
          <div
            className={`relative h-[72px] w-[72px] md:w-full md:h-full ${
              isMobile && 'shadow-card-file'
            } border-2 md:border rounded-md aspect-square border-secondary-base md:border-[#0042251a]`}
          >
            <FilePreview
              fileCategory={fileCategory}
              isMobile={isMobile}
              itemName={itemName}
              url={item?.url}
              key={item?.uuid + fileCategory}
            />
            <div className="absolute inset-0 bg-transparent select-none rounded-md" />
          </div>
          <p className="md:mt-2 font-semi-bold md:font-medium md:text-xs">
            {itemName}
          </p>
        </div>
      )}
    </div>
  )
}
