import images from 'assets/images'
import { CardFileComponent } from './CardFileComponent'
import { SwipeableDiv } from './SwipeableDiv'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { CardDocument } from './CardDocument'
import { useGlobalContext } from 'hooks/context'
import { HashLink } from 'react-router-hash-link'

/**
 * @typedef {Object} System
 * @property {string} thread_chat_uuid
 * @property {string} thread_uuid
 * @property {string} name
 */

/**
 * @typedef {Object} Lawyer
 * @property {string} uuid
 * @property {string} thread_uuid
 * @property {string} service_name_indonesia
 * @property {string} service_name_english
 * @property {string} url
 */

/**
 *
 * @param {{
 * system_data: System[]
 * lawyer_data: Lawyer[]
 * }}
 * @returns
 */
export const CardFileMobile = ({
  show,
  data,
  onChangeVisibility = () => {},
  lawyer_data,
  lawyer,
  system_data,
}) => {
  const { t } = useTranslation()
  const { uuid } = useParams()
  const { collectionClick } = useGlobalContext()

  return (
    <SwipeableDiv
      visibility={show}
      onChangeVisibility={() => onChangeVisibility()}
      className="w-full"
    >
      {uuid === '63926537' ? (
        <div className="shadow-lg bg-gradient-card-file-mobile rounded-t-xl h-full">
          <div className="w-2/12 h-1.5 bg-neutral-40 bg-opacity-40 rounded-lg mx-auto mt-2" />
          <div className="flex justify-center h-full flex-col px-4">
            <div className="flex items-center my-4 gap-2 sticky">
              <img
                src={images.ic_attachment_upload}
                alt="upload"
                className="h-7 w-8"
              />
              <p className="text-xs">
                {t('lawyer_detail', {
                  keyPrefix: 'lawyer_document',
                })}
              </p>
            </div>

            <div className="overflow-y-auto no-scrollbar">
              {data?.map((item, index) =>
                item.from === 'SYSTEM' ? (
                  <div key={`${index}-s`} className="mt-4">
                    <p className="text-sm mb-2.5">
                      {t('ai_result', {
                        keyPrefix: 'lawyer_document',
                      })}
                    </p>

                    <div className="">
                      {item.data?.map((item, index) => (
                        <CardFileComponent item={item} key={item.id} />
                      ))}
                    </div>
                  </div>
                ) : item.from === 'USER' ? (
                  <div className="mt-5" key={`${index}-u`}>
                    <p className="text-sm mb-2.5">
                      {t('lawyer_result', {
                        keyPrefix: 'lawyer_document',
                      })}
                    </p>

                    <div className="">
                      {item.data?.map((item) => (
                        <CardFileComponent item={item} key={item.id} />
                      ))}
                    </div>
                  </div>
                ) : (
                  ''
                )
              )}
            </div>

            <div className="bg-[#585858] w-full flex justify-between items-center py-2 rounded-md mt-4 px-4">
              <div className="text-white">
                <p className="font-semi-bold">Calvin Koss .SH</p>
                <p className="text-xs font-regular text-[#969090]">Jakarta</p>
              </div>
              <div className="bg-[#DCE7FF29] text-xs items-center flex rounded-3xl p-2 h-7 border border-blue-sky text-white">
                {t('check_schedule', {
                  keyPrefix: 'lawyer_document',
                })}
              </div>
            </div>
            <p className="text-xs text-secondary-base font-thin text-center mt-1">
              {t('lawyer_reommend', {
                keyPrefix: 'lawyer_document',
              })}
            </p>
          </div>
        </div>
      ) : (
        <div className="shadow-lg bg-gradient-card-file-mobile rounded-t-xl h-full">
          <div className="w-2/12 h-1.5 bg-neutral-40 bg-opacity-40 rounded-lg mx-auto mt-2" />
          <div className="flex justify-center h-full flex-col px-4">
            <div className="flex items-center my-4 gap-2 sticky">
              <img
                src={images.ic_attachment_upload}
                alt="upload"
                className="h-7 w-8"
              />
              <p className="text-xs">
                {t('lawyer_detail', {
                  keyPrefix: 'lawyer_document',
                })}
              </p>
            </div>

            <div className="overflow-y-auto no-scrollbar">
              <div>
                {/* Hasil Dari AI / System  JUDUL*/}
                {system_data && (
                  <p className="font-medium text-[18px] text-dark-50 mb-2">
                    {t('ai_result', {
                      keyPrefix: 'lawyer_document',
                    })}
                  </p>
                )}

                {/* Hasil Dari AI / System MAPPING*/}
                {system_data?.map((item) => (
                  <HashLink
                    className="flex items-center space-x-4 my-4 w-full"
                    key={item.thread_chat_uuid}
                    smooth
                    to={`thread/${item.thread_uuid}#${item.thread_chat_uuid}`}
                  >
                    {/* icon files */}
                    <div className="border-2 border-[#000] shadow-card-file flex justify-center items-center h-[72px] w-[72px] rounded-md bg-white">
                      <img
                        src={images.ic_files}
                        alt="ic_files"
                        className="w-5 h-5"
                      />
                    </div>
                    <p className="font-semi-bold truncate">{item.name}</p>
                  </HashLink>
                ))}
              </div>

              <div className="">
                {/* Hasil Dari Lawyer JUDUL */}
                {lawyer_data && (
                  <p className="font-medium text-[18px] text-dark-50 mb-2">
                    {t('lawyer_result', {
                      keyPrefix: 'lawyer_document',
                    })}
                  </p>
                )}

                {/* Hasil Dari Lawyer MAPPING */}
                <div className="">
                  {lawyer_data?.map((item) => (
                    <CardDocument key={item.uuid} item={item} />
                  ))}
                </div>
              </div>
            </div>

            {/* divide buat push ke bawah */}
            <div className="flex-1 block md:hidden" />

            {lawyer && (
              <>
                <div className="bg-[#585858] w-full flex justify-between items-center py-2 rounded-md mt-4 px-4">
                  <div className="text-white">
                    <p className="font-semi-bold">
                      {lawyer?.first_name
                        ? lawyer.first_name + ' ' + lawyer.last_name
                        : 'Calvin Koss .SH'}
                    </p>
                    <p className="text-xs font-regular text-[#969090]">
                      {lawyer?.city_name ? lawyer.city_name : 'Jakarta'}
                    </p>
                  </div>
                  {/* untuk saat ini, di hide dulu */}
                  <div className="bg-[#DCE7FF29] text-xs items-center rounded-3xl p-2 h-7 border border-blue-sky text-white hidden">
                    {t('check_schedule', {
                      keyPrefix: 'lawyer_document',
                    })}
                  </div>
                </div>
                <p className="text-xs text-secondary-base font-thin text-center mt-1 mb-4">
                  {t('lawyer_reommend', {
                    keyPrefix: 'lawyer_document',
                  })}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </SwipeableDiv>
  )
}
