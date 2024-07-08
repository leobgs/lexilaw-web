import { Header } from "components";
import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const loadCalendlyScript = (onLoad) => {
  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.type = "text/javascript";
  script.async = true;

  script.onload = onLoad;

  document.head.appendChild(script);
};

export const Schedule = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const schedulingUrl = location.state;
  const calendlyInitialized = useRef(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const calendlyWidgetContainer = useRef(null);

  useLayoutEffect(() => {
    if (!schedulingUrl || calendlyInitialized.current) return;

    const handleScriptLoad = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: schedulingUrl,
          parentElement: calendlyWidgetContainer.current,
          prefill: {},
          utm: {},
        });
        calendlyInitialized.current = true;
      }
    };

    loadCalendlyScript(handleScriptLoad);

    const changeNavigation = (e) => {
      if (
        e.origin === "https://calendly.com" &&
        e.data.event &&
        e.data.event.indexOf("calendly.") === 0
      ) {
        console.log("Event name:", e.data.event);
        if (e.data.event === "calendly.event_scheduled") {
          setIsScheduled(true);
        }
      }
    };

    window.addEventListener("message", changeNavigation);

    return () => {
      if (calendlyWidgetContainer.current) {
        calendlyWidgetContainer.current.innerHTML = "";
      }
      window.removeEventListener("message", changeNavigation);
      calendlyInitialized.current = false;
    };
  }, [schedulingUrl]);

  const handleBackEvent = () => {
    if (window.history.state && window.history.state.idx > 0 && !isScheduled) {
      navigate(-1);
    } else {
      navigate("/", { state: { isScheduled: isScheduled } });
    }
  };

  return (
    <div>
      <Header
        label={t("header", { keyPrefix: "schedule" })}
        onBackClick={handleBackEvent}
      />
      <div
        ref={calendlyWidgetContainer}
        style={{ minWidth: "320px", height: "700px", margin: "20px auto" }}
      ></div>
    </div>
  );
};
