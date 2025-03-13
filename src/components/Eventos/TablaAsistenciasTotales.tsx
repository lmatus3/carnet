import React from "react";
import { exportTotalTableToExcel } from "../../utils/exportTotalTableToExcel";

type TipoTotal = {
  hombres: number;
  mujeres: number;
  otro: number;
  total: number;
};

interface TablaAsistenciasTotalesProps {
  totalEstudiantes: TipoTotal;
  totalAdministrativos: TipoTotal;
  totalDirectivos: TipoTotal;
  totalDocentes: TipoTotal;
  totalAsistencias: TipoTotal;
  asistenciaCargando: boolean;
  seTienenRegistros: boolean;
  errorCargandoAsistencias: boolean;
  contentRefTablaTotales: React.RefObject<HTMLTableElement>;
  nombreEvento?: string;
}

export const TablaAsistenciasTotales: React.FC<
  TablaAsistenciasTotalesProps
> = ({
  totalEstudiantes,
  totalAdministrativos,
  totalDirectivos,
  totalDocentes,
  totalAsistencias,
  asistenciaCargando,
  seTienenRegistros,
  errorCargandoAsistencias,
  contentRefTablaTotales,
  nombreEvento = "Asistencias-totales-del-evento",
}) => {
  return (
    <div className="flex flex-col border rounded p-2 mt-2  w-auto overflow-auto">
      <button
        type="button"
        onClick={() => exportTotalTableToExcel(contentRefTablaTotales,nombreEvento)}
        className="bg-green-700 text-white rounded px-2 w-fit ml-auto my-1 hover:bg-green-900 disabled:cursor-not-allowed"
      >
        Exporta a excel tabla de totales
      </button>
      <table
        ref={contentRefTablaTotales}
        className="border-collapse border border-gray-400 bg-white text-sm text-center"
      >
        <thead>
          <tr className="bg-blue-200">
            <th rowSpan={2} className="border border-gray-400 px-4 py-2">
              Tipo de asistencia
            </th>
            <th colSpan={2} className="border border-gray-400 px-4 py-2">
              Hombres
            </th>
            <th
              colSpan={2}
              className="border border-gray-400 px-4 py-2 col-span-2"
            >
              Mujeres
            </th>
            <th colSpan={2} className="border border-gray-400 px-4 py-2 ">
              N/A
            </th>
            <th rowSpan={2} className="border border-gray-400 px-4 py-2">
              Total
            </th>
          </tr>
          <tr className="bg-blue-200">
            <th className="border border-gray-400 px-4 py-2">#</th>
            <th className="border border-gray-400 px-4 py-2">%</th>
            <th className="border border-gray-400 px-4 py-2">#</th>
            <th className="border border-gray-400 px-4 py-2">%</th>
            <th className="border border-gray-400 px-4 py-2">#</th>
            <th className="border border-gray-400 px-4 py-2">%</th>
          </tr>
        </thead>
        <tbody className="text-center table-row-group">
          {asistenciaCargando && seTienenRegistros === false && (
            <tr>
              <td colSpan={8}>Cargando...</td>
            </tr>
          )}
          {asistenciaCargando === false &&
            seTienenRegistros === false &&
            errorCargandoAsistencias === true && (
              <tr>
                <td colSpan={8}>
                  No se logró cargar la asistencia del evento, por favor
                  recargue la página
                </td>
              </tr>
            )}
          {asistenciaCargando === false &&
            seTienenRegistros === false &&
            errorCargandoAsistencias === false && (
              <tr>
                <td colSpan={8}>
                  No se cuentan con asistencias en este evento
                </td>
              </tr>
            )}
          {seTienenRegistros && (
            <>
              <tr className={`table-row print:mb-4 `}>
                <td className="border break-inside-avoid">Estudiantes</td>
                <td className="border break-inside-avoid">
                  {totalEstudiantes.hombres}
                </td>
                <td className="border break-inside-avoid">
                  {totalEstudiantes.total === 0
                    ? "0"
                    : (
                        (totalEstudiantes.hombres * 100) /
                        totalEstudiantes.total
                      ).toFixed(2)}
                  {"%"}
                </td>
                <td className="border break-inside-avoid">
                  {totalEstudiantes.mujeres}
                </td>
                <td className="border break-inside-avoid">
                  {totalEstudiantes.total === 0
                    ? "0"
                    : (
                        (totalEstudiantes.mujeres * 100) /
                        totalEstudiantes.total
                      ).toFixed(2)}
                  {"%"}
                </td>
                <td className="border break-inside-avoid">
                  {totalEstudiantes.otro}
                </td>
                <td className="border break-inside-avoid">
                  {totalEstudiantes.total === 0
                    ? "0"
                    : (
                        (totalEstudiantes.otro * 100) /
                        totalEstudiantes.total
                      ).toFixed(2)}
                  {"%"}
                </td>
                <td className="border break-inside-avoid">
                  {totalEstudiantes.total}
                </td>
              </tr>
              {/* Administrativos */}
              <tr className={`table-row print:mb-4 `}>
                <td className="border break-inside-avoid">Administratios</td>
                <td className="border break-inside-avoid">
                  {totalAdministrativos.hombres}
                </td>
                <td className="border break-inside-avoid">
                  {totalAdministrativos.total === 0
                    ? "0"
                    : (
                        (totalAdministrativos.hombres * 100) /
                        totalAdministrativos.total
                      ).toFixed(2)}
                  {"%"}
                </td>
                <td className="border break-inside-avoid">
                  {totalAdministrativos.mujeres}
                </td>
                <td className="border break-inside-avoid">
                  {totalAdministrativos.total === 0
                    ? "0"
                    : (
                        (totalAdministrativos.mujeres * 100) /
                        totalAdministrativos.total
                      ).toFixed(2)}
                  {"%"}
                </td>
                <td className="border break-inside-avoid">
                  {totalAdministrativos.otro}
                </td>
                <td className="border break-inside-avoid">
                  {totalAdministrativos.total === 0
                    ? "0"
                    : (
                        (totalAdministrativos.otro * 100) /
                        totalAdministrativos.total
                      ).toFixed(2)}
                  {"%"}
                </td>
                <td className="border break-inside-avoid">
                  {totalAdministrativos.total}
                </td>
              </tr>
              {/* Directivos */}
              <tr className={`table-row print:mb-4 `}>
                <td className="border break-inside-avoid">Directivos</td>
                <td className="border break-inside-avoid">
                  {totalDirectivos.hombres}
                </td>
                <td className="border break-inside-avoid">
                  {totalDirectivos.total === 0
                    ? "0"
                    : (
                        (totalDirectivos.hombres * 100) /
                        totalDirectivos.total
                      ).toFixed(2)}
                  {"%"}
                </td>
                <td className="border break-inside-avoid">
                  {totalDirectivos.mujeres}
                </td>
                <td className="border break-inside-avoid">
                  {totalDirectivos.total === 0
                    ? "0"
                    : (
                        (totalDirectivos.mujeres * 100) /
                        totalDirectivos.total
                      ).toFixed(2)}
                  {"%"}
                </td>
                <td className="border break-inside-avoid">
                  {totalDirectivos.otro}
                </td>
                <td className="border break-inside-avoid">
                  {totalDirectivos.total === 0
                    ? "0"
                    : (
                        (totalDirectivos.otro * 100) /
                        totalDirectivos.total
                      ).toFixed(2)}
                  {"%"}
                </td>
                <td className="border break-inside-avoid">
                  {totalDirectivos.total}
                </td>
              </tr>
              {/* Docentes */}
              <tr className={`table-row print:mb-4 `}>
                <td className="border break-inside-avoid">Docentes</td>
                <td className="border break-inside-avoid">
                  {totalDocentes.hombres}
                </td>
                <td className="border break-inside-avoid">
                  {totalDocentes.total === 0
                    ? "0"
                    : (
                        (totalDocentes.hombres * 100) /
                        totalDocentes.total
                      ).toFixed(2)}
                  {"%"}
                </td>
                <td className="border break-inside-avoid">
                  {totalDocentes.mujeres}
                </td>
                <td className="border break-inside-avoid">
                  {totalDocentes.total === 0
                    ? "0"
                    : (
                        (totalDocentes.mujeres * 100) /
                        totalDocentes.total
                      ).toFixed(2)}
                  {"%"}
                </td>
                <td className="border break-inside-avoid">
                  {totalDocentes.otro}
                </td>
                <td className="border break-inside-avoid">
                  {totalDocentes.total === 0
                    ? "0"
                    : (
                        (totalDocentes.otro * 100) /
                        totalDocentes.total
                      ).toFixed(2)}
                  {"%"}
                </td>
                <td className="border break-inside-avoid">
                  {totalDocentes.total}
                </td>
              </tr>
              {/* Total */}
              <tr className={`table-row print:mb-4 `}>
                <td className="border break-inside-avoid">
                  <b>Todos los tipos</b>
                </td>
                {/* En un futuro se debe de pode traer el carnet y el nombre */}
                <td className="border break-inside-avoid">
                  {totalAsistencias.hombres}
                </td>
                <td className="border break-inside-avoid">
                  {totalAsistencias.total === 0
                    ? "0"
                    : (
                        (totalAsistencias.hombres * 100) /
                        totalAsistencias.total
                      ).toFixed(2)}
                  {"%"}
                </td>
                <td className="border break-inside-avoid">
                  {totalAsistencias.mujeres}
                </td>
                <td className="border break-inside-avoid">
                  {totalAsistencias.total === 0
                    ? "0"
                    : (
                        (totalAsistencias.mujeres * 100) /
                        totalAsistencias.total
                      ).toFixed(2)}
                  {"%"}
                </td>
                <td className="border break-inside-avoid">
                  {totalAsistencias.otro}
                </td>
                <td className="border break-inside-avoid">
                  {totalAsistencias.total === 0
                    ? "0"
                    : (
                        (totalAsistencias.otro * 100) /
                        totalAsistencias.total
                      ).toFixed(2)}
                  {"%"}
                </td>
                <td className="border break-inside-avoid">
                  {totalAsistencias.total}
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};
