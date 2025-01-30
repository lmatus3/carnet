import * as XLSX from "xlsx";
export const xlsxPlugin = () => {
  // Esta función requiere pasarle un json con la data
  //* WorkSheet
  const JsonToSheet = XLSX.utils.json_to_sheet;
  //* WorkBook
  const BookNew = XLSX.utils.book_new;
  // Crear una hoja de trabajo a partir de los datos
  // const worksheet = XLSX.utils.json_to_sheet(data);
  // const workbook = XLSX.utils.book_new();
  // Función para agregar hoja al libro (Recibe WorkBook, WorkSheet y el nombre)
  const BookAppendSheet = XLSX.utils.book_append_sheet;
  // Agregar la hoja al libro
  // XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
  const defaultConfigToWrite = { bookType: "xlsx", type: "array" };
  // Función para escribir el archivo en formato binario
  //* excelBuffer
  const Write = XLSX.write;

  const GetDataBlob = (excelBuffer: BlobPart) => {
    // Convertir el buffer en un Blob y descargarlo
    return new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  };

  return {
    JsonToSheet,
    BookNew,
    BookAppendSheet,
    defaultConfigToWrite,
    Write,
    GetDataBlob,
  };
};
