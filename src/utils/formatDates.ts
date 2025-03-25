export const formatDateFromISO = (isoDateString: string) => {
  const date = new Date(isoDateString);
  const offset = date.getTimezoneOffset() * 60000; // Ajustar la zona horaria
  const localDate = new Date(date.getTime() - offset);
  return localDate.toISOString().slice(0, 16); // Formato compatible con input
};

export const formatDateToISO = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 23); // Mantiene el formato sin convertir a UTC
};
