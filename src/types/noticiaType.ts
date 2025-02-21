export interface noticiaInterface {
  id?: string;
  titulo: string;
  mensaje: string;
  severidadId: 1 | 2 | 3; // 1: Baja, 2: Media, 3:Alta
  categoria: string | number; // Id de categoría de noticia
  fechaDePublicacion: string;
  fechaDeExpiracion: string;
  etiquetas?: string // Un solo string separado por guión bajo
  publico: string[]; // Array de IDs de perfiles que pueden ver la noticia
  estadoId: 1 | 2; // 1: Activa, 2: Inactiva
  creadoPor?: string; // Correo de usuario que creó la noticia
  // TODO Las imagenes se probarán incluir en el mensaje, de no ser posible sería un campo extra
  // img?: string; // Evaluando si es factible aún
}
