import React from "react";

interface DetallesDeEventoProps {
  descripcion: string;
  FechaInicio: string;
  HoraInicio: string;
  FechaFin?: string;
  HoraFin?: string;
}

export const DetallesDeEvento: React.FC<DetallesDeEventoProps> = ({
  descripcion,
  FechaInicio,
  HoraInicio,
  FechaFin,
  HoraFin,
}) => {
  return (
    <div>
      <span className="block font-bold text-xl">Descripción del evento</span>
      <p>{descripcion}</p>
      {FechaFin && FechaInicio ? (
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
  );
};
