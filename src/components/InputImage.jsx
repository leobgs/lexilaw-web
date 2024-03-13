import React, { useRef } from "react";
import images from "assets/images";
import { Button } from "components";
import clsx from "clsx";

export default function InputImage({
  className,
  name,
  image,
  error,
  onImageSelect,
}) {
  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className={clsx("text-sm flex flex-wrap items-center justify-stretch", className)}
    >
      <div className="flex w-full items-center md:items-start">
        <img
          className={`h-16 w-16 flex-none rounded-full size-16 ${
            image === null ? "" : "ring-[1.6px] ring-[#2E2C2B]"
          }`}
          src={image === null ? images.ic_avatar_placeholder : image}
          alt=""
          style={{ objectFit: "cover" }}
        />
        <div className="pl-2">
          <h3 className="font-medium text-base md:text-sm">
            Gunakan file maks 5mb, min 200px x 200px
          </h3>

          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImageSelect}
            name={name}
          />

          <div className="hidden md:block">
            <UploadButton onClick={handleClick} className="pt-2" />
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <UploadButton onClick={handleClick} className="pt-2" />
      </div>

      {error && (
        <div className="flex items-center mt-1 ml-1">
          <img className="w-3 h-3" src={images.ic_invalid} alt="" />
          <div className="text-error-base text-xs ml-1">{error}</div>
        </div>
      )}
    </div>
  );
}

function UploadButton({ onClick, className }) {
  return (
    <div className={className}>
      <Button
        label={"Unggah"}
        onClick={onClick}
        iconRight={images.ic_upload}
        iconClassName={"object-scale-down w-4 h-4"}
        className={
          "h-8 w-[83px] rounded-full bg-[#DCE7FF] sm:font-bold md:font-regular text-base md:text-xs ring-1 ring-[#032E84]"
        }
      />
    </div>
  );
}
