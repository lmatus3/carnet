import { eventoTypeType } from "./eventoType";

export type categoriaEventoInterface = {
  id: number;
  nombre: string;
  descripcion: string;
  estadoId: string;
  creadoEl: string; //Fecha
  actualizadoEl: string; //Fecha
  creadoPor: string; //correo
  actualizadoPor: string; //correo
  EventoTipos: eventoTypeType[];
};
