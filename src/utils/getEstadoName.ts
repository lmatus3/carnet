import { estadoEnum, EstadoTypes } from "../types/estadoType";

export const getEstadoName: (estado: estadoEnum) => EstadoTypes = (estado) => {
  if (estado === estadoEnum.PROGRAMADO) {
    return "Programado";
  }
  if (estado === estadoEnum.CANCELADO) {
    return "Cancelado";
  }
  if (estado === estadoEnum.CONCLUIDO) {
    return "Concluído";
  }
  if (estado === estadoEnum.DESCONOCIDO) {
    return "Desconocido";
  }
  if (estado === estadoEnum.EN_CURSO) {
    return "En curso";
  }
  return "Desconocido"
};
