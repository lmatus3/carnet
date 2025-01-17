export type FormValues = {
    [key: string]: string | FormValues | FormValues[]; // Tipado recursivo
  };
  export type FormValidation = {
    [key: string]: [(testValue: string) => boolean, string]; // [Validación, Mensaje de error]
  };
  export type FieldValidated = {
    [key: string]: string | null;
  }