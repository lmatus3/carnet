import { exportToExcel } from "./exportToExcel";

type props = React.RefObject<HTMLTableElement>;

export const exportTotalTableToExcel = (
  contentRefTablaTotales: props,
  nombreEvento: string
) => {
  if (!contentRefTablaTotales.current) return;

  const rows = Array.from(
    contentRefTablaTotales.current.querySelectorAll("tbody tr")
  );

  const data = rows.map((row) => {
    const cells = Array.from(row.querySelectorAll("td"));
    return {
      "Tipo de asistencia": cells[0]?.innerText || "",
      "Hombres #": cells[1]?.innerText || "",
      "Hombres %": cells[2]?.innerText || "",
      "Mujeres #": cells[3]?.innerText || "",
      "Mujeres %": cells[4]?.innerText || "",
      "N/A #": cells[5]?.innerText || "",
      "N/A %": cells[6]?.innerText || "",
      Total: cells[7]?.innerText || "",
    };
  });

  exportToExcel(data, nombreEvento || "Totales de asistencias.xlsx");
};
