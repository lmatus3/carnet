import { isAxiosError } from "axios";
import { BackendApi } from "../api/config";

export interface ValidateResponseInterface {
  estudianteCarne: string;
  matriculado: "SI" | "NO";
  inscrito: "SI" | "NO";
  estado: string;
}

export interface InfoEstudianteInterface {
  estudianteCarne: string;
  nombreEstudiante: string;
  periodoLectivo: string;
  carreraNombre: string;
  personaFoto: string;
  iAA: string;
  matriculado: "SI" | "NO";
  inscrito: "SI" | "NO";
  estado: string;
  email: string;
  cursoNombre: string;
}
interface BackendDataResponse {
  message: string;
  data: {
    infoEstudiante: InfoEstudianteInterface[] | ValidateResponseInterface[];
  } | null;
  errors: string[] | null;
}

interface ResponseInfoInterface {
  ok: boolean;
  data?: BackendDataResponse;
  error?: string;
  status?: number;
}

const ValidateError: (err: unknown) => {
  ok: boolean;
  error: string;
  status?: number;
} = (err) => {
  console.log(err);
  if (isAxiosError(err)) {
    // Access to config, request, and response
    const { response } = err;
    if (response && response.data) {
      const { message }: { message: string } = response.data;
      return { ok: false, error: message, status: err.status };
    }
    return { ok: false, error: "No se logró obtener los datos del usuario" };
  } else {
    // Error no de backend
    return { ok: false, error: "No se logró obtener los datos del usuario" };
  }
};

export const GetEstudianteInfo: () => Promise<ResponseInfoInterface> =
  async () => {
    try {
      const response = await BackendApi.post("informacionUsuario");
      if (response.status) {
        return { ok: true, data: response.data as BackendDataResponse };
      } else {
        return {
          ok: false,
          error: "No se logró obtener los datos del usuario",
        };
      }
    } catch (error) {
      return ValidateError(error);
    }
  };

export const ValidateEstudianteInfo: (
  carnet: string
) => Promise<ResponseInfoInterface> = async (carnet) => {
  try {
    const response = await BackendApi.get(
      "estadoEstudiante?EstudianteCarne=" + carnet
    );
    if (response.status) {
      return { ok: true, data: response.data as BackendDataResponse };
    } else {
      return {
        ok: false,
        error: "No se logró validar los datos del usuario",
      };
    }
  } catch (error) {
    return ValidateError(error);
  }
};
