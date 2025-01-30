import { saveFilesPlugin } from "../plugins/saveFiles";
import { xlsxPlugin } from "../plugins/xlsx";

export const exportToExcel = (data: object[], fileName: string) => {
  const { JsonToSheet, BookNew, BookAppendSheet, Write, GetDataBlob } =
    xlsxPlugin();
  const { SaveAs } = saveFilesPlugin();
  if (data.length === 0) {
    return { error: "No hay datos por exportar", ok: false };
  }

  // Crear una hoja de trabajo a partir de los datos
  const worksheet = JsonToSheet(data);
  const workbook = BookNew();

  // Agregar la hoja al libro
  BookAppendSheet(workbook, worksheet, "Datos");

  // Escribir el archivo en formato binario
  const excelBuffer = Write(workbook, { bookType: "xlsx", type: "array" });

  // Convertir el buffer en un Blob y descargarlo
  const dataBlob = GetDataBlob(excelBuffer);

  SaveAs(dataBlob, `${fileName}.xlsx`);
};
