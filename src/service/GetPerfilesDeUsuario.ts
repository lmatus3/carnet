import { BackendApi } from "../api/config";
import { EstadoBDType } from "../types/estadoType";
import { ResponseInterface } from "../types/GeneralTypes";
import { ValidateError } from "./ValidateError";

interface PerfilInterface {
  id: number;
  nombre: string;
  descripcion: string;
  estadoId: string;
  Estado: EstadoBDType;
  creadoEl: string;
  actualizadoEl: string;
  creadoPor: string;
  actualizadoPor: string;
}

interface PerfilDeUsuario {
  id: string;
  nombre: string;
}
interface ResponsePerfilesInterface {
  message: string;
  data: { Perfiles: PerfilInterface[] } | null;
  errors: string[] | null;
}

interface ResponsePerfiles extends ResponseInterface {
  data?: ResponsePerfilesInterface;
}
interface ResponseUserPerfiles extends ResponseInterface {
  data?: PerfilDeUsuario[];
}

// Obtener todos los eventos
export const GetPerfiles: () => Promise<ResponsePerfiles> = async () => {
  try {
    const response = await BackendApi.get("perfil?include[]=Estado");
    if (response.status) {
      return {
        ok: true,
        data: response.data as ResponsePerfilesInterface,
      };
    } else {
      return { ok: false, error: "No se logró obtener los perfiles" };
    }
  } catch (error) {
    return ValidateError({
      error,
      errorMessage: "No se logró obtener los perfiles",
    });
  }
};
export const GetPerfilesDeUsuario: () => Promise<ResponseUserPerfiles> =
  async () => {
    try {
      const response = await BackendApi.post("perfilesUsuario");
      if (response.status) {
        return {
          ok: true,
          data: response.data as PerfilDeUsuario[],
        };
      } else {
        return {
          ok: false,
          error: "No se logró obtener los perfiles del usuario",
        };
      }
    } catch (error) {
      return ValidateError({
        error,
        errorMessage: "No se logró obtener los perfiles del usuario",
      });
    }
  };
