import { ChangeEvent } from "react";

export type OptionType = {
  value: string;
  name: string;
};

type SelectFieldType = {
  id: string;
  name: string;
  value: string | number;
  title?: string;
  options: OptionType[];
  cx?: string; // Extra class properties
  selectMessage?: string;
  required?: boolean;
  readOnly?: boolean; //disable
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectField = ({
  id,
  name,
  value,
  title,
  cx,
  options,
  selectMessage = "Seleccione una opción",
  required = false,
  readOnly = false,
  onChange,
}: SelectFieldType) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      className={` border p-1 rounded ${readOnly && "cursor-not-allowed"} ${cx}`}
      required={required}
      onChange={onChange}
      disabled={readOnly}
      title={title}
    >
      <option value="" disabled>
        {selectMessage}
      </option>
      {options.map((option) => (
        <option key={option.value + option.name} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
