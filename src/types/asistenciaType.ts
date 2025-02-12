import { EstadoBDType, estadoEnum } from "./estadoType";
import { eventoInterface } from "./eventoType";
import { perfilInterface } from "./perfilType";

export interface asistenciaInterface {
  eventoId: string;
  perfilId: string;
  codigo: string;
}

export interface asistenciasReporteInterface {
  id: number;
  EventoID: string;
  Codigo: string;
  Nombre: string;
  TipoAsistencia: string;
  EstadoId: string;
  CreadoEl?: string;
  CreadoPor: string; //Correo
  Carrera?: string;
  Sexo?: string;
}

export interface asistenciasDBInterface {
  id: number;
  eventoId: string;
  Evento: eventoInterface;
  perfilId: string;
  Perfil: perfilInterface;
  nombre: string;
  carrera: string;
  sexo: string;
  codigo: string;
  estadoId: estadoEnum;
  Estado: EstadoBDType;
  creadoEl: string;
  actualizadoEl: string;
  creadoPor: string;
  actualizadoPor: string;
}
