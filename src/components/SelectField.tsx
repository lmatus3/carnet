import { ChangeEvent } from "react";

type OptionType = {
  value: string;
  name: string;
};

type SelectFieldType = {
  id: string;
  name: string;
  value: string | number;
  options: OptionType[];
  cx?: string; // Extra class properties
  selectMessage?: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectField = ({
  id,
  name,
  value,
  cx,
  options,
  selectMessage = "Seleccione una opción",
  required = false,
  onChange,
}: SelectFieldType) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      className={` border p-1 rounded ${cx}`}
      required={required}
      onChange={onChange}
    >
      <option value="" disabled>
        {selectMessage}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
