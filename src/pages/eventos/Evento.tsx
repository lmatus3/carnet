import { useParams } from "react-router";
import { MainLayout } from "../../layouts/MainLayout";
import { eventoInterface } from "../../types/eventoType";
import { useState } from "react";
import { getEstadoName } from "../../utils/getEstadoName";
import { EstadoBadge } from "../../components/EstadoBadge";
import { useModalControls } from "../../hooks/useModalControls";
import { EditEvento } from "./EditEvento";
import { envs } from "../../plugins/envs";
import { QR } from "../../plugins/QR";
import { downloadQRCode } from "../../utils/donwloadQR";

export const Evento = () => {
  const { id } = useParams();
  // Construyendo URL
  const URLQR: string = envs.LINK_APP + "asistencia/" + id;
  //* Temp data
  const FakeData: eventoInterface = {
    id: id as string,
    nombre: "Ejemplo",
    descripcion:
      "Cupidatat ut do elit nulla ipsum occaecat. Nostrud voluptate reprehenderit aliqua amet nostrud sint ullamco. Sit do sit incididunt labore quis commodo ad dolore ipsum cupidatat.",
    estadoId: "1",
    fechaHoraInicio: "2025-01-23T17:46",
    fechaHoraFin: "2025-01-23T20:00",
    fechaHoraUltimaModificacion: "123123123",
    creadoPor: "lmatus3@unica.edu.ni",
    //   Esto va a cambiar en un futuro
    tipoEventoId: "1",
  };
  // Datos de evento a renderizar
  const [Data, setData] = useState<eventoInterface>(FakeData);

  // Modal
  // Controles del modal de las acciones
  const { ModalRef, isModalOpen, setIsModalOpen } = useModalControls();
  // Descargar QR como imagen

  return (
    <MainLayout>
      <div className="bg-white w-11/12 md:w-1/2 m-auto mt-8 rounded p-4">
        <h1 className="text-2xl md:text-4xl font-leagueGothic">
          Evento código: {id}
        </h1>
        <div className="mt-2 relative">
          <div className="flex justify-between">
            <h2 className="text-xl md:text-2xl">{Data.nombre}</h2>
            <span>
              <EstadoBadge estado={getEstadoName(Data.estadoId)} />
            </span>
          </div>
          <hr className="border-blueDark" />
          <span className="block font-bold text-xl">
            Descripción del evento
          </span>
          <p>{Data.descripcion}</p>
          {Data.fechaHoraFin && Data.fechaHoraInicio ? (
            <>
              <span className="block font-bold text-xl">Programación</span>
              <p>
                El evento se programó a empezar el día:{" "}
                {Data.fechaHoraInicio.split("T")[0]} a las{" "}
                <b>{Data.fechaHoraInicio.split("T")[1]}</b>
              </p>
              <p>
                Y <b>concluir</b> el día: {Data.fechaHoraFin.split("T")[0]} a
                las <b>{Data.fechaHoraFin.split("T")[1]}</b>
              </p>
            </>
          ) : (
            <>
              <span className="block font-bold text-xl">
                Fecha y hora de inicio
              </span>
              <p>
                El evento se programó a empezar el día:{" "}
                {Data.fechaHoraInicio.split("T")[0]} a las{" "}
                <b>{Data.fechaHoraInicio.split("T")[1]}</b>
              </p>
            </>
          )}
          {/* Mostrando QR de evento */}
          <p className="text-center font-leagueGothic text-2xl md:text-4xl ">
            QR de asistencia
          </p>
          <div className="bg-OrangeMedium rounded w-64 m-auto p-4 relative group">
            <button
              type="button"
              onClick={() => downloadQRCode({ id: "QRGenerated" })}
              className="w-full h-full bg-white opacity-40 absolute top-0 left-0 rounded hidden group-hover:block"
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

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-blueDark text-white py-1 px-4 rounded absolute bottom-0 right-0"
          >
            Editar evento
          </button>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div
            className={`fixed top-0 left-0 w-full h-svh flex z-10 backdrop-blur-sm`}
          >
            <div
              ref={ModalRef}
              className="bg-white mt-24 mx-auto w-11/12 md:w-2/3 h-fit p-8 rounded shadow-lg relative"
            >
              <EditEvento
                closeModal={() => setIsModalOpen(false)}
                eventoData={Data}
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
