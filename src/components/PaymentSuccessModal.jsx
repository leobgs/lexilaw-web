import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import images from "assets/images";
import { Button } from "./Button/Button";

export const PaymentSuccessModal = ({
  isActive,
  lawyerName = "",
  onNavigate = () => {},
}) => {
  const [isSecondForm, setIsSecondForm] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isOnMobileSize = windowWidth <= 768;

  useEffect(() => {
    if (isActive) {
      startTimer();

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isActive]);

  useEffect(() => {
    let intervalId;

    if (isCountdownActive) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 0) {
            clearInterval(intervalId);
            setIsCountdownActive(false);
            if (!isSecondForm) {
              stopTimer();
              setIsSecondForm(true);
            } else {
              onNavigate();
            }
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isCountdownActive, isSecondForm]);

  useEffect(() => {
    if (isSecondForm) {
      startTimer();
    }
  }, [isSecondForm]);

  const startTimer = () => {
    setIsCountdownActive(true);
  };

  const stopTimer = () => {
    setIsCountdownActive(false);
    setTimeRemaining(3);
  };

  const handleModalTapped = () => {
    setIsCountdownActive(false);
    setTimeRemaining(3);
    setIsSecondForm(true);
  };

  return (
    <Modal
      dialogClassName={"w-11/12 md:w-1/2 xl:w-2/5"}
      contentClassName={
        "bg-yellow-50 rounded-3xl px-6 py-12 md:px-16 md:py-[70px]"
      }
      show={isActive}
      classNameBox={false ? "!z-[68] opacity-100" : ""}
      onHide={() => {}}
    >
      <div
        className="flex flex-col gap-6"
        onClick={() => {
          handleModalTapped();
        }}
      >
        <img
          className="size-[88px] md:size-[102px] scale-150 mx-auto"
          src={images.ic_check_green}
          alt=""
        />

        <div className="font-bold text-dark-50 text-[32px] text-center transition-all">
          {isSecondForm
            ? `Kamu terhubung dengan ${lawyerName}`
            : "Pembayaran Berhasil"}
        </div>

        {isSecondForm && (
          <div className="font-regular text-[#5A5A5A] text-xl text-center transition-all">
            {
              "Lihat pengacara yang terhubung di Halaman Lawyer Saya di bawah menu navigasi."
            }
          </div>
        )}

        {isSecondForm && (
          <div className="flex flex-col gap-2 transition-all">
            <Button
              label={`Kembali ke Obrolan ${
                isOnMobileSize ? "" : `(Otomatis Dalam ${timeRemaining}s)`
              }`}
              onClick={onNavigate}
              className={
                "btn-secondary-hover w-full md:pl-9 md:space-x-9 mx-auto !font-regular text-[#E9E9E9] text-base rounded-full transition-all"
              }
              iconRight={images.ic_message_bubble_outline_white}
            />

            {isOnMobileSize && (
              <div className="w-full mx-auto font-regular text-center text-sm text-[#666666] transition-all">
                Kembali otomatis dalam {timeRemaining}s
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
