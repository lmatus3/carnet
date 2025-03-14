import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useUIStore } from "../../stores/UIStore";
import { eventoInterface } from "../../types/eventoType";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { getTypeOfCarnet, isUserParamType } from "../../types/userTypes";
import { toast } from "sonner";
import { ValidateUserInfo } from "../../service/GetCarnetInfo";
import {
  EstadosEstudianteTypes,
  ValidarEstadoEstudianteActivo,
} from "../../types/estadoType";
import { GetEvento } from "../../service/EventosService";
import { useReactToPrint } from "react-to-print";
import { MainLayout } from "../../layouts/MainLayout";
import LogoAzul from "../../assets/imgs/logoAzul.png";
import { PostAsistencia } from "../../service/AsistenciaService";

interface tableDataInterface {
  carnet: string;
  nombres: string;
  tipo: string;
}

export const TomarAsistencia = () => {
  const { id } = useParams();
  const [carnetsLeidos, setCarnetsLeidos] = useState<tableDataInterface[]>([]);
  const [PauseScan, setPauseScan] = useState(false);
  const SetLoading = useUIStore((state) => state.SetLoading);
  const loading = useUIStore((state) => state.loading);
  const [loaderValidacion, setLoaderValidacion] = useState(false);

  // Datos de evento a renderizar
  const [Data, setData] = useState<eventoInterface>();

  const handleScan = async (result: IDetectedBarcode[]) => {
    setPauseScan(true);
    const temp = result[0];
    const { rawValue } = temp;
    const DatosEscaneo = rawValue.split("validar/")[1];
    // Obteniendo carnet y tipo
    const CarnetNum = DatosEscaneo.split("?tipo=")[0];
    const TipoParam = DatosEscaneo.split("?tipo=")[1];

    // console.log(CarnetNum, " de tipo ", CarnetTipo);
    // Validando tipo de carnet
    if (!isUserParamType(TipoParam)) {
      toast.error("Este carnet no es valido");
      return;
    }
    // Aca tengo el tipo segun bd
    const carnetTipo = getTypeOfCarnet(TipoParam);
    if (!carnetTipo) {
      toast.error("El carnet leído no tiene un formato valido");
      return;
    }
    const tempResults = [...carnetsLeidos];
    // Validando que no se haya repetido el numero
    if (tempResults.find((item) => item.carnet == CarnetNum)) {
      toast.info("Ya fue escaneado previamente");
      setTimeout(() => {
        setPauseScan(false);
      }, 2500);
      return;
    }
    // Consultando backend
    const DatosCarnet = await ValidarCarnet(carnetTipo.id, CarnetNum);
    if (!DatosCarnet) {
      toast.error("Error");
      return;
    }
    if (!Data) {
      toast.error(
        "No se tienen los datos del evento cargados, recargue la página"
      );
      return;
    }
    // Enviando asistencia a backend
    const response = await PostAsistencia({
      eventoId: `${Data.id}`,
      perfilId: `${DatosCarnet.type}`,
      codigo: `${DatosCarnet.numeroCarnet}`,
    });
    if (response.ok) {
      toast.success("Asistencia registrada");
      tempResults.push({
        carnet: CarnetNum,
        nombres: DatosCarnet?.nombre as string,
        tipo: TipoParam,
      });
      setCarnetsLeidos(tempResults);
      setTimeout(() => {
        setPauseScan(false);
      }, 100);
    } else {
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.error("No se logró registrar asistencia");
      }
    }
  };

  const ValidarCarnet = async (perfilType: number, carnet: string) => {
    setLoaderValidacion(true);
    const response = await ValidateUserInfo(carnet, perfilType);
    console.log(response);
    setLoaderValidacion(false);
    if (response.ok) {
      if (response.data) {
        try {
          const { data } = response.data;
          // Determinar el tipo de usuario
          // * Caso administrativo
          if (data.infoAdministrativo) {
            const datosAdministrativo = data.infoAdministrativo[0];
            if (
              datosAdministrativo.estatus === "1" &&
              datosAdministrativo.fechabaja === null
            ) {
              return {
                numeroCarnet: datosAdministrativo.no_emple,
                nombre: datosAdministrativo.nombres,
                type: 3,
              };
            }
            toast.info("El carnet " + carnet + " es invalido");
          }
          // * Caso estudiante
          if (data.infoEstudiante) {
            const datosEstudiante = data.infoEstudiante[0];
            if (
              ValidarEstadoEstudianteActivo(
                datosEstudiante.estado as EstadosEstudianteTypes
              )
            ) {
              return {
                numeroCarnet: datosEstudiante.estudianteCarne,
                nombre: datosEstudiante.nombreEstudiante,
                type: 1,
              };
            }
            toast.info("El carnet " + carnet + " es invalido");
          }
          // * Caso docente
          if (data.infoDocente) {
            const datosDocente = data.infoDocente[0];
            if (!datosDocente.fecha_fin) {
              return {
                numeroCarnet: datosDocente.iddocente,
                nombre:
                  datosDocente.nombre1 +
                  " " +
                  datosDocente.nombre2 +
                  " " +
                  datosDocente.apellido1 +
                  " " +
                  datosDocente.apellido2,
                type: 2,
              };
            }
            toast.info("El carnet " + carnet + " es invalido");
          }
          // * Caso directivo
          // TODO
        } catch (error) {
          console.log(error);
          toast.error("No se pudo obtener información de este carnet.");
        }
      } else {
        toast.error("No se obtuvo respuesta de este carnet.");
      }
    } else {
      if (response.error) {
        toast.error(response.error);
      }
    }
  };
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
              creadoPor: Evento.creadoPor,
              descripcion: Evento.descripcion,
              estadoId: Evento.estadoId,
              fechaFin: Evento.fechaFin,
              fechaInicio: Evento.fechaInicio,
              actualizadoEl: Evento.actualizadoEl,
              id: Evento.id,
              nombre: Evento.nombre,
              eventoTipoId: Evento.eventoTipoId,
              EventoPublicoObjetivo: Evento.EventoPublicoObjetivo
            });
            toast.info("Datos de evento cargados exitosamente");
          }
        } else {
          MostrarMensajeError(10000);
        }
      } else {
        MostrarMensajeError(10000);
      }
      SetLoading(false);
    }
  };
  //  Print
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: "@page { size: 8.3in 11.7in }",
  });

  useEffect(() => {
    getEventoInfo();
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col w-11/12  md:w-2/3 m-auto bg-yellow-50 my-4 rounded p-4 bg-white relative">
        {loaderValidacion && (
          <p className="absolute bottom-4 right-4 bg-white rounded px-4 py-1">
            Cargando...
          </p>
        )}
        {loading ? (
          <p>Cargando...</p>
        ) : Data ? (
          <>
            <div className="mx-auto">
              <h1 className="text-h1">Escaner de asistencia</h1>
            </div>
            <div className="mx-auto flex flex-col">
              <button
                onClick={() => setPauseScan((prev) => !prev)}
                className={`${
                  PauseScan ? " bg-BlueMedium " : " bg-red-600"
                } text-white p-2 mx-auto my-2`}
              >
                {PauseScan ? "Pausado" : "Escaneando"}
              </button>
              <div className="w-auto h-80 print:hidden ">
                <Scanner paused={PauseScan} onScan={handleScan} />
              </div>
            </div>
            {/* Este div es lo que se manda a imprimir */}
            <div
              ref={contentRef}
              className="text-wrap w-full mt-16 md:mt-80 flex flex-col bg-white relative print:mt-0 print:py-4"
            >
              <img
                src={LogoAzul}
                alt="logo UNICA"
                className="w-40 absolute left-2 top-4 hidden print:block"
              />
              {/* Header lista de asistencia */}
              <div className="flex">
                <h2 className="text-h2 m-auto text-center text-pretty w-[300px] md:w-[500px] print:w-[450px]">
                  Asistencia de {Data.nombre}
                </h2>
                <button
                  className="print:hidden mr-0 rounded-sm bg-GreenLight hover:bg-GreenPale p-1 transition-all"
                  type="button"
                  onClick={() => reactToPrintFn()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    viewBox="0 -960 960 960"
                    className="fill-black"
                  >
                    <path d="M320-120q-33 0-56.5-23.5T240-200v-80h-80q-33 0-56.5-23.5T80-360v-160q0-51 35-85.5t85-34.5h560q51 0 85.5 34.5T880-520v160q0 33-23.5 56.5T800-280h-80v80q0 33-23.5 56.5T640-120H320ZM160-360h80q0-33 23.5-56.5T320-440h320q33 0 56.5 23.5T720-360h80v-160q0-17-11.5-28.5T760-560H200q-17 0-28.5 11.5T160-520v160Zm480-280v-120H320v120h-80v-120q0-33 23.5-56.5T320-840h320q33 0 56.5 23.5T720-760v120h-80Zm80 180q17 0 28.5-11.5T760-500q0-17-11.5-28.5T720-540q-17 0-28.5 11.5T680-500q0 17 11.5 28.5T720-460Zm-80 260v-160H320v160h320ZM160-560h640-640Z" />
                  </svg>
                </button>
              </div>
              <table className="table w-11/12 m-auto print:mt-4 mb-5 ">
                <thead className="table-header-group">
                  <tr className="table-row">
                    <th className="border">#</th>
                    <th className="border">Carnet</th>
                    <th className="border">Nombre</th>
                    <th className="border">Tipo carnet</th>
                  </tr>
                </thead>
                <tbody className="text-center table-row-group">
                  {carnetsLeidos.map((scan, i) => (
                    <tr key={i} className={`table-row print:mb-4 `}>
                      <td className="border break-inside-avoid">{i + 1}</td>
                      <td className="border break-inside-avoid">
                        {scan.carnet}
                      </td>
                      <td className="border break-inside-avoid">
                        {scan.nombres}
                      </td>
                      <td className="border break-inside-avoid">{scan.tipo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>No se logró cargar la información de este evento</p>
        )}
      </div>
    </MainLayout>
  );
};
