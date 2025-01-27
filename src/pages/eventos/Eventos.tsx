import { useEffect, useState } from "react";
import { TablaEventos } from "../../components/TablaEventos";
// import { EventosTempData } from "../../data/tempData";
import { MainLayout } from "../../layouts/MainLayout";
import { GetEventos } from "../../service/EventosService";
import { ValidateError } from "../../service/ValidateError";
import { eventoInterface } from "../../types/eventoType";

export const Eventos = () => {
  const [DatosEventos, setDatosEventos] = useState<eventoInterface[]>([]);
  const ObtenerDatos = async () => {
    const response = await GetEventos();
    console.log(response);
    if (response.ok) {
      // Obteniendo eventos
      if (response.data) {
        const { data } = response.data;
        if (data) {
          const { Eventos } = data;
          console.log(Eventos);
          const newEventos: eventoInterface[] = Eventos.map((evento) => {
            return {
              id: evento.id,
              nombre: evento.nombre,
              estadoId: evento.estadoId,
              descripcion: evento.descripcion,
              tipoEventoId: evento.tipoEventoId,
              creadoPor: evento.creadoPor,
              fechaHoraInicio: evento.fechaHoraInicio,
              fechaHoraUltimaModificacion: evento.fechaHoraUltimaModificacion,
            };
          });
          setDatosEventos(newEventos);
        }
      }
    } else {
      ValidateError({
        error: response.error,
        errorMessage: "No se logró obtener los eventos",
      });
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
          <TablaEventos Registros={DatosEventos} />
        </div>
      </div>
    </MainLayout>
  );
};
