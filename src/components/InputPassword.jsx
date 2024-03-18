import React, { useState } from "react";
import images from "assets/images";
import clsx from "clsx";

export const InputPassword = ({
  className,
  label,
  placeholder,
  name,
  value,
  maxLength = 8,
  inputClassName,
  error,
  onChange,
}) => {
  const type = "password";
  const [isPINVisible, setPINVisible] = useState(false);
  const [s_type, setType] = useState(type);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // if (/^\d{0,6}$/.test(e.target.value)) {
    onChange({ name: name, value: value });
    // }
  };

  const toggleShowPassword = () => {
    if (s_type === "password" || !isPINVisible) {
      setType("text");
      setPINVisible(true);
    } else {
      setType(type);
      setPINVisible(false);
    }
  };

  const handleOnKeyDown = (e) => {
    if (
      !/[0-9A-Za-z!@#$%^&*()_+`='"{}\[\]:;<>,.?~\\/]/.test(e.key) &&
      e.key !== "Backspace"
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className={clsx("text-sm", className)}>
      {label && (
        <div className="font-semi-bold text-neutral-30 mb-2 ">{label}</div>
      )}
      <div className="relative">
        <img
          className="absolute translate-y-1/2 right-4 w-[22px] h-[18px] top-2"
          src={isPINVisible ? images.ic_eye : images.ic_eye_strike}
          alt=""
          onClick={toggleShowPassword}
        />
        <input
          className={`rounded-full border-2 bg-gray-50 !border-gray-100 
                    focus:outline-none focus:ring-none ring-none
                    w-full bg-neutral-0  p-3 ${
                      inputClassName ? inputClassName : ""
                    } ${
            error ? "!border-[#FF7878] !bg-[#FFF5DB] text-[#DB0000]" : ""
          }`}
          type={type === "password" ? s_type : type}
          minLength={maxLength}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={handleOnChange}
          autoComplete="off"
          onKeyDown={handleOnKeyDown}
        />
      </div>
      {error && (
        <div className="flex items-center mt-1 ml-1">
          {/* <img className='w-3 h-3' src={images.ic_invalid} alt='' /> */}
          <div className="text-error-base text-xs ml-1">{error}</div>
        </div>
      )}
    </div>
  );
};
