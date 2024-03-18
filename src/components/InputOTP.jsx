import images from "assets/images";
import clsx from "clsx";

const InputOTP = ({
  className,
  name = "otp",
  placeholder,
  value,
  isNotValid,
  onValueChanged,
}) => {
  const handleValueChanged = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 6) {
      onValueChanged(newValue);
    }
  };

  return (
    <div
      className={clsx(
        "relative h-[72px] border-b-2",
        isNotValid ? "border-[#FF7878]" : "border-dark-50"
      )}
    >
      {isNotValid && (
        <div className="absolute w-full h-full flex flex-row-reverse items-center">
          <div
            className="flex items-center rounded-md px-2 py-1 bg-[#FFF5DB] ring-2 ring-[#FF9D0B]"
            onClick={() => {
              onValueChanged("");
            }}
          >
            <p className="inline font-regular text-sm text-[#DB0000]">
              Invalid
            </p>
            <img
              className="inline size-[13px]"
              src={images.ic_close_red}
              alt="close"
            />
          </div>
        </div>
      )}

      <input
        className={clsx(
          "w-full h-full bg-transparent border-none focus:outline-none focus:ring-none ring-none",
          value ? "text-[32px] font-bold" : "text-xl font-regular",
          isNotValid
            ? "text-[#DB0000]"
            : value
            ? "text-dark-50"
            : "text-[#9F9F9F]"
        )}
        type={"number"}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={handleValueChanged}
        autoComplete="off"
      />
    </div>
  );
};

export default InputOTP;
