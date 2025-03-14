export const formatDateFromISO = (isoDateString: string) => {
  const date = new Date(isoDateString);
  return date.toISOString().slice(0, 23); // "yyyy-MM-ddThh:mm:ss.SSS"
};

export const formatDateToISO = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString(); // Retorna en formato ISO 8601
};
