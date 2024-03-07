import images from "assets/images";
import { Button } from "components/Button/Button";
import { InputPassword } from "components/InputPassword";
import { Input } from "components/Input";
import { Toggle } from "components/Toggle/Toggle";
import React, { useState } from "react";
import { useGlobalContext } from "hooks/context";

import "./Login.scss";
import AuthCard from "components/Card/AuthCard";

export const Login = () => {
  const { openAlert } = useGlobalContext();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleToggle = (isVisible) => {
    const elements = [
      { selector: ".card", action: isVisible ? "remove" : "add" },
      { selector: ".togglelanguage", action: isVisible ? "remove" : "add" },
      { selector: ".navBar", action: isVisible ? "remove" : "add" },
      { selector: ".logo", action: isVisible ? "add" : "remove" },
      { selector: ".desc", action: isVisible ? "add" : "remove" },
    ];

    elements.forEach(({ selector, action }) => {
      const element = document.querySelector(selector);
      if (element) {
        element.classList[action]("hidden");
      }
    });
  };

  const handleSignEmail = () => {
    handleToggle(true);
  };

  const handleBackLogin = () => {
    handleToggle(false);
  };

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
    <>
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
          <a className="font-bold text-gray-900 underline ms-1" href="">
            Registrasi
          </a>
        </p>
      </AuthCard>

      <div className="grid lg:grid-cols-2 lg:gap-5 px-3">
        <Button
          label={"MASUK DENGAN GOOLGE"}
          iconLeft={images.google}
          iconClassName={"w-[20px] h-[20px] me-2"}
          className={
            "whitespace-nowrap bg-outline-transparent text-white w-full mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs"
          }
        />

        <Button
          label={"MASUK DENGAN APPLE ID"}
          iconLeft={images.apple}
          iconClassName={"w-[20px] h-[20px] me-2"}
          className={
            "whitespace-nowrap bg-outline-transparent text-white w-full lg:mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs"
          }
        />

        <Button
          label={"MASUK DENGAN EMAIL"}
          iconLeft={images.email_outline}
          iconClassName={"w-[20px] h-[20px] me-2"}
          onClick={handleSignEmail}
          className={
            "md:hidden bg-outline bg-white text-green-900 w-full lg:mt-[2rem] mb-[1rem] rounded-full md:rounded-md text-sm md:text-xs"
          }
        />

        <p className="text-center text-gray-400 font-medium md:hidden">
          Belum punya Akun?
          <a className="font-bold text-white underline ms-1" href="">
            Registrasi
          </a>
        </p>
      </div>
    </>
  );
};
