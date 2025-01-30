import { useEffect, useState } from "react";
import { TablaEventos } from "../../components/TablaEventos";
// import { EventosTempData } from "../../data/tempData";
import { MainLayout } from "../../layouts/MainLayout";
import { GetEventos } from "../../service/EventosService";
import { eventoInterface } from "../../types/eventoType";
import { useSessionStore } from "../../stores";
import { toast } from "sonner";
import { validateResponseError } from "../../utils/validateResponseError";

export const Eventos = () => {
  const [DatosEventos, setDatosEventos] = useState<eventoInterface[]>([]);
  const onLogout = useSessionStore((state) => state.onLogout);
  const ObtenerDatos = async () => {
    const response = await GetEventos();

    if (response.ok) {
      // Obteniendo eventos
      if (response.data) {
        const { data } = response.data;
        if (data) {
          const { Eventos } = data;
          const newEventos: eventoInterface[] = Eventos.map((evento) => {
            return {
              id: evento.id,
              codigo: evento.codigo,
              nombre: evento.nombre,
              estadoId: evento.estadoId,
              descripcion: evento.descripcion,
              eventoTipoId: evento.eventoTipoId,
              creadoPor: evento.creadoPor,
              fechaInicio: evento.fechaInicio,
              actualizadoEl: evento.actualizadoEl,
            };
          });
          setDatosEventos(newEventos);
        }
      }
    } else {
      const { error, status } = response;
      if (status) {
        validateResponseError(status, onLogout);
        return;
      }
      console.log(error);
      toast.error(
        "No se logró obtener la información de los eventos"
      );
    }
  };
  useEffect(() => {
    ObtenerDatos();
  }, []);
  return (
    <MainLayout>
      <div className="flex flex-col my-6 gap-4">
        <h1 className="text-2xl font-leagueGothic w-40 py-2 bg-white m-auto text-center rounded md:text-4xl md:w-56">
          Eventos
        </h1>
        <div className="flex flex-col bg-white my-2 mx-auto rounded w-11/12 md:max-w-[800px]">
          {
            // TODO Lista de eventos
          }
          <TablaEventos Registros={DatosEventos} update={ObtenerDatos} />
        </div>
      </div>
    </MainLayout>
  );
};
