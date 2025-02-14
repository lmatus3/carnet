export interface noticiaInterface {
  id: string;
  titulo: string;
  mensaje: string;
  severidad: "alta" | "media" | "baja";
  img?: string; // Evaluando si es factible aún
}
