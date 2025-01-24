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

export type EstadoBDType = {
  id: string;
  nombre: string;
  descripcion: string;
  creadoEl: string;
  actualizadoEl: string;
  creadoPor: string;
  actualizadoPor: string;
};
