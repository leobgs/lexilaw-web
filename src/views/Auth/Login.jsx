import images from "assets/images";
import { Button } from "components/Button/Button";
import { InputPassword } from "components/InputPassword";
import { Input } from "components/Input";
import React, { useState } from "react";
import { useGlobalContext } from "hooks/context";
import "./Login.scss";
import AuthCard from "components/Card/AuthCard";

export const Login = () => {
  const { openAlert } = useGlobalContext();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const onSubmit = () => {
    openAlert({
      title: "Halo lagi,",
      messages: "Prima Kusumo",
      icon: images.ai_profile_thumbnail,
    });
  };

  const handleChangeForm = (e) => {
    // if (!e) return;
    const { name, value } = e;

    if (name) {
      setForm({ ...form, [name]: value });
      setError("");
    }
  };

  return (
    <AuthCard>
      <h2 className="mb-[1rem] text-green-900 text-2xl font-semibold text-center">
        Login Menggunakan Email Terdaftar
      </h2>

      <Input
        name="email"
        value={form.email}
        onChange={handleChangeForm}
        className="w-full rounded-full"
        inputClass="!border-secondary-logo focus:outline-secondary-logo"
        rowed
        placeholder="Alamat email"
      />

      <InputPassword
        name="password"
        className="w-full mt-[1.5rem]"
        inputClassName="!border-secondary-logo focus:outline-secondary-logo"
        placeholder="Kata sandi"
        value={form.password}
        onChange={handleChangeForm}
        error={error}
      />

      <Button
        // onClick={() => openAlert({ title: 'Halo Dek,', messages: 'Prima Kusumo', image: images.apple })}
        label={"Login"}
        onClick={onSubmit}
        iconRight={images.chevron_right}
        iconClassName={"absolute right-4"}
        disabled={!form.password || !form.email}
        className={
          "btn-secondary-hover w-full mt-[2rem] mb-[1rem] rounded-full font-medium relative"
        }
      />

      <p className="text-center font-medium">
        Belum punya Akun?
        <a className="font-bold text-gray-900 underline ms-1" href="/register">
          Registrasi
        </a>
      </p>
    </AuthCard>
  );
};
