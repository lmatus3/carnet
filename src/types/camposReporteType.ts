export type camposReporteAsistenciaType = {
  codigoEvento: boolean;
  nombreEvento: boolean;
  carnetUsuario: boolean;
  tipoUsuario: boolean;
  nombreUsuario: boolean;
  fechaAsistencia: boolean;
  nombreCarrera: boolean;
  nombreCargo: boolean;
  etniaUsuario: boolean;
  sexo: boolean;
};

export interface camposReporteFinal {
  id: number;
  "Codigo evento": string;
  "Nombre evento": string;
  "Tipo perfil": string;
  "Fecha y hora": string;
  Carnet: string;
  "Nombre carrera"?: string;
  "Nombre cargo"?: string;
  Etnia?: string;
  Sexo?: string;
  // perfilId: string;
  // Perfil: perfilInterface;
  // nombre: string;
  // codigo: string;
  // estadoId: estadoEnum;
  // Estado: EstadoBDType;
  // creadoEl: string;
  // actualizadoEl: string;
  // creadoPor: string;
  // actualizadoPor: string;
}
