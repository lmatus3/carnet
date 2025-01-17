import { BackendApi } from "../api/config";

interface ValidateResponseInterface {
  estudianteCarne: string;
  matriculado: "SI" | "NO";
  inscrito: "SI" | "NO";
  estado: string;
}

interface InfoEstudianteInterface {
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
interface GetEstudianteInfoResponse {
  message: string;
  data: { infoEstudiante: InfoEstudianteInterface[] } | null;
  errors: string[] | null;
}
interface GetEstadoEstudianteInfoResponse {
  message: string;
  data: { infoEstudiante: ValidateResponseInterface[] } | null;
  errors: string[] | null;
}

interface ResponseInfoInterface {
  ok: boolean;
  data?: InfoEstudianteInterface[];
  error?: string;
}

interface ResponseValidInterface {
  ok: boolean;
  data?: ValidateResponseInterface[];
  error?: string;
}

export const GetEstudianteInfo: () => Promise<ResponseInfoInterface> =
  async () => {
    try {
      const response = await BackendApi.post("infoEstudiante");
      const ServerResponse = response.data as GetEstudianteInfoResponse;
      if (ServerResponse.data) {
        return {
          ok: true,
          data: ServerResponse.data.infoEstudiante as InfoEstudianteInterface[],
        };
      } else {
        if (ServerResponse.errors) {
          console.log(ServerResponse.errors);
        }
      }
      return {
        ok: false,
        error: "No se logró obtener información de este usuario",
      };
    } catch (error) {
      console.log(error);

      return {
        ok: false,
        error: "No se logró obtener información de este usuario",
      };
    }
  };

export const ValidateEstudianteInfo: (
  carnet: string
) => Promise<ResponseValidInterface> = async (carnet) => {
  try {
    const response = await BackendApi.get(
      "estadoEstudiante?EstudianteCarne=" + carnet
    );
    const ServerResponse = response.data as GetEstadoEstudianteInfoResponse;
    if (ServerResponse.data) {
      return {
        ok: true,
        data: ServerResponse.data.infoEstudiante as ValidateResponseInterface[],
      };
    } else {
      if (ServerResponse.errors) {
        console.log(ServerResponse.errors);
      }
    }
    return {
      ok: false,
      error: "No se logró obtener información de este usuario",
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      error: "No se logró obtener información de este usuario",
    };
  }
};
