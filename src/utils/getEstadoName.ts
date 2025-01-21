import { EstadoTypes } from "../types/estadoType";

  export const getEstadoName: (estadoId: "1" | "2" | "3") => EstadoTypes = (
    estadoId
  ) => {
    switch (estadoId) {
      case "1":
        return "Programado";
      case "2":
        return "En curso";
      case "3":
        return "Concluído";
      default:
        return "Desconocido";
    }
  };