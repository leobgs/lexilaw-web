export const formatDate = (isoString, locale) => {
  const currentLocal = locale === "id" ? "id-ID" : "en-EN";
  const date = new Date(isoString);
  return date.toLocaleDateString(currentLocal, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
