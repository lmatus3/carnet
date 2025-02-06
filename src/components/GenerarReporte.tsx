import { useState } from "react";
import { asistenciasDBInterface } from "../types/asistenciaType";
import { camposReporteAsistenciaType } from "../types/camposReporteType";
import { exportToExcel } from "../utils/exportToExcel";
import { toast } from "sonner";

type GenerarReporteProp = {
  asistencias: asistenciasDBInterface[];
  closeModal: () => void;
};

export const GenerarReporte = ({
  asistencias,
  closeModal,
}: GenerarReporteProp) => {
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
  };
  //
  const [camposSeleccionados, setCamposSeleccionados] =
    useState<camposReporteAsistenciaType>({
      codigoEvento: true,
      nombreEvento: true,
      carnetUsuario: true,
      tipoUsuario: true,
      nombreUsuario: true,
      fechaAsistencia: true,
      nombreCarrera: false,
      nombreCargo: false,
      etniaUsuario: false,
      sexo: false,
    });
  const CrearReporte = () => {
      // TODO Cambiar los datos que se envían
    const datosReporte = asistencias.map((asistencia) => {
    //   console.log(asistencia);
    });
    exportToExcel(asistencias, asistencias[0].Evento.nombre);
    toast.info("Reporte creado");
  };
  return (
    <>
      <h1 className="font-leagueGothic text-2xl md:text-4xl">
        Seleccionar campos de reporte
      </h1>
      <button
        onClick={() => closeModal()}
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
        onSubmit={handleSubmit}
        className="flex flex-col md:grid md:grid-cols-2 gap-2"
      >
        <span className="col-span-2">
          Por favor, seleccione los campos con los que desea generar el reporte.
        </span>
        {(
          Object.keys(camposSeleccionados) as Array<
            keyof typeof camposSeleccionados
          >
        ).map((campo, i) => (
          <div key={`Campo${i}`}>
            <label htmlFor={campo}>{campo}</label>
            <input
              type="checkbox"
              name={campo}
              id={campo}
              checked={camposSeleccionados[campo]}
              onChange={(e) =>
                setCamposSeleccionados((prev) => ({
                  ...prev,
                  [campo]: e.target.checked,
                }))
              }
            />
          </div>
        ))}
        <div className="flex col-span-2 justify-end">
          <button
            title="Generar reporte"
            className="bg-green-600 rounded w-36 text-white py-1 hover:bg-green-800"
            onClick={CrearReporte}
          >
            Generar reporte
          </button>
        </div>
      </form>
    </>
  );
};
