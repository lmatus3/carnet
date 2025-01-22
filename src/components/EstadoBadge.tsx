import { EstadoTypes } from "../types/estadoType";

export const EstadoBadge = ({ estado }: { estado: EstadoTypes }) => {
  return (
    <div
      className={`rounded w-28 text-center m-0 p-1 leading-none ${
        estado === "Programado" && "bg-green-800 text-white"
      } ${estado === "En curso" && "bg-blue-950 text-white"} ${
        estado === "Concluído" && "border"
      } ${estado === "Desconocido" && "bg-black text-white"}`}
    >
      {estado}
    </div>
  );
};
