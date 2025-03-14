import { Link, useParams } from "react-router";
import { MainLayout } from "../../layouts/MainLayout";
import { eventoInterface } from "../../types/eventoType";
import { useEffect, useState } from "react";
import { getEstadoName } from "../../utils/getEstadoName";
import { EstadoBadge } from "../../components/EstadoBadge";
import { useModalControls } from "../../hooks/useModalControls";
import { EditEvento } from "./EditEvento";
import { envs } from "../../plugins/envs";
import { QR } from "../../plugins/QR";
import { downloadQRCode } from "../../utils/donwloadQR";
import { GetEvento } from "../../service/EventosService";
import { toast } from "sonner";
import { validateResponseError } from "../../utils/validateResponseError";
import { useSessionStore } from "../../stores";
import { useUIStore } from "../../stores/UIStore";

export const Evento = () => {
  const { id } = useParams();
  // Construyendo URL
  const URLQR: string = envs.LINK_APP + "asistencia/" + id;
  // Datos de evento a renderizar
  const [Data, setData] = useState<eventoInterface>();
  const [FechaInicio, setFechaInicio] = useState<string>();
  const [FechaFin, setFechaFin] = useState<string>();
  const [HoraInicio, setHoraInicio] = useState<string>();
  const [HoraFin, setHoraFin] = useState<string>();
  const onLogout = useSessionStore((state) => state.onLogout);
  const SetLoading = useUIStore((state) => state.SetLoading);
  const loading = useUIStore((state) => state.loading);

  // Modal
  // Controles del modal de las acciones
  const { ModalRef, isModalOpen, setIsModalOpen } = useModalControls();
  const MostrarMensajeError = (duration: number) => {
    toast.error("No se logró obtener datos del evento", {
      duration,
    });
  };
  const getEventoInfo = async () => {
    if (id) {
      SetLoading(true);
      const response = await GetEvento(id);
      if (response.ok) {
        if (response.data) {
          const { Evento } = response.data.data;
          if (Evento) {
            // Aca data es el evento ya
            setData({
              actualizadoPor: Evento.actualizadoPor,
              codigo: Evento.codigo,
              creadoPor: Evento.creadoPor,
              descripcion: Evento.descripcion,
              estadoId: Evento.estadoId,
              fechaInicio: Evento.fechaInicio,
              fechaFin: Evento.fechaFin,
              actualizadoEl: Evento.actualizadoEl,
              id: Evento.id,
              nombre: Evento.nombre,
              eventoTipoId: Evento.eventoTipoId,
              EventoGrupo: Evento.EventoGrupo,
              EventoPublicoObjetivo: Evento.EventoPublicoObjetivo,
            });
            setFechaInicio(Evento.fechaInicio.split("T")[0]);
            setHoraInicio(Evento.fechaInicio.split("T")[1].split("-")[0]);
            if (Evento.fechaFin) {
              setFechaFin(Evento.fechaFin.split("T")[0]);
              setHoraFin(Evento.fechaFin.split("T")[1].split("-")[0]);
            }
            toast.info("Datos de evento cargados exitosamente");
          }
        } else {
          MostrarMensajeError(10000);
        }
      } else {
        const { status } = response;
        if (status) {
          validateResponseError(status, onLogout);
        }
        MostrarMensajeError(10000);
      }
      SetLoading(false);
    }
  };

  useEffect(() => {
    getEventoInfo();
  }, []);

  useEffect(() => {
    console.log(Data);
  }, [Data]);

  return (
    <MainLayout>
      <div className="bg-white w-11/12 md:w-3/4 h-full m-auto my-8 rounded p-4 relative">
        {loading ? (
          <p>Cargando...</p>
        ) : Data ? (
          <div>
            <h1 className="text-2xl md:text-4xl font-leagueGothic">
              Código de evento: {Data.codigo}
            </h1>
            <div className="mt-2 relative mb-20 md:mb-0">
              <div className="flex justify-between">
                <h2 className="text-xl md:text-2xl">{Data.nombre}</h2>
                <span className="flex items-center gap-2">
                  <EstadoBadge estado={getEstadoName(Data.estadoId)} />
                </span>
              </div>
              <hr className="border-blueDark my-1" />
              <span className="block font-bold text-xl">
                Descripción del evento
              </span>
              <p className="text-pretty">{Data.descripcion}</p>
              {Data.fechaFin && Data.fechaInicio ? (
                <>
                  <span className="block font-bold text-xl">Programación</span>
                  <p>
                    El evento se programó a empezar el día: {FechaInicio} a las{" "}
                    <b>{HoraInicio}</b>
                  </p>
                  <p>
                    Y <b>concluir</b> el día: {FechaFin} a las <b>{HoraFin}</b>
                  </p>
                </>
              ) : (
                <>
                  <span className="block font-bold text-xl">
                    Fecha y hora de inicio
                  </span>
                  <p>
                    El evento se programó a empezar el día: {FechaInicio} a las{" "}
                    <b>{HoraInicio}</b>
                  </p>
                </>
              )}
              <div>
                <span className="block font-bold text-xl">
                  Público objetivo
                </span>
                <div>
                  {Data.EventoPublicoObjetivo.map((publico) => (
                    <p className="list-item ml-4" key={"publicoObjetivo" + publico.id}>{publico.PublicoObjetivo.nombre}</p>
                  ))}
                </div>
              </div>
              {/* Mostrando QR de evento */}
              <p className="text-center font-leagueGothic text-2xl md:text-4xl ">
                QR de asistencia
              </p>
              <div className="bg-OrangeMedium rounded w-64 m-auto p-4 mb-8 relative">
                <button
                  type="button"
                  onClick={() =>
                    downloadQRCode({ id: "QRGenerated", downloadSize: 720 })
                  }
                  className="w-full h-full bg-white  absolute top-0 left-0 rounded opacity-0 hover:opacity-55"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-blueDark "
                    viewBox="0 -960 960 960"
                  >
                    <path d="M480-337q-8 0-15-2.5t-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5ZM240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360q17 0 28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360q17 0 28.5 11.5T800-320v80q0 33-23.5 56.5T720-160H240Z" />
                  </svg>
                </button>
                <QR id="QRGenerated" URL={URLQR} />
              </div>
            </div>
            {/* Botones de acciones */}
            <div className="absolute right-0 bottom-5 w-full flex  gap-2 justify-center md:w-fit md:right-2 md:flex-col px-2">
              <Link
                type="button"
                to={"/tomar_asistencia/" + id}
                className="bg-green-700 text-white py-1 px-4 rounded text-center text-sm md:text-base w-36 md:w-40"
              >
                Tomar asistencia
              </Link>
              <Link
                type="button"
                to={"/ver_asistencia/" + id}
                className="bg-yellowStrong text-black py-1 px-4 rounded text-center  text-sm md:text-base w-36 md:w-40"
              >
                Ver asistencia
              </Link>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-blueDark text-white py-1 px-4 rounded text-center text-sm md:text-base w-36 md:w-40"
              >
                Editar evento
              </button>
            </div>
          </div>
        ) : (
          <>
            No se logró obtener datos de este evento, por favor, valide la
            dirección de este evento
          </>
        )}
        {/* Modal */}
        {isModalOpen && Data && (
          <div
            className={`fixed top-0 left-0 w-full h-svh flex z-10 backdrop-blur-sm overflow-auto`}
          >
            <div
              ref={ModalRef}
              className="bg-white my-12 mx-auto w-11/12 md:w-2/3 h-fit p-8 rounded shadow-lg relative"
            >
              <EditEvento
                closeModal={() => setIsModalOpen(false)}
                eventoData={Data}
                update={() => getEventoInfo()}
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
