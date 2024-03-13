import { useState } from "react";
import AuthCard from "components/Card/AuthCard";
import { useGlobalContext } from "hooks/context";
import { Button, Input } from "components";
import { InputPassword } from "components/InputPassword";
import images from "assets/images";
import InputImage from "components/InputImage";

export default function Register() {
  const { openAlert } = useGlobalContext();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
    image: null,
    company_name: "",
  });
  const [error, setError] = useState("");

  const handleChangeForm = (e) => {
    const { name, value } = e;
    if (name) {
      setForm({ ...form, [name]: value });
      setError("");
    }
  };

  const handleImageChange = (newImage) => {
    setForm({ ...form, image: newImage });
  };

  return (
    <>
      <AuthCard className>
        <div className="grid grid-cols-1 gap-y-4 h-fit">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <Input
              name="first_name"
              value={form.email}
              onChange={handleChangeForm}
              className="w-full rounded-full"
              inputClass="!border-secondary-logo focus:outline-secondary-logo"
              rowed
              placeholder="Nama depan"
            />

            <Input
              name="last_name"
              value={form.email}
              onChange={handleChangeForm}
              className="w-full rounded-full"
              inputClass="!border-secondary-logo focus:outline-secondary-logo"
              rowed
              placeholder="Nama belakang"
            />
          </div>

          <Input
            name="email"
            value={form.email}
            onChange={handleChangeForm}
            className="w-full rounded-full"
            inputClass="!border-secondary-logo focus:outline-secondary-logo"
            rowed
            placeholder="Alamat email"
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <InputPassword
              name="password"
              className="w-full"
              inputClassName="!border-secondary-logo focus:outline-secondary-logo"
              placeholder="Kata sandi"
              value={form.password}
              onChange={handleChangeForm}
              error={error}
            />

            <InputPassword
              name="password_confirm"
              className="w-full"
              inputClassName="!border-secondary-logo focus:outline-secondary-logo"
              placeholder="Konfirmasi kata sandi"
              value={form.password}
              onChange={handleChangeForm}
              error={error}
            />
          </div>

          <InputImage
            name="image"
            image={form.image}
            onImageSelect={handleImageChange}
          />

          <Input
            name="company_name"
            value={form.email}
            onChange={handleChangeForm}
            className="w-full rounded-full"
            inputClass="!border-secondary-logo focus:outline-secondary-logo"
            rowed
            placeholder="Nama perusahaan (opsional)"
          />

          <Button
            label={"Selanjutnya"}
            onClick={() => {}}
            iconRight={images.chevron_right}
            iconClassName={"absolute right-4"}
            disabled={!form.password || !form.email}
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
