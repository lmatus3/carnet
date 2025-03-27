import { PatchEvento } from "../service/EventosService";
import { eventoInterface, eventoPatchEstado } from "../types/eventoType";

export const empezarEvento = async (payload: eventoInterface, id: string) => {
  console.log(payload);
  const newPayload: eventoPatchEstado = {
    estadoId: "4",
  };
  const response = await PatchEvento(newPayload, id);
  return response;
};
