export const SeveridadNoticiasBadge = ({
  severidadId,
}: {
  severidadId: "1" | "2" | "3";
}) => {
  return (
    <div
      className={`px-2 py-1 rounded border border-black ${
        severidadId === "1" && "bg-yellowLight"
      } ${severidadId === "2" && "bg-OrangeMedium "}
      ${severidadId === "3" && "bg-red-700 text-white"}`}
    >
      {severidadId === "1" && "Baja"}
      {severidadId === "2" && "Media"}
      {severidadId === "3" && "Alta"}
    </div>
  );
};
