import { ChangeEvent } from "react";

type InputFieldType = {
  id: string;
  name: string;
  value: string | number;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password" | "date" | "datetime-local";
  required?: boolean;
  readOnly?: boolean;
  cx?: string; // Extra class properties
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const InputField = ({
  id,
  name,
  value,
  placeholder = "Buscar evento...",
  required = false,
  readOnly = false,
  type = "text",
  cx,
  onChange,
}: InputFieldType) => {
  return (
    <input
      id={id}
      name={name}
      value={value}
      type={type}
      required={required}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded text-black p-1 ${readOnly && " bg-slate-200 cursor-not-allowed select-none "} ${cx}`}
      readOnly={readOnly}
    />
  );
};
