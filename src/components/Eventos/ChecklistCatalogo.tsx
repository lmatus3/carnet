import { useState } from "react";

interface CatalogItem {
  id: string;
  nombre: string;
}

interface ChecklistProps {
  containerClassName?: string;
  titulo?: string;
  catalogo: CatalogItem[];
  value?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
}

export const ChecklistCatalogo: React.FC<ChecklistProps> = ({
  containerClassName,
  titulo = "Selecciona opciones",
  catalogo,
  value = [],
  onSelectionChange,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(value);

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      if (onSelectionChange) {
        onSelectionChange(newSelected);
      }

      return newSelected;
    });
  };

  return (
    <div
      className={`p-4 bg-white shadow-md rounded-md w-full ${containerClassName}`}
    >
      <h2 className="font-bold mb-2">{titulo}</h2>
      <div className="text-sm flex flex-wrap gap-2">
        {catalogo.map((item) => (
          <label
            key={item.id}
            className="flex items-center space-x-1 cursor-pointer bg-blueDark rounded-md px-2 py-0.5 w-fit"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-white select-none">{item.nombre}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
