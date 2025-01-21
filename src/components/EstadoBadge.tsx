import { EstadoTypes } from "../types/estadoType";

export const EstadoBadge = ({ estado }: { estado: EstadoTypes }) => {
  return (
    <div
      className={`rounded w-28 ${
        estado === "Programado" && "bg-green-800 text-white"
      } ${estado === "En curso" && "bg-blue-950 text-white"} ${
        estado === "Concluído" && "border"
      } ${estado === "Desconocido" && "bg-black text-white"}`}
    >
      {estado}
    </div>
  );
};
