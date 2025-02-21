import { ResponseInterface } from "../types/GeneralTypes";

import { noticiaInterface } from "../types/noticiaType";

interface NoticiasBakend extends noticiaInterface {
  // TODO Si llegan a haber filtros acá se agregan
  filtros: boolean;
}

interface ResponseValidUsersDataInterface {
  message: string;
  data: { valid: boolean };
  errors: string[] | null;
}
interface ResponseNoticiasDataInterface {
  message: string;
  data: { Noticias: NoticiasBakend[] };
  errors: string[] | null;
}

interface ValidUsersResponse extends ResponseInterface {
  data?: ResponseValidUsersDataInterface;
}
interface ResponseNoticiasResponse extends ResponseInterface {
  data?: ResponseNoticiasDataInterface;
}

// Obtener usuarios válidos a hacer post o patch
export const GetValidUsers: () => Promise<ValidUsersResponse> = async () => {
  return {
    ok: true,
    data: {
      message: "Este usuario tiene permiso de administrar noticias",
      data: { valid: true },
      errors: null,
    },
  };
  // try {
  //   const response = await BackendApi.get("/validusers");
  //   if (response.status) {
  //     return {
  //       ok: true,
  //       data: response.data as ResponseValidUsersDataInterface,
  //     };
  //   } else {
  //     return {
  //       ok: false,
  //       error: "No se logró obtener los usuarios que tienen acceso",
  //     };
  //   }
  // } catch (error) {
  //   return ValidateError({
  //     error: error,
  //     errorMessage: "No se logró obtener los usuarios que tienen acceso",
  //   });
  // }
};
// Obtener noticias
export const GetNoticias: () => Promise<ResponseNoticiasResponse> =
  async () => {
    return {
      ok: true,
      data: {
        message: "Se listan los recursos",
        data: { Noticias: [] },
        errors: null,
      },
    };
    // try {
    //   const response = await BackendApi.get("/noticias");
    //   if (response.status) {
    //     return {
    //       ok: true,
    //       data: response.data as ResponseNoticiasDataInterface,
    //     };
    //   } else {
    //     return { ok: false, error: "No se logró obtener las noticias" };
    //   }
    // } catch (error) {
    //   return ValidateError({
    //     error: error,
    //     errorMessage: "No se logró obtener las noticias",
    //   });
    // }
  };

// export const PostEvento: (
//   payload: eventoPostInterface
// ) => Promise<ResponseInterface> = async (payload) => {
//   try {
//     const response = await BackendApi.post("/evento", payload);
//     if (response.status) {
//       return { ok: true, data: response.data };
//     } else {
//       return { ok: false, error: "No se logró registrar el evento" };
//     }
//   } catch (error) {
//     return ValidateError({
//       error: error,
//       errorMessage: "No se logró registrar el evento",
//     });
//   }
// };
// export const PatchEvento: (
//   payload: eventoPostInterface,
//   id: number | string
// ) => Promise<ResponseInterface> = async (payload, id) => {
//   try {
//     const response = await BackendApi.patch("/evento/" + id, payload);
//     if (response.status) {
//       return { ok: true, data: response.data };
//     } else {
//       return { ok: false, error: "No se logró actualizar el evento" };
//     }
//   } catch (error) {
//     return ValidateError({
//       error: error,
//       errorMessage: "No se logró actualizar el evento",
//     });
//   }
// };
