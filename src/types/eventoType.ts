export interface eventoInterface {
  id: string;
  nombre: string;
  descripcion?: string;
  estadoId: "1" | "2" | "3";
  fechaHoraInicio: string;
  fechaHoraFin?: string;
  fechaHoraUltimaModificacion: string;
  creadoPor: string;
  actualizadoPor?: string;
  //   Esto va a cambiar en un futuro
  tipoEventoId: string;
}
