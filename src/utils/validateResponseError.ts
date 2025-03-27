import { toast } from "sonner";

export const validateResponseError: (
  status: number,
  logOutFn: () => void
) => void = (status, logOutFn) => {
  if (status === 401) {
    // No tiene acceso acá
    logOutFn();
    toast.info("Su sesión ya no es válida, por favor inicia sesión nuevamente");
  }
  if (status === 404) {
    toast.info("No se logró encontrar este recurso");
  }
  if (status === 403) {
    toast.info("No tiene acceso a modificar este recurso");
  }
};
