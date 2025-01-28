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

export const getTypeOfCarnet = (value: string) => {
  if (value === "estudiante") {
    return { id: 1, name: "Estudiante" };
  }
  // Grado
  if (value === "docente") {
    return { id: 2, name: "Profesor" };
  }
  if (value === "administrativo") {
    return { id: 3, name: "Administrativo" };
  }
  if (value === "docentePosgrado") {
    return { id: 2, name: "Profesor posgrado" };
  }
  if (value === "estudiantePosgrado") {
    return { id: 1, name: "Estudiante posgrado" };
  }
};
