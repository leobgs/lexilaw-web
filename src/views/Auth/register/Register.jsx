import { useState } from "react";
import AuthCard from "components/Card/AuthCard";
import { useGlobalContext } from "hooks/context";
import { Button, Input } from "components";
import { InputPassword } from "components/InputPassword";
import images from "assets/images";
import InputImage from "components/InputImage";
import { Dropdown } from "components/Dropdown/Dropdown";

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

  return (
    <>
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
              placeholder="Nama depan"
              error={error.first_name}
            />

            <Input
              name="last_name"
              value={form.last_name}
              onChange={handleChangeForm}
              className="w-full rounded-full flex-wrap"
              inputClass="!border-secondary-logo focus:outline-secondary-logo"
              rowed
              placeholder="Nama belakang"
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
            placeholder="Alamat email"
            error={error.email}
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <InputPassword
              name="password"
              className="w-full flex-wrap"
              inputClassName="!border-secondary-logo focus:outline-secondary-logo"
              placeholder="Kata sandi"
              value={form.password}
              onChange={handleChangeForm}
              error={error.password}
            />

            <InputPassword
              name="password_confirm"
              className="w-full flex-wrap"
              inputClassName="!border-secondary-logo focus:outline-secondary-logo"
              placeholder="Konfirmasi kata sandi"
              value={form.password_confirm}
              onChange={handleChangeForm}
              error={error.password_confirm}
            />
          </div>

          <Dropdown
            options={citiesDummy}
            placeholder={"Pilih Kota"}
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
            placeholder="Nama perusahaan (opsional)"
          />

          <Button
            label={"Selanjutnya"}
            onClick={() => {
              console.log("HIT")
            }}
            iconRight={images.chevron_right}
            iconClassName={"absolute right-4"}
            disabled={!isValidForm}
            className={
              "btn-secondary-hover w-full mt-1 rounded-full font-medium relative"
            }
          />

          <p className="text-center font-medium">
            Sudah punya Akun?
            <a className="font-bold text-gray-900 underline ms-1" href="/login">
              Login
            </a>
          </p>
        </div>
      </AuthCard>
    </>
  );
}
