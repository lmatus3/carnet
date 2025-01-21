import { useState } from "react";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { eventoInterface } from "../types/eventoType";
import { EstadoBadge } from "./EstadoBadge";
import { getEstadoName } from "../utils/getEstadoName";

type TablaEventosType = {
  Registros: eventoInterface[];
};

export const TablaEventos = ({ Registros }: TablaEventosType) => {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [searchField, setSearchField] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState<string>("5");
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * Number(itemsPerPage);
  const indexOfFirstItem = indexOfLastItem - Number(itemsPerPage);
  const currentItems = Registros.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <InputField
            id="searchTerm"
            name="searchTerm"
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            value={searchTerm as string}
          />
          <SelectField
            id="selectColumn"
            name="selectColumn"
            value={searchField as string}
            options={[
              { value: "1", name: "ID" },
              { value: "2", name: "Nombre" },
              { value: "3", name: "Fecha" },
            ]}
            onChange={(e) => setSearchField(e.target.value)}
          />
        </div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8"
            viewBox="0 -960 960 960"
          >
            <path d="M320-120q-33 0-56.5-23.5T240-200v-80h-80q-33 0-56.5-23.5T80-360v-160q0-51 35-85.5t85-34.5h560q51 0 85.5 34.5T880-520v160q0 33-23.5 56.5T800-280h-80v80q0 33-23.5 56.5T640-120H320ZM160-360h80q0-33 23.5-56.5T320-440h320q33 0 56.5 23.5T720-360h80v-160q0-17-11.5-28.5T760-560H200q-17 0-28.5 11.5T160-520v160Zm480-280v-120H320v120h-80v-120q0-33 23.5-56.5T320-840h320q33 0 56.5 23.5T720-760v120h-80Zm80 180q17 0 28.5-11.5T760-500q0-17-11.5-28.5T720-540q-17 0-28.5 11.5T680-500q0 17 11.5 28.5T720-460Zm-80 260v-160H320v160h320ZM160-560h640-640Z" />
          </svg>
        </button>
      </div>
      <table>
        {/* Columns */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th></th>
          </tr>
        </thead>
        {/* Rows */}
        <tbody>
          {currentItems.map((evento) => (
            <tr key={"FilaDeEvento" + evento.id}>
              <td>{evento.id}</td>
              <td>{evento.nombre}</td>
              <td>
                <EstadoBadge estado={getEstadoName(evento.estadoId)} />
              </td>
              <td>{evento.fechaHoraInicio}</td>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Table ref={tableRef} className="border-collapse border border-gray-200">
        <TableHeader>
          <TableRow className="bg-black text-white">
            <TableHead className="border border-gray-200 px-4 py-2">
              ID
            </TableHead>
            <TableHead className="border border-gray-200 px-4 py-2">
              Nombre
            </TableHead>
            <TableHead className="border border-gray-200 px-4 py-2">
              Estado
            </TableHead>
            <TableHead className="border border-gray-200 px-4 py-2">
              Fecha
            </TableHead>
            <TableHead className="border border-gray-200 px-4 py-2">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((row, index) => (
            <TableRow
              key={row.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <TableCell className="border border-gray-200 px-4 py-2">
                {row.id}
              </TableCell>
              <TableCell className="border border-gray-200 px-4 py-2">
                {row.nombre}
              </TableCell>
              <TableCell className="border border-gray-200 px-4 py-2">
                {row.estado}
              </TableCell>
              <TableCell className="border border-gray-200 px-4 py-2">
                {row.fecha}
              </TableCell>
              <TableCell className="border border-gray-200 px-4 py-2">
                <Button
                  variant="outline"
                  className="bg-white text-black border-black hover:bg-gray-200"
                  onClick={() => alert(`Action for ${row.nombre}`)}
                >
                  Action
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <span>Registros por página:</span>
          <SelectField
            id="itemsPerPage"
            name="itemsPerPage"
            value={itemsPerPage as string}
            onChange={(e) => handleItemsPerPageChange(e.target.value)}
            options={[
              { value: "5", name: "5" },
              { value: "10", name: "10" },
              { value: "20", name: "20" },
            ]}
          />
        </div>
        <div className="flex space-x-1">
          {Array.from(
            { length: Math.ceil(Registros.length / Number(itemsPerPage)) },
            (_, i) => (
              <button
                key={"botonPagina" + i}
                onClick={() => paginate(i + 1)}
                className={`w-8 h-8 p-0 border rounded bg-gray-700 text-white ${
                  i + 1 === currentPage && " bg-slate-100 text-black"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
