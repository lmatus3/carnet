import { ChangeEvent } from "react";

type TextFieldType = {
  id: string;
  name: string;
  value: string | number;
  placeholder?: string;
  rows?: number;
  type?: "text" | "number" | "email" | "password";
  required?: boolean;
  cx?: string; // Extra class properties
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
export const TextField = ({
  id,
  name,
  value,
  placeholder = "",
  rows = 2,
  required = false,
  cx,
  onChange,
}: TextFieldType) => {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      rows={rows}
      required={required}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded text-black p-1 ${cx}`}
    ></textarea>
  );
};
