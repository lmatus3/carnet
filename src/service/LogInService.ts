import { BackendApi } from "../api/config";

interface LoginCredentialsInterface {
  user: string;
  password: string;
}
interface LoginGoogleInterface {
  client_token: string;
}

interface BackendResponse {
  message: string;
  errors: string[] | null;
  data: {
    status: boolean;
    temporalToken: string;
  } | null;
}

export type LoginResponse = {
  ok: boolean;
  data?: BackendResponse;
  error?: string;
};

export const LoginCredentials: (
  payload: LoginCredentialsInterface
) => Promise<LoginResponse> = async (payload) => {
  try {
    const response = await BackendApi.post("/CheckCredentialsUonline", payload);
    if (response.status) {
      return { ok: true, data: response.data as BackendResponse };
    } else {
      return { ok: false, error: "No se logró iniciar sesión" };
    }
  } catch (error) {
    return { ok: true, error: error as string };
  }
};
export const LoginGoogle: (
  payload: LoginGoogleInterface
) => Promise<LoginResponse> = async (payload) => {
  try {
    const response = await BackendApi.post("/CheckCredentialsUonlineGoogle", payload);
    if (response.status) {
      return { ok: true, data: response.data as BackendResponse };
    } else {
      return { ok: false, error: "No se logró iniciar sesión" };
    }
  } catch (error) {
    console.log(error);
    return { ok: true, error: error as string };
  }
};
