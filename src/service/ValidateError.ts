import { isAxiosError } from "axios";

// export const ValidateError: ({
//   err,
//   errorMessage,
// }: {
//   err: unknown;
//   errorMessage: string;
// }) => {
//   ok: boolean;
//   error: string;
//   status?: number;
// } = (err, errorMessage = "No se logró obtener los datos") => {
//   console.log(err);
//   if (isAxiosError(err)) {
//     // Access to config, request, and response
//     const { response } = err;
//     if (response && response.data) {
//       const { message }: { message: string } = response.data;
//       return { ok: false, error: message, status: err.status };
//     }
//     return { ok: false, error: errorMessage };
//   } else {
//     // Error no de backend
//     return { ok: false, error: errorMessage };
//   }
// };

interface ValidateErrorProps {
  error: unknown;
  errorMessage: string;
}

export const ValidateError: (props: ValidateErrorProps) => {
  ok: boolean;
  error: string;
  status?: number;
} = ({ error, errorMessage }) => {
  if (isAxiosError(error)) {
    // Obteniendo mensaje de error de backend
    const { response } = error;
    if (response && response.data) {
      const { message, errors }: { message: string; errors?: string[] } =
        response.data;
      if (errors) {
        return { ok: false, error: message, status: response.status, errors };
      }
      return { ok: false, error: message, status: response.status };
    } else {
      // Otro tipo de error
      return { ok: false, error: errorMessage };
    }
  } else {
    // Error no de axios
    return { ok: false, error: errorMessage };
  }
};
