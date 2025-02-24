export interface noticiaInterface {
  id?: string;
  titulo: string;
  mensaje: string; //HTML
  severidadId: "1" | "2" | "3"; // 1: Baja, 2: Media, 3:Alta
  categoria: string | number; // Id de categoría de noticia
  fechaDePublicacion: string;
  fechaDeExpiracion: string;
  etiquetas?: string; // Un solo string separado por coma
  publico: string; // Ids separados por coma
  estadoId: "1" | "2"; // 1: Activa, 2: Inactiva
  creadoPor?: string; // Correo de usuario que creó la noticia
}
