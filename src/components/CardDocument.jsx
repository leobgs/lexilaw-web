import images from 'assets/images'
import { useGlobalContext } from 'hooks/context'
import { useEffect, useState } from 'react'

export const CardDocument = ({ item }) => {
  const [fileCategory, setFileCategory] = useState('UNKNOWN')
  const { currentLanguage } = useGlobalContext()

  const itemName = currentLanguage === 'id' ? item.service_name_indonesia : item.service_name_english
  const googleViewer = `https://docs.google.com/gview?url=${encodeURIComponent(item?.url)}&embedded=true&rm=minimal`

  useEffect(() => {
    if (item.url) {
      const extension = item.url.split('.').pop().toLowerCase()
      const imageExtensions = ['png', 'jpeg', 'jpg']
      const documentExtensions = ['pdf', 'xls', 'doc']

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

  return (
    <div className="h-full w-full">
      {/* Jika belum ada file url */}
      {!item?.url ? (
        <div className="flex items-center justify-start gap-2 my-2 py-2 border-b border-b-[#D7D7D7] md:border-none md:block md:mb-0 md:py-0">
          <div className="bg-[#0042250D] aspect-square border-[#0042250D] items-center justify-center flex h-[72px] w-[72px] border-2 border-secondary-base rounded-md relative shadow-card-file md:shadow-none md:w-full md:h-full md:border-[#0042251A]">
            <img src={images.ic_sand_time} alt="displayed file" className="w-4 h-4 aspect-auto m-2 rounded-lg" />
          </div>
          <p className="text-xs md:mt-2">{itemName}</p>
        </div>
      ) : (
        <div
          className="flex items-center justify-start gap-2 my-2 py-2 border-b border-b-[#D7D7D7] md:border-none md:block md:mb-0 md:py-0 hover:cursor-pointer"
          onClick={() => handleDownload(item.url, itemName)}
        >
          <div className="relative">
            <iframe src={googleViewer} title={itemName} className="w-full h-full" />
            <div className="absolute inset-0 bg-transparent select-none" />
          </div>
          <p className="text-xs md:mt-2">{itemName}</p>
        </div>
      )}
    </div>
  )
}
