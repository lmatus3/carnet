export interface administrativoInterface {
  no_emple: string;
  nombres: string;
  cargo: string;
  estatus: "1" | "0"; // 1 es activo y 0 inactivo
  fechabaja: string | null;
  imgFoto: string;
}
