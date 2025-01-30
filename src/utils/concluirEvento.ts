import { PatchEvento } from "../service/EventosService";
import { eventoInterface, eventoPostInterface } from "../types/eventoType";

export const concluirEvento = async (payload: eventoInterface, id: string) => {
  console.log(payload);
  const newPayload: eventoPostInterface = {
    descripcion: payload.descripcion,
    eventoTipoId: payload.eventoTipoId,
    estadoId: "3",
    fechaInicio: payload.fechaInicio,
    nombre: payload.nombre,
    fechaFin: payload.fechaFin,
  };
  const response = await PatchEvento(newPayload, id);
  return response;
};
