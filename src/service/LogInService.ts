import { isAxiosError } from "axios";
import { AuthApi } from "../api/authConfig";

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

const ValidateError: (err: unknown) => LoginResponse = (err) => {
  if (isAxiosError(err)) {
    // Access to config, request, and response
    const { response } = err;
    if (response && response.data) {
      const { message }: { message: string } = response.data;
      return { ok: false, error: message };
    }
    return { ok: false, error: "No se logró iniciar sesión" };
  } else {
    // Error no de backend
    console.log(err);
    return { ok: false, error: "No se logró iniciar sesión" };
  }
};

export const LoginCredentials: (
  payload: LoginCredentialsInterface
) => Promise<LoginResponse> = async (payload) => {
  try {
    const response = await AuthApi.post("/CheckCredentialsUonline", payload);
    if (response.status) {
      return { ok: true, data: response.data as BackendResponse };
    } else {
      return { ok: false, error: "No se logró iniciar sesión" };
    }
  } catch (error) {
    return ValidateError(error);
  }
};
export const LoginGoogle: (
  payload: LoginGoogleInterface
) => Promise<LoginResponse> = async (payload) => {
  try {
    const response = await AuthApi.post(
      "/CheckCredentialsUonlineGoogle",
      payload
    );
    if (response.status) {
      return { ok: true, data: response.data as BackendResponse };
    } else {
      return { ok: false, error: "No se logró iniciar sesión" };
    }
  } catch (error) {
    return ValidateError(error);
  }
};
