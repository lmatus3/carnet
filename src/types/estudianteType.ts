import { EstadosEstudianteTypes } from "./estadoType";

export interface estudianteInterface {
  estudianteCarne: string;
  nombreEstudiante: string;
  periodoLectivo: string | null;
  carreraNombre: string; // Requiere hacerle un split // Ejemplo 607 - Diplomado
  personaFoto: string;
  iAA: string;
  matriculado: "SI" | "NO";
  inscrito: "SI" | "NO";
  estado: EstadosEstudianteTypes;
  email: string;
  cursoNombre: string;
}