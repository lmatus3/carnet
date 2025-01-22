import { TablaEventos } from "../../components/TablaEventos";
import { EventosTempData } from "../../data/tempData";
import { MainLayout } from "../../layouts/MainLayout";

export const Eventos = () => {
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
          <TablaEventos Registros={EventosTempData} />
        </div>
      </div>
    </MainLayout>
  );
};
