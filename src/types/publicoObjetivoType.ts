import { EstadoBDType } from "./estadoType";

export interface publicoObjetivoInterface {
  id: string;
  nombre: string;
  descripcion: string;
  estadoId: string; //id
  Estado?: EstadoBDType;
  creadoEl: string;
  actualizadoEl: string;
  creadoPor: string; //correo
  actualizadoPor: string; //correo
}

export interface eventoPublicoObjetivoInterface {
  id: string;
  eventoId: string;
  publicoObjetivoId: string;
  PublicoObjetivo: publicoObjetivoInterface;
  estadoId: string;
  creadoEl: string;
  actualizadoEl: string;
  creadoPor: string;
  actualizadoPor: string;
}
