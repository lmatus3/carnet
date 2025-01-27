export type TypeOfUser =
  | "Estudiante"
  | "Docente"
  | "Administrativo"
  | "Docente posgrado"
  | "Estudiante posgrado";

export type userParamTypes =
  | "estudiante"
  | "docente"
  | "docentePosgrado"
  | "estudiantePosgrado"
  | "administrativo";

const userParamValues: userParamTypes[] = [
  "estudiante",
  "docente",
  "docentePosgrado",
  "estudiantePosgrado",
  "administrativo",
];
export const isUserParamType = (value: string): value is userParamTypes => {
  return userParamValues.includes(value as userParamTypes);
};
