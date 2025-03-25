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
import { usePrint } from "../../plugins/print";
import { EstadoBadge } from "../../components/EstadoBadge";
import { getEstadoName } from "../../utils/getEstadoName";
import { useModalControls } from "../../hooks/useModalControls";
import { useSessionStore } from "../../stores";
import { validateResponseError } from "../../utils/validateResponseError";
import { DetallesDeEvento } from "../../components/Eventos/DetallesDeEvento";
import { ExportButtons } from "../../components/Eventos/ExportButtons";
import { TablaAsistenciasTotales } from "../../components/Eventos/TablaAsistenciasTotales";

export const VerAsistencia = () => {
  const { id } = useParams();
  const [Data, setData] = useState<eventoInterface>();
  const [Asistencias, setAsistencias] = useState<asistenciasDBInterface[]>([]);
  const [AsistenciaReportData, setAsistenciaReportData] = useState<
    asistenciasReporteInterface[]
  >([]);
  const [asistenciaCargando, setAsistenciaCargando] = useState(true);
  const [errorCargandoAsistencias, setErrorCargandoAsistencias] =
    useState(false);
  const [FechaInicio, setFechaInicio] = useState<string>();
  const [FechaFin, setFechaFin] = useState<string>();
  const [HoraInicio, setHoraInicio] = useState<string>();
  const [HoraFin, setHoraFin] = useState<string>();
  // Estados para manejar las totalizaciones de asistencias
  const filtrosAsistenciasInicial = {
    hombres: 0,
    mujeres: 0,
    otro: 0,
    total: 0,
  };
  const [totalAsistencias, setTotalAsistencias] = useState(
    filtrosAsistenciasInicial
  );
  const [totalDocentes, setTotalDocentes] = useState(filtrosAsistenciasInicial);
  const [totalEstudiantes, setTotalEstudiantes] = useState(
    filtrosAsistenciasInicial
  );
  const [totalAdministrativos, setTotalAdministrativos] = useState(
    filtrosAsistenciasInicial
  );
  const [totalDirectivos, setTotalDirectivos] = useState(
    filtrosAsistenciasInicial
  );

  const onLogout = useSessionStore((state) => state.onLogout);
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
          EventoPublicoObjetivo: Evento.EventoPublicoObjetivo,
        });
        setFechaInicio(Evento.fechaInicio.split("T")[0]);
        setHoraInicio(Evento.fechaInicio.split("T")[1].split("-")[0]);
        if (Evento.fechaFin) {
          setFechaFin(Evento.fechaFin.split("T")[0]);
          setHoraFin(Evento.fechaFin.split("T")[1].split("-")[0]);
        }
        toast.info("Datos de evento cargados exitosamente");
        return;
      }
    }
    if (response.status == 401 || response.status == 404) {
      validateResponseError(response.status, onLogout);
      return;
    }
    MostrarMensajeError(10000);
  };

  const getAsistenciaEvento = async (idEvento: string) => {
    setErrorCargandoAsistencias(false);
    const response = await GetAsistencias(idEvento);
    if (response.ok && response.data) {
      const { EventoAsistencias } = response.data.data;
      // Llenando totalización de asistencias
      setAsistencias(EventoAsistencias);
      const asistenciasTotales = {
        hombres: 0,
        mujeres: 0,
        otro: 0,
        total: 0,
      };
      const asistenciasEstudiantes = {
        hombres: 0,
        mujeres: 0,
        otro: 0,
        total: 0,
      };
      const asistenciasDocentes = {
        hombres: 0,
        mujeres: 0,
        otro: 0,
        total: 0,
      };
      const asistenciasAdministrativos = {
        hombres: 0,
        mujeres: 0,
        otro: 0,
        total: 0,
      };
      const asistenciasDirectivos = {
        hombres: 0,
        mujeres: 0,
        otro: 0,
        total: 0,
      };
      const tempReportasistencias: asistenciasReporteInterface[] =
        EventoAsistencias.map((Asistencia) => {
          // Llenando totalizaciones
          const nombrePerfil = Asistencia.Perfil.nombre;
          const sexo = Asistencia.sexo;
          asistenciasTotales.total++;
          // if (sexo) {
          //   if (sexo === "1") {
          //     // asistenciasTotales.hombres++;
          //   } else {
          //     // asistenciasTotales.mujeres++;
          //   }
          // } else {
          //   // asistenciasTotales.otro++;
          // }
          if (nombrePerfil) {
            switch (nombrePerfil) {
              case "Estudiante":
                asistenciasEstudiantes.total++;
                if (sexo) {
                  if (sexo === "0") {
                    asistenciasEstudiantes.hombres++;
                    asistenciasTotales.hombres++;
                  } else {
                    asistenciasEstudiantes.mujeres++;
                    asistenciasTotales.mujeres++;
                  }
                } else {
                  asistenciasEstudiantes.otro++;
                  asistenciasTotales.otro++;
                }
                break;
              case "Administrativo":
                asistenciasAdministrativos.total++;
                if (sexo) {
                  if (sexo === "1") {
                    asistenciasAdministrativos.hombres++;
                    asistenciasTotales.hombres++;
                  } else {
                    asistenciasAdministrativos.mujeres++;
                    asistenciasTotales.mujeres++;
                  }
                } else {
                  asistenciasAdministrativos.otro++;
                  asistenciasTotales.otro++;
                }
                break;
              case "Docente":
                asistenciasDocentes.total++;
                // console.log("El sexo del docente es " + sexo);
                if (String(sexo) == "false" || String(sexo) == "true") {
                  if (String(sexo) == "false") {
                    asistenciasDocentes.hombres++;
                    asistenciasTotales.hombres++;
                  } else {
                    asistenciasDocentes.mujeres++;
                    asistenciasTotales.mujeres++;
                  }
                } else {
                  asistenciasDocentes.otro++;
                  asistenciasTotales.otro++;
                }
                break;
              case "Directivo":
                asistenciasDirectivos.total++;
                if (sexo) {
                  if (sexo === "1") {
                    asistenciasDirectivos.hombres++;
                    asistenciasTotales.hombres++;
                  } else {
                    asistenciasDirectivos.mujeres++;
                    asistenciasTotales.mujeres++;
                  }
                } else {
                  asistenciasDirectivos.otro++;
                  asistenciasTotales.otro++;
                }
                break;
            }
          }
          return {
            id: Asistencia.id,
            EventoID: Asistencia.Evento.codigo || "N/A",
            EventoNombre: Asistencia.Evento.nombre || "N/A",
            Codigo: Asistencia.codigo,
            Nombre: Asistencia.nombre,
            TipoAsistencia: Asistencia.Perfil.nombre,
            EstadoId: Asistencia.Estado.nombre,
            Carrera: Asistencia.carrera ? Asistencia.carrera : "N/A",
            Sexo:
              Asistencia.sexo === null
                ? "N/A"
                : Asistencia.Perfil.nombre == "Administrativo" ||
                  Asistencia.Perfil.nombre == "Directivo"
                ? Asistencia.sexo == "1"
                  ? "Hombre"
                  : "Mujer"
                : Asistencia.sexo == "0"
                ? "Hombre"
                : "Mujer",

            CreadoPor: Asistencia.creadoPor,
          };
        });
      setTotalAsistencias(asistenciasTotales);
      setTotalEstudiantes(asistenciasEstudiantes);
      setTotalDocentes(asistenciasDocentes);
      setTotalAdministrativos(asistenciasAdministrativos);
      setTotalDirectivos(asistenciasDirectivos);
      setAsistenciaReportData(tempReportasistencias);
      setAsistenciaCargando(false);
      return;
    }
    // Estableciendo error en la obtención de asistencias
    setErrorCargandoAsistencias(true);
    // Deteniendo estado de carga de asistencias
    setAsistenciaCargando(false);
    // Mensaje de error
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

  // Imprimir
  // Ref a div
  const contentRefTablaTotales = useRef<HTMLTableElement>(null);
  // const { printNode: printNodeTotales } = usePrint(contentRefTablaTotales);
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
                  <DetallesDeEvento
                    FechaInicio={FechaInicio as string}
                    HoraInicio={HoraInicio as string}
                    FechaFin={FechaFin && (FechaFin as string)}
                    HoraFin={HoraFin && (HoraFin as string)}
                    descripcion={Data.descripcion}
                  />

                  <ExportButtons
                    data={AsistenciaReportData}
                    name={Data.nombre}
                    printFn={printNode}
                  />
                </div>
                {/* Tabla de totales */}
                <TablaAsistenciasTotales
                  asistenciaCargando={asistenciaCargando}
                  contentRefTablaTotales={contentRefTablaTotales}
                  errorCargandoAsistencias={errorCargandoAsistencias}
                  seTienenRegistros={Asistencias.length > 0}
                  totalAdministrativos={totalAdministrativos}
                  totalAsistencias={totalAsistencias}
                  totalDirectivos={totalDirectivos}
                  totalDocentes={totalDocentes}
                  totalEstudiantes={totalEstudiantes}
                  nombreEvento={"Asistencias totales " + Data.nombre}
                />

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
                  <tbody className="text-center table-row-group border">
                    {asistenciaCargando && Asistencias.length === 0 && (
                      <tr>
                        <td colSpan={5}>Cargando...</td>
                      </tr>
                    )}
                    {asistenciaCargando === false &&
                      Asistencias.length === 0 &&
                      errorCargandoAsistencias === true && (
                        <tr>
                          <td colSpan={5}>
                            No se logró cargar la asistencia del evento, por
                            favor recargue la página
                          </td>
                        </tr>
                      )}
                    {asistenciaCargando === false &&
                      Asistencias.length === 0 &&
                      errorCargandoAsistencias === false && (
                        <tr>
                          <td colSpan={5}>
                            No se cuentan con asistencias en este evento
                          </td>
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
