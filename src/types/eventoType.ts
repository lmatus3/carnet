import { estadoEnum } from "./estadoType";

export interface eventoInterface {
  id: string;
  nombre: string;
  descripcion?: string;
  estadoId: estadoEnum;
  fechaHoraInicio: string;
  fechaHoraFin?: string;
  fechaHoraUltimaModificacion: string;
  creadoPor: string;
  actualizadoPor?: string;
  //   Esto va a cambiar en un futuro
  tipoEventoId: string;
}

export interface eventoPostInterface {
  nombre: string;
  descripcion: string;
  eventoTipoId: string;
  fechaInicio: string; //Aplica a validación de fecha actual
  fechaFin: string; //Opcional, Aplica a validación de fecha respecto a la de inicio y la actual\
  estadoId: string; //Opcional
}

export type eventoTypeType = {
  id: string;
  nombre: string;
  descripcion: string | null;
  estadoId: string;
};
