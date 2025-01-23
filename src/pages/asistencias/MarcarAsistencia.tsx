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

export const MarcarAsistencia = () => {
  const { id } = useParams();
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
  const [SelectedPerfil, setSelectedPerfil] = useState("");
  const [CATPerfiles, setCATPerfiles] = useState<OptionType[]>([]);

  // Obtener catalogo y evento
  const getCatalogs = async () => {
    const EventoPromise = GetEvento(id as string);
    const PerfilesPromise = GetPerfiles();
    Promise.all([EventoPromise, PerfilesPromise]).then((responses) => {
      if (responses[0].ok && responses[0].data) {
        const { data } = responses[0].data;
        setData(data as eventoInterface);
      }
      if (responses[1].ok && responses[1].data) {
        const { data } = responses[1].data;
        const CatPerfilesDb = data.map((perfil) => {
          return {
            value: perfil.id,
            name: perfil.name,
          };
        });
        setCATPerfiles(CatPerfilesDb);
      }
    });
  };
  const handleSendAsistencia = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (SelectedPerfil.length === 0) {
      toast.error("Por favor, seleccione el perfil con el que asistirá");
      return;
    }
    toast.success("Asistencia registrada")
  };
  const [Data, setData] = useState<eventoInterface>(FakeData);
  useEffect(() => {
    // Cuando se tenga actualizada la bd se obtendrán los catálogos
    // getCatalogs()
  }, []);

  // Modal
  // Controles del modal de las acciones
  const { ModalRef, isModalOpen, setIsModalOpen } = useModalControls();
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
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-green-700 text-white py-1 px-4 rounded absolute bottom-0 right-0 flex"
          >
            <span>Marcar asistencia</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-white h-6"
              viewBox="0 -960 960 960"
            >
              <path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
            </svg>
          </button>
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
                    className="bg-blueDark text-white w-28 py-1 rounded shadow"
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
