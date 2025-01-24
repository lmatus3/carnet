import { TypeOfUser } from "./userTypes";

export type carnetType = {
  name: string;
  carrera?: string;
  cursoNombre?: string;
  cargo?: string;
  facultad?: string;
  photoUrl: string;
  credentialCode: string;
  timeValid: string;
  url: string;
  type: TypeOfUser;
};
