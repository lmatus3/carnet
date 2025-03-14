import { PatchEvento } from "../service/EventosService";
import { eventoInterface, eventoPatchInterface } from "../types/eventoType";

export const concluirEvento = async (payload: eventoInterface, id: string) => {
  console.log(payload);
  const newPayload: eventoPatchInterface = {
    descripcion: payload.descripcion,
    eventoTipoId: payload.eventoTipoId,
    estadoId: "5",
    fechaInicio: payload.fechaInicio,
    nombre: payload.nombre,
    fechaFin: payload.fechaFin,
  };
  const response = await PatchEvento(newPayload, id);
  return response;
};
