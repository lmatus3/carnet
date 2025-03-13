import { BackendApi } from "../api/config";
import { administrativoInterface } from "../types/administrativoType";
import { DocenteInterface } from "../types/docenteType";
import { estudianteInterface } from "../types/estudianteType";
import { ResponseInterface } from "../types/GeneralTypes";
import { ValidateError } from "./ValidateError";

interface ResponseInformacionUsuario {
  message: string;
  data: {
    informacion: {
      estudiante: estudianteInterface[];
      docente: DocenteInterface[];
      administrativo: administrativoInterface[];
      // TODO Esto es una nueva clasificación
      directivo: administrativoInterface[];
    };
  };
  errors: string[] | null;
}

interface ResponseUserInfo extends ResponseInterface {
  data?: ResponseInformacionUsuario;
}

export const GetUserInfo: () => Promise<ResponseUserInfo> = async () => {
  try {
    const response = await BackendApi.post("informacionUsuario");
    if (response.status) {
      return {
        ok: true,
        data: response.data as ResponseInformacionUsuario,
      };
    } else {
      return {
        ok: false,
        error: "No se logró obtener información del usuario",
      };
    }
  } catch (error) {
    return ValidateError({
      error,
      errorMessage: "No se logró obtener información del usuario",
    });
  }
};
