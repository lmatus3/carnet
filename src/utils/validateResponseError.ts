import { toast } from "sonner";

export const validateResponseError: (
  status: number,
  logOutFn: () => void
) => void = (status, logOutFn) => {
  if (status === 401) {
    // No tiene acceso aca
    logOutFn();
    toast.info("Por favor inicia sesión nuevamente");
  }
  if (status === 404) {
    toast.info("No se logró encontrar este recurso");
  }
};
