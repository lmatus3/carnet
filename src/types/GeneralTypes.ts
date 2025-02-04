export interface ResponseInterface {
  ok: boolean;
  error?: string;
  status?: number;
  errors?: string[]; // Errores de validación
}
