import { ReactElement, useEffect, useRef, useState } from "react";
import { RichOutput } from "../../components/RichText/RichOutput";
import { tempNoticias } from "../../data/tempData";
import { useModalControls } from "../../hooks/useModalControls";
import { MainLayout } from "../../layouts/MainLayout";
import { RegistrarNoticia } from "./RegistrarNoticia";
import { toast } from "sonner";
import { noticiaInterface } from "../../types/noticiaType";
import { EstadosNoticiasBadge } from "../../components/Badges/EstadosNoticiasBadge";
import { SeveridadNoticiasBadge } from "../../components/Badges/SeveridadNoticiasBadge";
// import { GetNoticias, GetValidUsers } from "../../service/NoticiasService";
// import { toast } from "sonner";

export const Noticias = () => {
  const [cargandoNoticias, setCargandoNoticias] = useState(true);
  const [errorObteniendoNoticias, setErrorObteniendoNoticias] = useState(false);

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
  useEffect(() => {
    // Simulando backend
    setTimeout(() => {
      setCargandoNoticias(false);
    }, 5000);
  }, []);

  const [popupInfo, setPopupInfo] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string | ReactElement;
  }>({ visible: false, x: 0, y: 0, content: "" });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  // Popup
  const handleButtonClick = (
    noticia: noticiaInterface,
    button: HTMLButtonElement
  ) => {
    const rect = button.getBoundingClientRect();
    setPopupInfo({
      visible: true,
      x: rect.right + window.scrollX - 100,
      y: rect.top + window.scrollY + 30,
      content: (
        <div className="w-28" ref={popupRef}>
          <p className="">Acciones</p>
          <div className="text-sm flex flex-col gap-1">
            <button
              className="border-t text-start transition-all duration-100 hover:bg-slate-100 hover:rounded "
              onClick={() => {
                navigator.clipboard.writeText(noticia.id as string).then(() => {
                  toast.info("Id copiado a portapapeles");
                  closePopup();
                });
              }}
            >
              <p>Copiar Id</p>
            </button>
            <button
              className="text-start transition-all duration-100 hover:bg-slate-100 hover:rounded "
              onClick={closePopup}
            >
              <p>Cerrar</p>
            </button>
          </div>
        </div>
      ),
    });
  };
  // Referencia del contenedor del popup
  const popupRef = useRef<HTMLDivElement | null>(null);

  const closePopup = () => {
    setPopupInfo((prev) => ({ ...prev, visible: false }));
  };

  // Detectar clic fuera del popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closePopup();
      }
    };

    // Añadir el listener al documento
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el listener al desmontar
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <MainLayout>
      <>
        <div className="text-center flex flex-col pb-10">
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
            <div className="flex flex-col gap-2">
              {tempNoticias.map((noticia) => (
                <div
                  key={`noticia${noticia.id}`}
                  className={`rounded p-2 ${
                    noticia.severidadId === "1" &&
                    "border-black border bg-yellowLight  "
                  } ${
                    noticia.severidadId === "2" &&
                    "border-black border bg-OrangeMedium"
                  }
                  ${
                    noticia.severidadId === "3" &&
                    "border-black border bg-red-700 text-white"
                  }`}
                >
                  <h1 className="font-bold text-xl">{noticia.titulo}</h1>
                  <div className="h-auto w-full">
                    <RichOutput Texto={noticia.mensaje} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Edición de noticias */}
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
              <div className="overflow-auto">
                <table className="table w-11/12 m-auto mt-6 print:mt-4 mb-5">
                  <caption className="font-bold">Noticias</caption>
                  <thead className="table-header-group">
                    <tr className="table-row">
                      <th className="border">#</th>
                      <th className="border">Título</th>
                      <th className="border">Severidad</th>
                      <th className="border">Fecha de publicación</th>
                      <th className="border">Estado</th>
                      <th className="border">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="text-center table-row-group">
                    {cargandoNoticias && tempNoticias.length === 0 && (
                      <tr>
                        <td colSpan={6}>Cargando...</td>
                      </tr>
                    )}
                    {cargandoNoticias === false &&
                      tempNoticias.length === 0 &&
                      errorObteniendoNoticias === true && (
                        <tr>
                          <td colSpan={5}>No se logró cargar las noticias.</td>
                        </tr>
                      )}
                    {cargandoNoticias === false &&
                      tempNoticias.length === 0 &&
                      errorObteniendoNoticias === false && (
                        <tr>
                          <td colSpan={5}>No hay noticias registradas.</td>
                        </tr>
                      )}
                    {tempNoticias.map((item, i) => (
                      <tr key={i} className={`table-row print:mb-4 `}>
                        <td className="border break-inside-avoid">{item.id}</td>
                        <td className="border break-inside-avoid">
                          {item.titulo}
                        </td>
                        <td className="border break-inside-avoid px-2">
                          <SeveridadNoticiasBadge
                            severidadId={item.severidadId}
                          />
                        </td>
                        <td className="border break-inside-avoid">
                          {item.fechaDePublicacion}
                          {/* {item.fechaDePublicacion.replace("T", " ").split(".")[0]} */}
                        </td>
                        <td className="border break-inside-avoid px-2">
                          <EstadosNoticiasBadge idEstado={item.estadoId} />
                        </td>
                        <td className="border break-inside-avoid align-middle print:hidden ">
                          <button
                            type="button"
                            ref={buttonRef}
                            onClick={(e) =>
                              handleButtonClick(item, e.currentTarget)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8"
                              viewBox="0 -960 960 960"
                            >
                              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
        {/* Popup */}
        {popupInfo.visible && (
          <div
            style={{
              position: "absolute",
              top: popupInfo.y,
              left: popupInfo.x,
            }}
            className="bg-white border shadow-lg p-2 rounded z-20"
          >
            <div>{popupInfo.content}</div>
            <button
              onClick={closePopup}
              className="ml-4 fill-red-600 hover:fill-red-700 absolute top-3 right-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" w-4"
                viewBox="0 -960 960 960"
              >
                <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
              </svg>
            </button>
          </div>
        )}
      </>
    </MainLayout>
  );
};
