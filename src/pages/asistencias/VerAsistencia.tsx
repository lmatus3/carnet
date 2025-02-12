import { useNavigate, useParams } from "react-router";
import { MainLayout } from "../../layouts/MainLayout";
import { useEffect, useRef, useState } from "react";
import { GetEvento } from "../../service/EventosService";
import { eventoInterface } from "../../types/eventoType";
import { toast } from "sonner";
import { GetAsistencias } from "../../service/AsistenciaService";
import {
  asistenciasDBInterface,
  asistenciasReporteInterface,
} from "../../types/asistenciaType";
import { exportToExcel } from "../../utils/exportToExcel";
import { usePrint } from "../../plugins/print";
import { EstadoBadge } from "../../components/EstadoBadge";
import { getEstadoName } from "../../utils/getEstadoName";
import { useModalControls } from "../../hooks/useModalControls";

export const VerAsistencia = () => {
  const { id } = useParams();
  const [Data, setData] = useState<eventoInterface>();
  const [Asistencias, setAsistencias] = useState<asistenciasDBInterface[]>([]);
  const [AsistenciaReportData, setAsistenciaReportData] = useState<
    asistenciasReporteInterface[]
  >([]);
  const [asistenciaCargando, setAsistenciaCargando] = useState(true);
  const [FechaInicio, setFechaInicio] = useState<string>();
  const [FechaFin, setFechaFin] = useState<string>();
  const [HoraInicio, setHoraInicio] = useState<string>();
  const [HoraFin, setHoraFin] = useState<string>();
  const navegar = useNavigate();

  const MostrarMensajeError = (duration: number) => {
    toast.error("No se logró obtener datos del evento", {
      duration,
    });
  };
  const getEventoInfo = async (idEvento: string) => {
    const response = await GetEvento(idEvento);
    if (response.ok && response.data) {
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
          creadoEl: Evento.creadoEl,
        });
        setFechaInicio(Evento.fechaInicio.split(" ")[0]);
        setHoraInicio(Evento.fechaInicio.split(" ")[1].split(".")[0]);
        if (Evento.fechaFin) {
          setFechaFin(Evento.fechaFin.split(" ")[0]);
          setHoraFin(Evento.fechaFin.split(" ")[1].split(".")[0]);
        }
        toast.info("Datos de evento cargados exitosamente");
        return;
      }
    }
    MostrarMensajeError(10000);
  };

  const getAsistenciaEvento = async (idEvento: string) => {
    const response = await GetAsistencias(idEvento);
    if (response.ok && response.data) {
      const { EventoAsistencias } = response.data.data;
      // console.log(EventoAsistencias);
      setAsistencias(EventoAsistencias);
      const tempReportasistencias: asistenciasReporteInterface[] =
        EventoAsistencias.map((Asistencia) => {
          return {
            id: Asistencia.id,
            EventoID: Asistencia.Evento.codigo || "N/A",
            EventoNombre: Asistencia.Evento.nombre || "N/A",
            Codigo: Asistencia.codigo,
            Nombre: Asistencia.nombre,
            TipoAsistencia: Asistencia.Perfil.nombre,
            EstadoId: Asistencia.Estado.nombre,
            Carrera: Asistencia.carrera ? Asistencia.carrera : "N/A",
            Sexo: Asistencia.sexo == "1" ? "Femenino" : "Masculino",
            CreadoPor: Asistencia.creadoPor,
          };
        });
      setAsistenciaReportData(tempReportasistencias);
      setAsistenciaCargando(false);
      return;
    }
    setAsistenciaCargando(false);
    toast.error(
      "No se logró obtener la asistencia de este evento, por favor, recargue la página",
      { duration: 10000 }
    );
  };

  const handleParamsChange = () => {
    console.log("Generando reporte");
  };
  useEffect(() => {
    if (id) {
      getEventoInfo(id);
      getAsistenciaEvento(id);
    } else {
      toast.info("La url es inválida");
      navegar("/");
    }
  }, []);

  // Imprimir
  // Ref a div
  const contentRef = useRef<HTMLTableElement>(null);
  const { printNode } = usePrint(contentRef);
  // Controles del modal de las acciones
  const { ModalRef, isModalOpen, setIsModalOpen } = useModalControls();
  return (
    <MainLayout>
      <>
        <div className="bg-white rounded my-8 mx-2 md:mx-auto p-2 md:w-3/4 ">
          {Data && Asistencias ? (
            <div>
              {/* Datos de evento */}
              <div>
                <h1 className="text-2xl md:text-4xl font-leagueGothic">
                  Código de evento: {Data.codigo}
                </h1>
              </div>
              <div className="flex justify-between">
                <h2 className="text-xl md:text-2xl">{Data.nombre}</h2>
                <span>
                  <EstadoBadge estado={getEstadoName(Data.estadoId)} />
                </span>
              </div>
              <hr className="my-1" />
              {/* Tabla de asistencias */}
              <div className="overflow-x-auto my-2 relative">
                <div className="flex w-full gap-2 justify-between">
                  <div>
                    <span className="block font-bold text-xl">
                      Descripción del evento
                    </span>
                    <p>{Data.descripcion}</p>
                    {Data.fechaFin && Data.fechaInicio ? (
                      <>
                        <span className="block font-bold text-xl">
                          Programación
                        </span>
                        <p>
                          El evento se programó a empezar el día: {FechaInicio}{" "}
                          a las <b>{HoraInicio}</b>
                        </p>
                        <p>
                          Y <b>concluir</b> el día: {FechaFin} a las{" "}
                          <b>{HoraFin}</b>
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="block font-bold text-xl">
                          Fecha y hora de inicio
                        </span>
                        <p>
                          El evento se programó a empezar el día: {FechaInicio}{" "}
                          a las <b>{HoraInicio}</b>
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {/* <button
                      onClick={() => setIsModalOpen(true)}
                      className="border rounded h-8 w-32 bg-red-700 text-white"
                    >
                      Armar reporte
                    </button> */}
                    <button
                      title="Exportar a excel"
                      className="border rounded h-8 w-20 bg-green-700 text-white"
                      onClick={() => {
                        exportToExcel(
                          AsistenciaReportData,
                          "Asistencia-evento-" + Data.codigo
                        );
                      }}
                    >
                      Excel
                    </button>
                    <button
                      title="Exportar a PDF"
                      className="border rounded h-8 w-20"
                      onClick={() => printNode()}
                    >
                      Imprimir
                    </button>
                  </div>
                </div>
                <table
                  ref={contentRef}
                  className="table w-11/12 m-auto mt-6 print:mt-4 mb-5"
                >
                  <caption className="font-bold">
                    Asistencia de {Data.nombre}{" "}
                  </caption>
                  <thead className="table-header-group">
                    <tr className="table-row">
                      <th className="border">#</th>
                      <th className="border">Carnet</th>
                      <th className="border">Nombre</th>
                      <th className="border">Tipo carnet</th>
                      <th className="border">Fecha y hora</th>
                    </tr>
                  </thead>
                  <tbody className="text-center table-row-group">
                    {asistenciaCargando && Asistencias.length === 0 && (
                      <tr>
                        <td colSpan={5}>Cargando...</td>
                      </tr>
                    )}
                    {asistenciaCargando === false && Asistencias.length === 0 && (
                      <tr>
                        <td colSpan={5}>No se logró cargar la asistencia del evento, por favor recargue la página</td>
                      </tr>
                    )}
                    {Asistencias.map((item, i) => (
                      <tr key={i} className={`table-row print:mb-4 `}>
                        <td className="border break-inside-avoid">{i + 1}</td>
                        {/* En un futuro se debe de pode traer el carnet y el nombre */}
                        <td className="border break-inside-avoid">
                          {item.codigo || "N/A"}
                        </td>
                        <td className="border break-inside-avoid">
                          {item.nombre}
                        </td>
                        <td className="border break-inside-avoid">
                          {item.Perfil.nombre}
                        </td>
                        <td className="border break-inside-avoid">
                          {item.creadoEl.replace("T", " ").split(".")[0]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <h1 className="font-leagueGothic text-2xl">Cargando...</h1>
            </div>
          )}
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div
            className={`fixed top-0 left-0 w-full h-svh flex z-10 backdrop-blur-sm`}
          >
            <div
              ref={ModalRef}
              className="bg-white mt-24 mx-auto w-[400px] h-fit p-8 rounded shadow-lg relative"
            >
              <h1 className="font-leagueGothic text-2xl md:text-4xl">
                Armar reporte
              </h1>
              <div>
                <span>Seleccione los campos por agregar al reporte</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-4 opacity-70 transition-all duration-150 hover:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8"
                  viewBox="0 -960 960 960"
                >
                  <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
                </svg>
              </button>
              <form
                onSubmit={handleParamsChange}
                className="flex flex-col gap-2"
              >
                <div className="md:col-span-2 flex justify-around">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-blueDark bg-white border w-28 py-1 rounded shadow"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="bg-blueDark text-white w-28 py-1 rounded shadow disabled:opacity-50"
                  >
                    Generar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    </MainLayout>
  );
};