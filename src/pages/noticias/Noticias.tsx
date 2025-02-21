import { useModalControls } from "../../hooks/useModalControls";
import { MainLayout } from "../../layouts/MainLayout";
import { RegistrarNoticia } from "./RegistrarNoticia";
// import { GetNoticias, GetValidUsers } from "../../service/NoticiasService";
// import { toast } from "sonner";

export const Noticias = () => {
  // TODO
  // ? Acá se podría usar un endpoint que tenga dos funciones
  // ? 1. Obtener las noticias
  // ? 2. En base al token retornar si el usuario puede administrar o no las noticias

  // Obtener los correos validos para administrar noticias y evaluar con el usuario actual
  // const GetCatalogs = () => {
  //   const noticias = GetNoticias();
  //   const correosValidos = GetValidUsers();
  //   Promise.all([noticias, correosValidos]).then((values) => {
  //     if (values[0].ok) {
  //       toast.info("Datos de noticias cargados correctamente");
  //     }
  //     if (values[1].ok) {
  //       toast.info(
  //         "Correos de administración de noticias cargados correctamente"
  //       );
  //     }
  //   });
  // };
  // Controles del modal de las acciones
  const { ModalRef, isModalOpen, setIsModalOpen } = useModalControls({
    // Evitando que se cierre el modal al hacer click afuera (Esto elimina la activación de fn si se pasa)
    allowCloseOnClickOutside: false,
  });
  const {
    ModalRef: ModalRef2,
    isModalOpen: isModalOpen2,
    setIsModalOpen: setIsModalOpen2,
  } = useModalControls();

  return (
    <MainLayout>
      <>
        <div className="text-center flex flex-col">
          <h1 className="text-h2 text-white m-auto my-2 font-leagueGothic md:text-h1">
            Sección de noticias
          </h1>
          <div className="bg-white flex flex-col gap-2 m-auto p-4 rounded-lg w-11/12 relative md:w-3/4">
            {/* Este botón redirige a la administración de noticias */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blueDark rounded-md p-1  absolute top-2 right-2 transition-all duration-150 hover:bg-blueSemiDark"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 fill-white"
                viewBox="0 -960 960 960"
              >
                <path d="M433-80q-27 0-46.5-18T363-142l-9-66q-13-5-24.5-12T307-235l-62 26q-25 11-50 2t-39-32l-47-82q-14-23-8-49t27-43l53-40q-1-7-1-13.5v-27q0-6.5 1-13.5l-53-40q-21-17-27-43t8-49l47-82q14-23 39-32t50 2l62 26q11-8 23-15t24-12l9-66q4-26 23.5-44t46.5-18h94q27 0 46.5 18t23.5 44l9 66q13 5 24.5 12t22.5 15l62-26q25-11 50-2t39 32l47 82q14 23 8 49t-27 43l-53 40q1 7 1 13.5v27q0 6.5-2 13.5l53 40q21 17 27 43t-8 49l-48 82q-14 23-39 32t-50-2l-60-26q-11 8-23 15t-24 12l-9 66q-4 26-23.5 44T527-80h-94Zm7-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
              </svg>
            </button>
            Acá irán las noticias
          </div>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div
            className={`fixed top-0 left-0 w-full h-svh flex z-10 backdrop-blur-sm`}
          >
            <div
              ref={ModalRef}
              className="bg-white mt-24 mx-auto w-full md:w-11/12 h-fit p-8 rounded shadow-lg relative"
            >
              <div className="flex justify-between">
                <h1 className="font-leagueGothic text-2xl md:text-4xl">
                  Administración de noticias
                </h1>
                <button
                  title="Registrar nueva noticia"
                  onClick={() => setIsModalOpen2(true)}
                  type="button"
                  className="mr-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 rounded hover:bg-black hover:fill-white duration-150 transition-all"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
                  </svg>
                </button>
              </div>
              <div>
                <span>
                  En esta interfaz puede crear, editar o eliminar noticias de
                  Carnet UNICA.
                </span>
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
              tbd
            </div>
          </div>
        )}
        {isModalOpen2 && (
          <div
            className={`fixed top-0 left-0 w-full h-svh flex z-10 backdrop-blur-sm text-white overflow-auto `}
          >
            <div
              ref={ModalRef2}
              className="bg-blueDark my-10 mx-auto w-full md:w-8/12 h-fit p-8 rounded shadow-lg relative"
            >
              <div className="flex justify-between mb-2">
                <h1 className="font-leagueGothic text-2xl md:text-4xl">
                  Registrar nueva noticia
                </h1>
              </div>
              <button
                onClick={() => setIsModalOpen2(false)}
                className="absolute right-6 top-4 opacity-70 transition-all duration-150 bg-white rounded hover:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8"
                  viewBox="0 -960 960 960"
                >
                  <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
                </svg>
              </button>
              <RegistrarNoticia />
            </div>
          </div>
        )}
      </>
    </MainLayout>
  );
};
