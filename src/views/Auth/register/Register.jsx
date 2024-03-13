import { useEffect, useState } from "react";
import AuthCard from "components/Card/AuthCard";
import RegisterOTP from "./RegisterOTP";
import { Button, Input } from "components";
import { InputPassword } from "components/InputPassword";
import images from "assets/images";
import InputImage from "components/InputImage";
import { Dropdown } from "components/Dropdown/Dropdown";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "hooks/context";

const citiesDummy = [
  "Jakarta",
  "Surabaya",
  "Medan",
  "Bandung",
  "Makassar",
  "Semarang",
  "Samarinda",
  "Tenggarong",
  "Yogyakarta",
  "Denpasar",
];

export default function Register() {
  const { openAlert } = useGlobalContext();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
    city: "",
    image: null,
    company_name: "",
  });
  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const [otp, setOTP] = useState("");
  const [openOtp, setOpenOtp] = useState(false);
  const [isNotValidOtp, setIsNotValidOtp] = useState(false);

  useEffect(() => {
    setIsNotValidOtp(false);
    if (otp.length === 6) {
      if (otp === "123456") {
        success()
      } else {
        setIsNotValidOtp(true);
      }
    }
  }, [otp]);

  const fullName = form.first_name + " " + form.last_name;

  const success = () => {
    openAlert({
      title: "Selamat bergabung 👋 ",
      messages: fullName,
      icon: images.ai_profile_thumbnail,
    });
  };

  const validateName = (value) => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    return nameRegex.test(value);
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePasswordMatch = (value) => {
    return form.password === value;
  };

  const validateInput = (name, value) => {
    switch (name) {
      case "first_name":
      case "last_name":
        return validateName(value) ? "" : "Invalid name format";
      case "email":
        return validateEmail(value) ? "" : "Invalid email format";
      case "password":
        return validatePassword(value) ? "" : "Invalid password format";
      case "password_confirm":
        return validatePasswordMatch(value) ? "" : "Password not match";
      default:
        return "";
    }
  };

  const isAnyError = () => {
    return !(
      error.first_name === null ||
      error.last_name === null ||
      error.email === null ||
      error.password === null ||
      error.password_confirm === null
    );
  };

  const isAnyEmptyForm = () => {
    return (
      form.first_name === null ||
      form.last_name === null ||
      form.email === null ||
      form.password === null ||
      form.password_confirm === null ||
      form.city === null ||
      form.image === null
    );
  };

  const isValidForm = !isAnyEmptyForm() || !isAnyError();

  const handleChangeForm = (e) => {
    const { name, value } = e;
    setForm({ ...form, [name]: value });
    const errorMessage = validateInput(name, value);
    setError({ ...error, [name]: errorMessage });
  };

  const handleImageChange = (newImage) => {
    setForm({ ...form, image: newImage });
  };

  const handleCityChange = (newValue) => {
    setForm({ ...form, city: newValue });
  };
  const handleOtpChanged = (newValue) => {
    setOTP(newValue);
  };

  return (
    <>
      {openOtp ? (
        <RegisterOTP
          email={form.email}
          otp={otp}
          onOTPChanged={handleOtpChanged}
          isNotValid={isNotValidOtp}
        />
      ) : (
        <AuthCard className>
          <div className="grid grid-cols-1 gap-y-4 h-fit">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <Input
                name="first_name"
                value={form.first_name}
                onChange={handleChangeForm}
                className="w-full rounded-full flex-wrap"
                inputClass="!border-secondary-logo focus:outline-secondary-logo"
                rowed
                placeholder={t("firstName", { keyPrefix: "auth.register" })}
                error={error.first_name}
              />

              <Input
                name="last_name"
                value={form.last_name}
                onChange={handleChangeForm}
                className="w-full rounded-full flex-wrap"
                inputClass="!border-secondary-logo focus:outline-secondary-logo"
                rowed
                placeholder={t("lastName", { keyPrefix: "auth.register" })}
                error={error.last_name}
              />
            </div>

            <Input
              name="email"
              value={form.email}
              onChange={handleChangeForm}
              className="w-full rounded-full flex-wrap"
              inputClass="!border-secondary-logo focus:outline-secondary-logo"
              rowed
              placeholder={t("email", { keyPrefix: "auth.register" })}
              error={error.email}
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <InputPassword
                name="password"
                className="w-full flex-wrap"
                inputClassName="!border-secondary-logo focus:outline-secondary-logo"
                placeholder={t("password", { keyPrefix: "auth.register" })}
                value={form.password}
                onChange={handleChangeForm}
                error={error.password}
              />

              <InputPassword
                name="password_confirm"
                className="w-full flex-wrap"
                inputClassName="!border-secondary-logo focus:outline-secondary-logo"
                placeholder={t("password_confirm", {
                  keyPrefix: "auth.register",
                })}
                value={form.password_confirm}
                onChange={handleChangeForm}
                error={error.password_confirm}
              />
            </div>

            <Dropdown
              options={citiesDummy}
              placeholder={t("city_dropdown_placeholder", {
                keyPrefix: "auth.register",
              })}
              selectedOption={form.city}
              onSelectedOption={(newValue) => {
                handleCityChange(newValue);
              }}
            />

            <InputImage
              name="image"
              image={form.image}
              onImageSelect={handleImageChange}
            />

            <Input
              name="company_name"
              value={form.company_name}
              onChange={handleChangeForm}
              className="w-full rounded-full flex-wrap"
              inputClass="!border-secondary-logo focus:outline-secondary-logo"
              rowed
              placeholder={t("firm_name", { keyPrefix: "auth.register" })}
            />

            <Button
              label={t("submit_button", { keyPrefix: "auth.register" })}
              onClick={() => {
                setOpenOtp(!openOtp);
              }}
              iconRight={images.chevron_right}
              iconClassName={"absolute right-4"}
              // disabled={!isValidForm}
              disabled={false}
              className={
                "btn-secondary-hover w-full mt-1 rounded-full font-medium relative"
              }
            />

            <p className="text-center font-medium">
              {t("already_have_account", { keyPrefix: "auth.register" })}
              <a
                className="font-bold text-gray-900 underline ms-1"
                href="/login"
              >
                {t("login", { keyPrefix: "common" })}
              </a>
            </p>
          </div>
        </AuthCard>
      )}
    </>
  );
}
