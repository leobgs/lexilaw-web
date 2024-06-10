import { Modal } from "./Modal";
import images from "assets/images";
import { useTranslation } from "react-i18next";

export const PaymentFailedModal = ({ isActive, onHide = {} }) => {
  const { t } = useTranslation();
  return (
    <Modal
      dialogClassName={"w-11/12 md:w-1/2 xl:w-2/5"}
      contentClassName={
        "bg-yellow-50 rounded-3xl px-6 py-12 md:px-16 md:py-[70px]"
      }
      show={isActive}
      classNameBox={false ? "!z-[68] opacity-100" : ""}
      onHide={onHide}
    >
      <div className="flex flex-col gap-6">
        <img
          className="size-[88px] md:size-[102px] scale-150 mx-auto"
          src={images.ic_fail_red}
          alt=""
        />

        <div className="font-bold text-[#830000] text-[32px] text-center transition-all">
          {`${t("title", {
            keyPrefix: "booking_lawyer.fail_modal",
          })}`}
        </div>

        <div className="font-regular text-[#5A5A5A] text-sm text-center transition-all">
          {t("message", {
            keyPrefix: "booking_lawyer.fail_modal",
          })}
        </div>
      </div>
    </Modal>
  );
};
