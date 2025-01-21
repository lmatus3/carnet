import { ChangeEvent } from "react";

type InputFieldType = {
  id: string;
  name: string;
  value: string | number;
  type: "text" | "number" | "email" | "password";
  placeholder?: string;
  required?: boolean;
  cx?: string; // Extra class properties
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const InputField = ({
  id,
  name,
  value,
  placeholder = "Buscar evento...",
  required = false,
  cx,
  onChange,
}: InputFieldType) => {
  return (
    <input
      id={id}
      name={name}
      value={value}
      required={required}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded text-black p-1 ${cx}`}
    />
  );
};
