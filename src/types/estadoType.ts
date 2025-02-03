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
  PROGRAMADO = "3",
  EN_CURSO = "4",
  CONCLUIDO = "5",
  DESCONOCIDO = "6",
  CANCELADO = "7",
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

export const ValidarEstadoEstudianteActivo = (
  estado: EstadosEstudianteTypes
) => {
  if (estado === "Activo" || estado === "Culminación de estudios") {
    return true;
  }
  return false;
};
