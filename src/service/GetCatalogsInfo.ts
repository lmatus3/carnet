import { isAxiosError } from "axios";
import { BackendApi } from "../api/config";
import { ResponseInterface } from "../types/GeneralTypes";
import { eventoTypeType } from "../types/eventoType";
import { EstadoBDType } from "../types/estadoType";
import { publicoObjetivoInterface } from "../types/publicoObjetivoType";

interface EstadosData {
  message: string;
  data: { Estados: EstadoBDType[] } | null;
  errors: string[] | null;
}

interface EventosTypeData {
  message: string;
  data: { EventoTipos: eventoTypeType[] } | null;
  errors: string[] | null;
}

interface PublicoObjetivoTypeData {
  message: string;
  data: {
    PublicosObjetivo: publicoObjetivoInterface[];
  };
  errors: string[] | null;
}
interface PerfilesData {
  message: string;
  data: {
    Perfiles: {
      id: number;
      nombre: string;
    }[];
  };
  errors: string[] | null;
}

interface ResponseEstados extends ResponseInterface {
  data?: EstadosData;
}
interface ResponseEventosType extends ResponseInterface {
  data?: EventosTypeData;
}
interface ResponsePerfiles extends ResponseInterface {
  data?: PerfilesData;
}
interface ResponsePublicosObjetivo extends ResponseInterface {
  data?: PublicoObjetivoTypeData;
}

const ValidateError: ({
  err,
  errorMessage,
}: {
  err: unknown;
  errorMessage: string;
}) => {
  ok: boolean;
  error: string;
  status?: number;
} = (err, errorMessage = "No se logró obtener los datos") => {
  console.log(err);
  if (isAxiosError(err)) {
    // Access to config, request, and response
    const { response } = err;
    if (response && response.data) {
      const { message }: { message: string } = response.data;
      return { ok: false, error: message, status: err.status };
    }
    return { ok: false, error: errorMessage };
  } else {
    // Error no de backend
    return { ok: false, error: errorMessage };
  }
};

export const GetEstado: () => Promise<ResponseEstados> = async () => {
  try {
    const response = await BackendApi.get("estado");
    if (response.status) {
      return { ok: true, data: response.data as EstadosData };
    } else {
      return {
        ok: false,
        error: "No se lograron obtener los estados",
      };
    }
  } catch (error) {
    return ValidateError({
      err: error,
      errorMessage: "No se logró obtener los estados",
    });
  }
};
export const GetPerfiles: () => Promise<ResponsePerfiles> = async () => {
  try {
    const response = await BackendApi.get("perfil");
    if (response.status) {
      return { ok: true, data: response.data as PerfilesData };
    } else {
      return {
        ok: false,
        error: "No se lograron obtener los perfiles",
      };
    }
  } catch (error) {
    return ValidateError({
      err: error,
      errorMessage: "No se logró obtener los perfiles",
    });
  }
};
export const GetPublicoObjetivo: () => Promise<ResponsePublicosObjetivo> =
  async () => {
    try {
      const response = await BackendApi.get(
        "publicoObjetivo?include[]=Estado&estadoId[eq]=1"
      );
      if (response.status) {
        return { ok: true, data: response.data as PublicoObjetivoTypeData };
      } else {
        return {
          ok: false,
          error: "No se lograron obtener los publicos objetivo",
        };
      }
    } catch (error) {
      return ValidateError({
        err: error,
        errorMessage: "No se logró obtener los publicos objetivo",
      });
    }
  };
export const GetEventoType: () => Promise<ResponseEventosType> = async () => {
  try {
    const response = await BackendApi.get("eventoTipo");
    if (response.status) {
      return { ok: true, data: response.data as EventosTypeData };
    } else {
      return {
        ok: false,
        error: "No se lograron obtener los tipos de eventos",
      };
    }
  } catch (error) {
    return ValidateError({
      err: error,
      errorMessage: "No se logró obtener los tipos de evento",
    });
  }
};
