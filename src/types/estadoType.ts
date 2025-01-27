export type EstadoTypes =
  | "Programado"
  | "En curso"
  | "Concluído"
  | "Desconocido"
  | "Cancelado";
export type EstadosEstudianteTypes =
  | "Activo"
  | "Retirado"
  | "Egresado"
  | "Graduado"
  | "Inactivo"
  | "Egresado no graduado"
  | "Expulsado"
  | "Culminación de estudios";

export enum estadoEnum {
  PROGRAMADO = "1",
  EN_CURSO = "2",
  CONCLUIDO = "3",
  DESCONOCIDO = "4",
  CANCELADO = "5",
}
export type EstadoBDType = {
  id: string;
  nombre: string;
  descripcion: string;
  creadoEl: string;
  actualizadoEl: string;
  creadoPor: string;
  actualizadoPor: string;
};
