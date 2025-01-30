import { estadoEnum } from "./estadoType";

export interface perfilInterface {
  id: number;
  nombre: string;
  descripcion: string;
  estadoId: estadoEnum;
  creadoEl: string;
  actualizadoEl: string;
  creadoPor: string;
  actualizadoPor: string;
}


// Perfiles en bd
// 1 Estudiante
// 2 Docente
// 3 Administrativo