import images from "assets/images";
import { useTranslation } from "react-i18next";

export const ScheduleVariant = ({ item }) => {
  const { t } = useTranslation();

  return (
    <div className=" -mx-4 -ml-20 px-4 md:border-t-0 md:-mx-4 mt-2 md:flex-row">
      {<div className="border-t border-neutral-30 px-2 md:hidden pb-1.5" />}
      <div className="my-1.5 flex flex-wrap items-start gap-x-3 gap-y-1.5">
        {item?.schedules?.map((scheduleItem, index) => (
          <ScheduleItem key={index} schedule={scheduleItem} />
        ))}
      </div>

      <button
        className="border-[#E0DBD1] bg-white border rounded-3xl gap-2 !py-0 !font-regular !h-[2rem] flex items-center text-sm px-2.5"
        onClick={() => console.log("another option")}
      >
        <img src={images.ic_arrow_cornering} alt="place order" />
        <div>{t("set_yourself", { keyPrefix: "chat_respond" })}</div>
      </button>
    </div>
  );
};

const ScheduleItem = ({ schedule }) => {
  return (
    <div className="border-blue-dark border rounded-3xl bg-blue-sky gap-2 py-1.5 font-regular text-sm flex items-center px-2.5 text-center cursor-pointer whitespace-nowrap overflow-hidden">
      <img
        src={images.ic_change_style_lang}
        alt="change style"
        className="h-4 w-3"
      />
      <span className="whitespace-nowrap overflow-hidden">{schedule}</span>
    </div>
  );
};
