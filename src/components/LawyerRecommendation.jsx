import images from "assets/images";
import { Modal } from "./Modal";
import { LawyerCard } from "./LawyerCard";
import { useEffect, useState } from "react";
import { Button } from "./Button/Button";
import { useWidthSize } from "hooks/useWidthSize";
import "./LawyerRecommendation.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from "hooks/context";

export const LawyerRecommendation = ({
  isShow,
  onHide = () => {},
  dataLawyer = [],
}) => {
  const { bookingLawyer, bookingLawyerReducer } = useGlobalContext();
  const navigate = useNavigate();
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const currWidth = useWidthSize();
  const { t } = useTranslation()

  useEffect(() => {
    resetDataLawyer();
  }, []);

  const resetDataLawyer = () => {
    dataLawyer?.forEach((item) => {
      item.isActive = false;
    });
    setSelectedLawyer(null);
  };

  const handleSelectLawyer = (id) => {
    dataLawyer?.forEach((item) => {
      if (item.uuid === id) {
        item.isActive = true;
        bookingLawyerReducer(['selected_lawyer'], item)
      } else {
        item.isActive = false;
      }
    });
  };

  return (
    <Modal
      show={isShow}
      onHide={() => {
        onHide();
        resetDataLawyer();
      }}
      contentClassName="bg-white h-full px-4 md:!w-5/6 md:!h-5/6 md:rounded-xl lg:!w-3/4"
      className="bg-neutral-40"
    >
      <div>
        <div className="flex justify-start gap-4 md:gap-0 md:justify-between items-center mx-2 py-4">
          <img
            src={images.ic_back}
            alt="back"
            className="md:hidden"
            onClick={() => {
              onHide();
              resetDataLawyer();
            }}
          />
          <div className="text-xl font-futura-bold">
            {t('another_option', { keyPrefix: 'lawyer_recommendation' })}
          </div>
          <img
            src={images.ic_close}
            alt="close"
            onClick={() => {
              onHide();
              resetDataLawyer();
            }}
            className="hidden md:inline-block"
          />
        </div>
        <div className="bg-gradient-to-b from-[#FBEFD8] from-10% to-white to-100% -mx-4 px-8 py-2 text-sm border-b border-t border-b-[#F2F2F2] border-t-[#F2F2F2] items-center gap-4 hidden md:flex">
          <img src={images.ic_blink} alt="blink" />
          <div className="text-sm">
            {t('based_on_your_needs', { keyPrefix: 'lawyer_recommendation' })}
          </div>
        </div>
      </div>

      <div className="h-[86%] flex justify-between text-sm my-2 gap-4">
        <div className="h-full w-full overflow-auto mt-8 gap-2 overflow-x-hidden md:grid md:grid-cols-2 md:w-2/3 md:grid-rows-3 md:gap-4 md:h-[90%] lg:gap-2">
          {dataLawyer?.map((item, index) => (
            <LawyerCard
              onClick={() => {
                handleSelectLawyer(item.uuid);
                setSelectedLawyer(item);
              }}
              key={index}
              data={item}
              className={`mb-4 ${
                item.isActive
                  ? "border-4 border-secondary-base shadow-sm rounded-tr-xl"
                  : "border-4 border-white"
              }`}
            />
          ))}
        </div>

        {selectedLawyer && currWidth > 768 ? (
          <div
            className={`w-1/3 bg-blue-dark rounded-xl h-[95%] -mt-4 pb-6 hidden bg-selected-lawyer relative md:flex md:justify-between md:flex-col overflow-y-auto overflow-x-hidden`}
          >
            <div>
              <img
                src={selectedLawyer?.image_url}
                alt={`lawyer-${selectedLawyer?.first_name}`}
                className="rounded-full mx-auto w-24 h-24 mt-28"
              />
              <div className="text-center text-2xl font-semi-bold mb-2 mt-4 md:mx-4 lg:mx-0 text-white">
                {selectedLawyer?.first_name} {selectedLawyer?.last_name}
              </div>
              <div className="text-center text-xs mb-2 mt-4 mx-4 text-opacity-60 text-white">
                {selectedLawyer?.description}
              </div>
              <div className="mt-8 grid grid-cols-4 mx-4 gap-2 mb-8">
                {selectedLawyer?.lawyer_filed?.map((item, index) => (
                  <div
                    className={`bg-white rounded-2xl py-1 px-2 text-center my-auto ${
                      selectedLawyer?.lawyer_filed?.length === 1
                        ? "col-span-4"
                        : selectedLawyer?.lawyer_filed?.length % 2 === 0
                        ? "col-span-2"
                        : "col-span-2 last:col-start-2"
                    }`}
                    key={index}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mx-4">
              <Button
                onClick={() =>
                  navigate("/book-lawyer", { state: selectedLawyer })
                }
                label={t('booking_lawyer', { keyPrefix: 'lawyer_recommendation' })}
                iconRight={images.ic_briefcase}
                className={
                  "btn-secondary-hover w-full mt-1 rounded-full font-medium relative px-8"
                }
              />
            </div>
          </div>
        ) : (
          <div className="bg-blue-sky w-1/3 rounded-xl relative hidden bg-unselected -mt-4 md:inline-block xl:h-[90%] lg:h-[85%]">
            <div className="relative top-1/4 h-[95%] pt-20 -mt-28">
              <img
                src={images.bg_lawyer_recommendation}
                alt="lawyer recommen"
                className="mx-auto"
              />
              <div className="text-center text-2xl mt-4 mx-4">
                  {t('select_attorney_option', { keyPrefix: 'lawyer_recommendation' })}
              </div>
            </div>
            <div className="h-40 relative top-0 rounded-b-xl bg-gradient-white" />
          </div>
        )}

        <Modal
          show={
            selectedLawyer && currWidth < 768
              ? true
              : selectedLawyer && currWidth > 768 && false
          }
          onHide={() => {
            setSelectedLawyer(null);
            resetDataLawyer();
          }}
          contentClassName="bg-blue-dark px-4 py-8 md:!w-5/6 md:!h-5/6 md:rounded-xl lg:!w-3/4 rounded-t-2xl absolute !bottom-0"
          classNameBox=""
          className=""
        >
          <div className="h-full">
            <img
              src={images.ic_close_white}
              alt="close"
              className="float-end"
              onClick={() => {
                setSelectedLawyer(null);
                resetDataLawyer();
              }}
            />
            <img
              src={selectedLawyer?.image_url}
              alt={`lawyer-${selectedLawyer?.first_name}`}
              className="rounded-full mx-auto w-24 h-24"
            />
            <div className="text-center text-2xl font-semi-bold mb-2 mt-4 md:mx-4 lg:mx-0 text-white">
              {selectedLawyer?.first_name} {selectedLawyer?.last_name}
            </div>
            <div className="text-center text-xs mb-2 mt-4 mx-4 text-opacity-60 text-white">
              {selectedLawyer?.description}
            </div>
            <div className="mt-8 grid grid-cols-4 mx-4 gap-2 mb-8">
              {selectedLawyer?.lawyer_filed?.map((item, index) => (
                <div
                  className={`bg-white rounded-2xl py-1 px-2 text-center my-auto ${
                    selectedLawyer?.lawyer_filed?.length === 1
                      ? "col-span-4"
                      : selectedLawyer?.lawyer_filed?.length % 2 === 0
                      ? "col-span-2"
                      : "col-span-2 last:col-start-2"
                  }`}
                  key={index}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mx-4">
            <Button
              onClick={() =>
                navigate("/book-lawyer", { state: selectedLawyer })
              }
              label={t('booking_lawyer', { keyPrefix: 'lawyer_recommendation' })}
              iconRight={images.ic_briefcase}
              className={
                "btn-secondary-hover w-full mt-1 rounded-full font-medium relative px-8"
              }
            />
          </div>
        </Modal>
      </div>
    </Modal>
  );
};
