import { ReactElement, useEffect, useRef, useState } from "react";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { eventoInterface } from "../types/eventoType";
import { EstadoBadge } from "./EstadoBadge";
import { getEstadoName } from "../utils/getEstadoName";
import { toast } from "sonner";
import { Link } from "react-router";
import { usePrint } from "../plugins/print";
import { useModalControls } from "../hooks/useModalControls";

type TablaEventosType = {
  Registros: eventoInterface[];
};

export const TablaEventos = ({ Registros }: TablaEventosType) => {
  const [data, setData] = useState<eventoInterface[]>(Registros);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Termino de búsqueda
  const [searchField, setSearchField] = useState<string>(""); // Propiedad a buscar 1 = id, 2 = nombre, 3 = fechaHoraInicio
  const [itemsPerPage, setItemsPerPage] = useState<string>("5");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsCount, setRowsCount] = useState<number>(); // Cantidad de registros actuales (Con o sin filtro)
  const [popupInfo, setPopupInfo] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string | ReactElement;
  }>({ visible: false, x: 0, y: 0, content: "" });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (searchTerm && searchField) {
      const filteredData = Registros.filter((item) => {
        if (searchField === "id") {
          return item.id.toLowerCase().includes(searchTerm?.toLowerCase());
        }
        if (searchField === "nombre") {
          return item.nombre.toLowerCase().includes(searchTerm?.toLowerCase());
        }
        if (searchField === "fechaHoraInicio") {
          return item.fechaHoraInicio
            .toLowerCase()
            .includes(searchTerm?.toLowerCase());
        }
      });
      console.log(filteredData);
      setData(filteredData);
      setCurrentPage(1);
    } else {
      setData(Registros);
    }
  }, [searchTerm, searchField]);

  const indexOfLastItem = currentPage * Number(itemsPerPage);
  const indexOfFirstItem = indexOfLastItem - Number(itemsPerPage);
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };
  useEffect(() => {
    setRowsCount(Registros.length);
  }, []);

  // Popup
  const handleButtonClick = (
    evento: eventoInterface,
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
                navigator.clipboard.writeText(evento.id).then(() => {
                  toast.info("Id copiada a cortapapeles");
                  closePopup();
                });
              }}
            >
              <p>Copiar Id</p>
            </button>
            <Link
              className={
                "text-start transition-all duration-100 hover:bg-slate-100 hover:rounded "
              }
              to={`/eventos/${evento.id}`}
            >
              <p>Ver evento</p>
            </Link>
            {evento.estadoId === "2" && (
              <button className="text-start transition-all duration-100 hover:bg-slate-100 hover:rounded ">
                <p>Concluir evento</p>
              </button>
            )}
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

  // Imprimir
  // Ref a div
  const contentRef = useRef<HTMLTableElement>(null);
  const { printNode } = usePrint(contentRef);

  // Modal
  // Controles del modal de las acciones
  const { ModalRef, isModalOpen, setIsModalOpen } = useModalControls();
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <InputField
            id="searchTerm"
            name="searchTerm"
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            cx="w-28 md:w-44"
            value={searchTerm as string}
          />
          <SelectField
            id="selectColumn"
            name="selectColumn"
            selectMessage="Buscar por"
            value={searchField as string}
            options={[
              { value: "id", name: "ID" },
              { value: "nombre", name: "Nombre" },
              { value: "fechaHoraInicio", name: "Fecha" },
            ]}
            onChange={(e) => setSearchField(e.target.value)}
          />
          {(searchTerm.length > 0 || searchField.length > 0) && (
            <button
              type="button"
              title="Limpiar filtros"
              onClick={() => {
                setSearchField("");
                setSearchTerm("");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 rounded hover:bg-black hover:fill-white duration-150 transition-all"
                viewBox="0 -960 960 960"
              >
                <path d="m480-424 116 116q11 11 28 11t28-11q11-11 11-28t-11-28L536-480l116-116q11-11 11-28t-11-28q-11-11-28-11t-28 11L480-536 364-652q-11-11-28-11t-28 11q-11 11-11 28t11 28l116 116-116 116q-11 11-11 28t11 28q11 11 28 11t28-11l116-116Zm0 344q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            </button>
          )}
          <button onClick={() => setIsModalOpen(true)} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 rounded hover:bg-black hover:fill-white duration-150 transition-all"
              viewBox="0 -960 960 960"
            >
              <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
            </svg>
          </button>
        </div>
        <button type="button" onClick={() => printNode()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8"
            viewBox="0 -960 960 960"
          >
            <path d="M320-120q-33 0-56.5-23.5T240-200v-80h-80q-33 0-56.5-23.5T80-360v-160q0-51 35-85.5t85-34.5h560q51 0 85.5 34.5T880-520v160q0 33-23.5 56.5T800-280h-80v80q0 33-23.5 56.5T640-120H320ZM160-360h80q0-33 23.5-56.5T320-440h320q33 0 56.5 23.5T720-360h80v-160q0-17-11.5-28.5T760-560H200q-17 0-28.5 11.5T160-520v160Zm480-280v-120H320v120h-80v-120q0-33 23.5-56.5T320-840h320q33 0 56.5 23.5T720-760v120h-80Zm80 180q17 0 28.5-11.5T760-500q0-17-11.5-28.5T720-540q-17 0-28.5 11.5T680-500q0 17 11.5 28.5T720-460Zm-80 260v-160H320v160h320ZM160-560h640-640Z" />
          </svg>
        </button>
      </div>
      <table
        ref={contentRef}
        className="w-full table-auto print:w-11/12 print:m-8"
      >
        {/* Columns */}
        <caption className="hidden print:block"></caption>
        <thead className="table-header-group">
          <tr className="table-row">
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th className="print:hidden"></th>
          </tr>
        </thead>
        {/* Rows */}
        <tbody>
          {currentItems.length === 0 ? (
            <tr className="border">
              <td className="text-red-600" colSpan={5}>
                No se encontraron registros...
              </td>
            </tr>
          ) : (
            currentItems.map((evento) => (
              <tr className="border" key={"FilaDeEvento" + evento.id}>
                <td className="border-x text-center">{evento.id}</td>
                <td className="">{evento.nombre}</td>
                <td className="text-center align-middle p-0">
                  <div className="inline-block">
                    <EstadoBadge estado={getEstadoName(evento.estadoId)} />
                  </div>
                </td>
                <td className="text-center">
                  {evento.fechaHoraInicio.split("T")[0]}
                </td>
                <td className="flex justify-center items-center print:hidden ">
                  <button
                    type="button"
                    ref={buttonRef}
                    onClick={(e) => handleButtonClick(evento, e.currentTarget)}
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
            ))
          )}
        </tbody>
      </table>
      {/* Popup */}
      {popupInfo.visible && (
        <div
          style={{ position: "absolute", top: popupInfo.y, left: popupInfo.x }}
          className="bg-white border shadow-lg p-2 rounded"
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
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <span>Por página:</span>
          <SelectField
            id="itemsPerPage"
            name="itemsPerPage"
            value={itemsPerPage as string}
            onChange={(e) => handleItemsPerPageChange(e.target.value)}
            cx="w-14"
            options={[
              { value: "5", name: "5" },
              { value: "10", name: "10" },
              { value: "20", name: "20" },
            ]}
          />
        </div>

        <div className="flex space-x-1 items-center">
          {/* Botón de página anterior */}
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            className={`w-8 h-8 p-0 border rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {/* Números dinámicos */}
          {rowsCount &&
            (() => {
              const totalPages = Math.ceil(data.length / Number(itemsPerPage));
              const pageNumbers = [];
              if (totalPages <= 3) {
                // Si hay 3 páginas o menos, muestra todas
                for (let i = 1; i <= totalPages; i++) {
                  pageNumbers.push(i);
                }
              } else {
                if (currentPage === 1) {
                  // Si está en la primera página, muestra las primeras 3
                  pageNumbers.push(1, 2, 3);
                } else if (currentPage === totalPages) {
                  // Si está en la última página, muestra las últimas 3
                  pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
                } else {
                  // Si está en el medio, muestra la página actual y sus adyacentes
                  pageNumbers.push(
                    currentPage - 1,
                    currentPage,
                    currentPage + 1
                  );
                }
              }
              return pageNumbers.map((page) => (
                <button
                  key={"botonPagina" + page}
                  onClick={() => paginate(page)}
                  className={`w-8 h-8 p-0 border rounded ${
                    page === currentPage
                      ? "bg-gray-700 text-white"
                      : "bg-slate-100 text-black"
                  }`}
                >
                  {page}
                </button>
              ));
            })()}

          {/* Botón de página siguiente */}
          <button
            onClick={() =>
              currentPage < Math.ceil(data.length / Number(itemsPerPage)) &&
              paginate(currentPage + 1)
            }
            className={`w-8 h-8 p-0 border rounded ${
              currentPage === Math.ceil(data.length / Number(itemsPerPage))
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={
              currentPage === Math.ceil(data.length / Number(itemsPerPage))
            }
          >
            &gt;
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
              <h1>Registrar nuevo evento</h1>
              <span>TBD</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
