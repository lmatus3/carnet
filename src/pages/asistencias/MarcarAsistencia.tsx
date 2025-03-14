import { useParams } from "react-router";
import { MainLayout } from "../../layouts/MainLayout";
import { eventoInterface } from "../../types/eventoType";
import { useEffect, useState } from "react";
import { getEstadoName } from "../../utils/getEstadoName";
import { EstadoBadge } from "../../components/EstadoBadge";
import { GetEvento } from "../../service/EventosService";
import { useModalControls } from "../../hooks/useModalControls";
import { OptionType, SelectField } from "../../components/SelectField";
import { GetPerfiles } from "../../service/GetCatalogsInfo";
import { toast } from "sonner";
import {
  GetPuedeMarcarAsistencia,
  PostAsistencia,
} from "../../service/AsistenciaService";
import { useUIStore } from "../../stores/UIStore";
import { GetUserInfo } from "../../service/GetUserInfo";
import { useSessionStore } from "../../stores";

type UserDataType = { code: string; type: string; typeId: string };

export const MarcarAsistencia = () => {
  const { id } = useParams();
  const [SelectedPerfil, setSelectedPerfil] = useState("");
  const [CATPerfiles, setCATPerfiles] = useState<OptionType[]>([]);
  const [FechaInicio, setFechaInicio] = useState<string>();
  const [FechaFin, setFechaFin] = useState<string>();
  const [HoraInicio, setHoraInicio] = useState<string>();
  const [HoraFin, setHoraFin] = useState<string>();
  const [Data, setData] = useState<eventoInterface>();
  const [userData, setUserData] = useState<UserDataType[]>([]);
  const [puedeMarcar, setPuedeMarcar] = useState<boolean>(true);
  const SetLoading = useUIStore((state) => state.SetLoading);
  const onLogout = useSessionStore((state) => state.onLogout);
  const [blockSubmit, setBlockSubmit] = useState(false);
  const loading = useUIStore((state) => state.loading);

  // Obtener catalogo y evento
  const getCatalogs = async () => {
    const EventoPromise = GetEvento(id as string);
    const PerfilesPromise = GetPerfiles();
    const UserInfoPromise = GetUserInfo();
    const PuedeMarcarPromise = GetPuedeMarcarAsistencia(id as string);
    SetLoading(true);
    Promise.all([
      EventoPromise,
      PerfilesPromise,
      UserInfoPromise,
      PuedeMarcarPromise,
    ])
      .then((responses) => {
        if (responses[0].ok && responses[0].data) {
          const { Evento } = responses[0].data.data;
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
            EventoPublicoObjetivo: Evento.EventoPublicoObjetivo
          });
          setFechaInicio(Evento.fechaInicio.split("T")[0]);
            setHoraInicio(Evento.fechaInicio.split("T")[1].split("-")[0]);
            if (Evento.fechaFin) {
              setFechaFin(Evento.fechaFin.split("T")[0]);
              setHoraFin(Evento.fechaFin.split("T")[1].split("-")[0]);
            }
          toast.info("Datos de evento cargados exitosamente");
        }
        let tempPerfiles: OptionType[] = [];
        if (responses[1].ok && responses[1].data) {
          const { Perfiles } = responses[1].data.data;
          const CatPerfilesDb: OptionType[] = Perfiles.map((perfil) => {
            return {
              value: `${perfil.id}`,
              name: perfil.nombre,
            };
          });
          tempPerfiles = CatPerfilesDb;
        }
        // ! Acá se asignan los perfiles disponibles para el usuario
        if (responses[2].ok && responses[2].data) {
          // console.log(response.data);
          const { data } = responses[2].data;
          const { administrativo, docente, estudiante, directivo } = data.informacion;
          const newCarnetsCodes: UserDataType[] = [];
          //* Casos de carnet
          //? Caso de estudiante
          if (estudiante.length > 0) {
            // Significa que tengo datos de estudiantes
            //? Si el estudiante está activo
            //* Nueva lógica
            const estaExpulsado = estudiante.find(
              (est) => est.estado === "Expulsado"
            );
            if (estaExpulsado) {
              // ? Caso negativo
              tempPerfiles = tempPerfiles.filter((item) => item.value != "1");
            } else {
              const estaActivo = estudiante.find(
                (est) => est.estado === "Activo"
              );
              if (estaActivo) {
                const carnet = {
                  code: estaActivo.estudianteCarne,
                  type: "Estudiante",
                  typeId: "1",
                };
                newCarnetsCodes.push(carnet);
              } else {
                // ? Caso negativo
                tempPerfiles = tempPerfiles.filter((item) => item.value != "1");
              }
            }
            // console.log(estaActivo);
            // (estudiante as estudianteInterface[]).map((datosEstudiante) => {
            //   //! La validación es basada en el estado de este estudiante para la carrera actual del mismo
            //   if (
            //     datosEstudiante.estado == "Expulsado" ||
            //     // datosEstudiante.estado == "Retirado" ||
            //     // datosEstudiante.estado == "Inactivo" ||
            //     datosEstudiante.estado == "Graduado"
            //   ) {
            //     // ? Caso negativo
            //     // Si está en uno de estos estados no puede asistir como estudiante
            //     tempPerfiles = tempPerfiles.filter((item) => item.value != "1");
            //   } else {
            //     // * Aqui se asignan los datos del estudiante
            //     // console.log(periodoProcesado)
            //     const carnet = {
            //       code: datosEstudiante.estudianteCarne,
            //       type: "Estudiante",
            //       typeId: "1",
            //     };
            //     newCarnetsCodes.push(carnet);
            //   }
            // });
          } else {
            tempPerfiles = tempPerfiles.filter((item) => item.value != "1");
          }
          //? Caso de administrativo
          if (administrativo.length > 0) {
            const datosAdministrativo = administrativo[0];
            if (
              datosAdministrativo.estatus === "1" &&
              datosAdministrativo.fechabaja === null
            ) {
              // Caso carnet valido
              const carnet = {
                code: datosAdministrativo.no_emple,
                type: "Administrativo",
                typeId: "3",
              };
              newCarnetsCodes.push(carnet);
            }
          } else {
            tempPerfiles = tempPerfiles.filter((item) => item.value != "3");
          }
          //? Caso de docente
          if (docente.length > 0) {
            const datosDocente = docente[0];
            const carnet = {
              code: datosDocente.iddocente,
              type: "Docente",
              typeId: "2",
            };
            newCarnetsCodes.push(carnet);
          } else {
            tempPerfiles = tempPerfiles.filter((item) => item.value != "2");
          }
          if(directivo && directivo.length === 0){
            // ! asumiendo que directivo será el perfil 4
            tempPerfiles = tempPerfiles.filter((item) => item.value != "4");
          }
          setUserData(newCarnetsCodes);
          // TODO Mostrar sólo los perfiles que estén disponibles con los del usuario
          setCATPerfiles(tempPerfiles);
        } else {
          // Manejando acceso no autorizado
          if (responses[2].status === 401) {
            toast.error(
              "Su sesión no es valida, por favor inicie sesión nuevamente"
            );
            onLogout();
          } else {
            // Manejando errores distintos
            toast.info(
              responses[2].error ||
                "No se logró obtener los datos necesarios para registrar su asistencia",
              { duration: 100000 }
            );
          }
        }
        if (responses[3].ok && responses[3].data) {
          const { data } = responses[3].data;
          setPuedeMarcar(data.estado);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => SetLoading(false));
  };
  const handleSendAsistencia = async (ev: React.FormEvent) => {
    ev.preventDefault();
    // Validando selección de perfil
    if (SelectedPerfil.length === 0) {
      toast.error("Por favor, seleccione el perfil con el que asistirá");
      return;
    }
    // Buscando el carnet según el perfil seleccionado
    const carnetNum = userData.find((data) => data.typeId == SelectedPerfil);
    if (!Data) {
      toast.error("No se tienen los datos necesarios para marcar asistencia");
      return;
    }
    // Validando la existencia del evento
    if (!carnetNum) {
      toast.error(
        "Usted no puede participar con el perfil seleccionado al evento"
      );
      return;
    }
    // ! Aca se tendra que enviar correo ahora
    setBlockSubmit(true);
    SetLoading(true);
    const response = await PostAsistencia({
      eventoId: Data.id,
      perfilId: SelectedPerfil,
      codigo: `${carnetNum.code}`,
    });
    if (response.ok) {
      toast.success("Asistencia registrada", { duration: 10000 });
      setIsModalOpen(false);
      setBlockSubmit(false);
      SetLoading(false);
    } else {
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.error("No se logró registrar asistencia");
      }
      setBlockSubmit(false);
      SetLoading(false);
    }
  };

  useEffect(() => {
    // Cuando se tenga actualizada la bd se obtendrán los catálogos
    getCatalogs();
  }, []);
  useEffect(() => {
    if (!puedeMarcar) {
      toast.info("Usted ya tiene registrada una asistencia a este evento", {
        duration: 10000,
      });
    }
  }, [puedeMarcar]);

  // Modal
  // Controles del modal de las acciones
  const { ModalRef, isModalOpen, setIsModalOpen } = useModalControls();
  return (
    <MainLayout>
      <div className="bg-white w-11/12 md:w-2/3 m-auto mt-8 rounded p-4 md:pb-14 relative">
        <div></div>
        {loading ? (
          <div>Cargando...</div>
        ) : Data ? (
          <div>
            <h1 className="text-2xl md:text-4xl font-leagueGothic">
              Evento código: {Data.codigo}
            </h1>
            <div className="mt-2 relative mb-20 md:mb-0">
              <div className="flex justify-between">
                <h2 className="text-xl md:text-2xl">{Data.nombre}</h2>
                <span>
                  <EstadoBadge estado={getEstadoName(Data.estadoId)} />
                </span>
              </div>
              <hr className="border-blueDark my-1" />
              <span className="block font-bold text-xl">
                Descripción del evento
              </span>
              <p>{Data.descripcion}</p>
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
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-green-700 text-white py-1 px-4 rounded absolute bottom-4 right-4 flex disabled:opacity-80 disabled:cursor-not-allowed"
              disabled={!puedeMarcar}
            >
              <span>
                {" "}
                {puedeMarcar ? "Marcar asistencia" : "Asistencia registrada"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white h-6"
                viewBox="0 -960 960 960"
              >
                <path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
              </svg>
            </button>
          </div>
        ) : (
          <div>No se logró cargar los datos de este evento </div>
        )}

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
                ¿Confirmar asistencia?
              </h1>
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
                onSubmit={handleSendAsistencia}
                className="flex flex-col gap-2"
              >
                <label htmlFor="estadoId">
                  <p className="text-sm font-bold">
                    Seleccione perfil con el que asistirá
                  </p>
                  <SelectField
                    id="SelectedPerfil"
                    name="SelectedPerfil"
                    options={CATPerfiles}
                    cx="w-full"
                    selectMessage="Seleccione una opción"
                    value={SelectedPerfil as string}
                    onChange={(ev) => setSelectedPerfil(ev.target.value)}
                  />
                </label>
                <div className="md:col-span-2 flex justify-around">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-blueDark bg-white border w-28 py-1 rounded shadow"
                  >
                    No confirmar
                  </button>
                  <button
                    type="submit"
                    disabled={blockSubmit}
                    className="bg-blueDark text-white w-28 py-1 rounded shadow disabled:opacity-50"
                  >
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
