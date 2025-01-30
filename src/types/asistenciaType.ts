import { estadoEnum } from "./estadoType";
import { eventoInterface } from "./eventoType";
import { perfilInterface } from "./perfilType";

export interface asistenciaInterface {
  eventoId: string;
  perfilId: string;
}

export interface asistenciasDBInterface {
  id: number;
  eventoId: string;
  Evento: eventoInterface;
  perfilId: string;
  Perfil: perfilInterface;
  estadoId: estadoEnum;
  participante: string; //Correo
  creadoEl: string;
  actualizadoEl: string;
  creadoPor: string;
  actualizadoPor: string;
}
