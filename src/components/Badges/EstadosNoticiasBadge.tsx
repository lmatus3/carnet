export const EstadosNoticiasBadge = ({ idEstado }: { idEstado: "1" | "2" }) => {
  return (
    <div
      className={`px-2 py-1 rounded ${
        idEstado === "1" && "bg-green-900 text-white "
      } ${
        idEstado === "2" && "bg-red-900 text-white "
      }`}
    >
      {idEstado === "1" && "Activa"}
      {idEstado === "2" && "Inactiva"}
    </div>
  );
};
