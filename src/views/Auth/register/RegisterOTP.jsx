import AuthCard from "components/Card/AuthCard";
import InputOTP from "components/InputOTP";
import { useTranslation } from "react-i18next";

const RegisterOTP = ({ email, otp, onOTPChanged, isNotValid }) => {
  const { t } = useTranslation();
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
          isNotValid={isNotValid}
          onValueChanged={onOTPChanged}
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
