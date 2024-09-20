import images from 'assets/images'
import { useTranslation } from 'react-i18next'

export const MyDocMD = ({ children, handleClick }) => {
  const {t} = useTranslation()
  return (
    <div className="bg-white rounded-md shadow-lg">
      {/* header */}
      <div className="border-b-1 shadow mb-4 flex justify-between items-center px-4 py-2 bg-neutral-80/50">
        <span className="px-2 py-1 font-bold">DOC</span>

        <div className="flex space-x-1 px-2 py-1 hover:cursor-pointer" onClick={handleClick}>
          <img src={images.ic_copy} alt="ic_copy" className="" />
          <span>{t("text_copy")}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>
    </div>
  )
}
