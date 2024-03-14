import images from "assets/images";
import AuthCard from "components/Card/AuthCard";
import InputOTP from "components/InputOTP";
import { useGlobalContext } from "hooks/context";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const RegisterOTP = () => {
  const location = useLocation();
  const { fullName, email } = location.state;
  const { openAlert } = useGlobalContext();
  const { t } = useTranslation();
  const [otp, setOTP] = useState("");
  const [isNotValidOtp, setIsNotValidOtp] = useState(false);

  useEffect(() => {
    setIsNotValidOtp(false);
    if (otp.length === 6) {
      if (otp === "123456") {
        success();
      } else {
        setIsNotValidOtp(true);
      }
    }
  }, [otp]);

  const success = () => {
    openAlert({
      title: "Selamat bergabung 👋 ",
      messages: fullName,
      icon: images.ai_profile_thumbnail,
    });
  };

  const handleOtpChanged = (newValue) => {
    setOTP(newValue);
  };
  return (
    <AuthCard>
      <div className="grid grid-cols-1 gap-y-4 h-fit">
        <h1 className="text-[32px] text-dark-50 font-[futura-bold] tracking-tight">
          {t("heading", { keyPrefix: "auth.register.otp" })}
        </h1>

        <h3 className="text-xl font-regular tracking-wide text-gray-700">
          {t("send_to", { keyPrefix: "auth.register.otp" })}
          <span className="block font-bold">{email}</span>
        </h3>

        <InputOTP
          placeholder={t("placeholder", { keyPrefix: "auth.register.otp" })}
          value={otp}
          isNotValid={isNotValidOtp}
          onValueChanged={handleOtpChanged}
        />

        <p className="text-base font-regular tracking-wide text-gray-700">
          {t("countdown", { keyPrefix: "auth.register.otp", second: "2" })}{" "}
          <span className="font-bold underline ms-1">
            {t("resend", { keyPrefix: "auth.register.otp" })}
          </span>
        </p>
      </div>
    </AuthCard>
  );
};

export default RegisterOTP;
