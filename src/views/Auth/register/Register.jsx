import { useState } from "react";
import AuthCard from "components/Card/AuthCard";
import { Button, Input } from "components";
import { InputPassword } from "components/InputPassword";
import images from "assets/images";
import InputImage from "components/InputImage";
import { Dropdown } from "components/Dropdown/Dropdown";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
  const { t } = useTranslation();
  const { registerForm, registerFormReducer } = useGlobalContext();
  const navigate = useNavigate();
  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const fullName = registerForm.first_name + " " + registerForm.last_name;

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
    return registerForm.password === value;
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
      registerForm.first_name === null ||
      registerForm.last_name === null ||
      registerForm.email === null ||
      registerForm.password === null ||
      registerForm.password_confirm === null ||
      registerForm.city === null ||
      registerForm.image === null
    );
  };

  const isValidForm = !isAnyEmptyForm() || !isAnyError();

  const handleChangeForm = (e) => {
    const { name, value } = e;
    registerFormReducer(name, value)
    const errorMessage = validateInput(name, value);
    setError({ ...error, [name]: errorMessage });
  };

  const handleImageChange = (newImage) => {
    registerFormReducer(["image"], newImage)
  };

  const handleCityChange = (newValue) => {
    registerFormReducer(["city"], newValue)
  };
  
  return (
    <>
      (
        <AuthCard className>
          <div className="grid grid-cols-1 gap-y-4 h-fit">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <Input
                name="first_name"
                value={registerForm.first_name}
                onChange={handleChangeForm}
                className="w-full rounded-full flex-wrap"
                inputClass="!border-secondary-logo focus:outline-secondary-logo"
                rowed
                placeholder={t("firstName", { keyPrefix: "auth.register" })}
                error={error.first_name}
              />

              <Input
                name="last_name"
                value={registerForm.last_name}
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
              value={registerForm.email}
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
                value={registerForm.password}
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
                maxLength={8}
                value={registerForm.password_confirm}
                onChange={handleChangeForm}
                error={error.password_confirm}
              />
            </div>

            <Dropdown
              options={citiesDummy}
              placeholder={t("city_dropdown_placeholder", {
                keyPrefix: "auth.register",
              })}
              selectedOption={registerForm.city}
              onSelectedOption={(newValue) => {
                handleCityChange(newValue);
              }}
            />

            <Input
              name="company_name"
              value={registerForm.company_name}
              onChange={handleChangeForm}
              className="w-full rounded-full flex-wrap"
              inputClass="!border-secondary-logo focus:outline-secondary-logo"
              rowed
              placeholder={t("firm_name", { keyPrefix: "auth.register" })}
            />

            <InputImage
              name="image"
              image={registerForm.image}
              onImageSelect={handleImageChange}
            />

            <Button
              label={t("submit_button", { keyPrefix: "auth.register" })}
              onClick={() => {
                navigate('/register/otp', {state: {email: registerForm.email, fullName: fullName}});
              }}
              iconRight={images.chevron_right}
              iconClassName={"absolute right-4"}
              disabled={!isValidForm}
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
      )
    </>
  );
}