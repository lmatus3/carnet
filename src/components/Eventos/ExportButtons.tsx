import { exportToExcel } from "../../utils/exportToExcel";

interface ExportButtonsProps {
  data: object[];
  name: string;
  printFn: () => void;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  data,
  name,
  printFn,
}) => {
  return (
    <div className="flex gap-2">
      <button
        title="Exportar a excel"
        className="border rounded h-8 w-20 bg-green-700 text-white"
        onClick={() => {
          exportToExcel(data, "Asistencia-" + name);
        }}
      >
        Excel
      </button>
      <button
        title="Exportar a PDF"
        className="border rounded h-8 w-20"
        onClick={() => printFn()}
      >
        Imprimir
      </button>
    </div>
  );
};