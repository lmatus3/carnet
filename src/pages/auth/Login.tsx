import { useState } from "react";
import { FormValidation } from "../../types/useFormTypes";
import { useForm } from "../../hooks/useForm";
import { useUIStore } from "../../stores/UIStore";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Loader } from "../../components/Loader";
import { toast } from "sonner";
import {
  LoginCredentials,
  LoginGoogle,
  LoginResponse,
} from "../../service/LogInService";
import { useSessionStore } from "../../stores";

export const Login = () => {
  //   Formulario inicial
  const initialForm = { user: "", password: "" };
  // Validaciones de formulario
  const formValidations: FormValidation = {
    user: [(value) => value.length > 0, "Favor, ingrese su usuario"],
    password: [(value) => value.length > 0, "Favor, ingrese su contraseña"],
  };
  const {
    formValues,
    formValidation,
    isFormValid,
    isFormSent,
    sendForm,
    onChange,
  } = useForm(initialForm, formValidations);
  // Loader Logic
  const loading = useUIStore((state) => state.loading);
  const SetLoading = useUIStore((state) => state.SetLoading);
  //
  const onSessionStart = useSessionStore((state) => state.onSessionStart);
  // Form values and validations
  const { user, password } = formValues;
  const { userValid, passwordValid } = formValidation;
  // States
  const [ShowPassword, setShowPassword] = useState<boolean>(false);
  const [SubmitDisabled, setSubmitDisabled] = useState<boolean>(false);

  const HandleLogin = (ev: React.FormEvent) => {
    ev.preventDefault();
    // Enviando formulario para mostrar errores en caso de haber
    sendForm();
    setSubmitDisabled(true);
    // Validando campos de formulario
    if (isFormValid) {
      toast.info("Favor, revise los campos necesarios");
      setSubmitDisabled(false);
      return;
    }
    // Empezando loader
    SetLoading(true);
    // TODO Enviando a backend
    const payload = { user: user as string, password: password as string };
    LoginCredentials(payload).then((res) => {
      // Caso de error
      if (res.error || !res.data) {
        toast.error(res.error);
        SetLoading(false);
        setSubmitDisabled(false);
        return;
      }
      // Caso positivo
      ManagePostLogin(res);
    });
  };
  const HandleGoogleLogin = (credentialResponse: CredentialResponse) => {
    // Empezando loader
    SetLoading(true);
    setSubmitDisabled(true);
    // Validando que exista el client_token
    if (!credentialResponse.credential) {
      toast.error("No se logró iniciar sesión con google, intentelo de nuevo.");
      SetLoading(false);
      setSubmitDisabled(false);
      return;
    }
    // TODO Enviando credential a backend
    const payload = { client_token: credentialResponse.credential as string };
    console.log(payload);
    LoginGoogle(payload).then((res) => {
      // Caso de error (De axios)
      if (res.error || !res.data) {
        toast.error(res.error);
        SetLoading(false);
        setSubmitDisabled(false);
        return;
      }
      // Caso positivo
      ManagePostLogin(res);
    });
  };
  const ManagePostLogin = (res: LoginResponse) => {
    // Validaciones de respuesta
    if (res.data?.errors) {
      res.data.errors.map((error) => toast.error(error));
      return;
    }
    if (res.data?.data) {
      onSessionStart(res.data?.data.temporalToken);
    } else {
      toast.error("No se logró iniciar sesión");
    }
  };
  return (
    <div className="w-screen h-svh bg-blueDark font-inter flex">
      <div className="m-auto bg-white rounded p-8 flex flex-col">
        <h1 className="text-4xl font-leagueGothic text-center">
          Inicia sesión para acceder
        </h1>
        <form onSubmit={HandleLogin} className="flex flex-col gap-2 my-2">
          {/* Campo de usuario */}
          <div className="flex flex-col">
            <label htmlFor="user">Nombre de usuario *</label>
            <input
              id="user"
              name="user"
              onChange={onChange}
              type="text"
              value={user as string}
              className="bg-gray-100 rounded p-1"
            />
            {isFormSent && userValid && (
              <span className="text-red-500 text-sm">{userValid} </span>
            )}
          </div>
          {/* Campo de contraseña */}
          <div className="flex flex-col">
            <label htmlFor="password">Contraseña *</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                onChange={onChange}
                value={password as string}
                type={ShowPassword ? "text" : "password"}
                className="bg-gray-100 rounded p-1 w-full "
              />
              <button
                type="button"
                className="absolute right-1 bottom-1"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {ShowPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M764-84 624-222q-35 11-71 16.5t-73 5.5q-134 0-245-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q22-39 47-76t58-66l-83-84q-11-11-11-27.5T84-820q11-11 28-11t28 11l680 680q11 11 11.5 27.5T820-84q-11 11-28 11t-28-11ZM480-320q11 0 21-1t20-4L305-541q-3 10-4 20t-1 21q0 75 52.5 127.5T480-320Zm0-480q134 0 245.5 72.5T900-537q5 8 7.5 17.5T910-500q0 10-2 19.5t-7 17.5q-19 37-42.5 70T806-331q-14 14-33 13t-33-15l-80-80q-7-7-9-16.5t1-19.5q4-13 6-25t2-26q0-75-52.5-127.5T480-680q-14 0-26 2t-25 6q-10 3-20 1t-17-9l-33-33q-19-19-12.5-44t31.5-32q25-5 50.5-8t51.5-3Zm79 226q11 13 18.5 28.5T587-513q1 8-6 11t-13-3l-82-82q-6-6-2.5-13t11.5-7q19 2 35 10.5t29 22.5Z" />
                  </svg>
                )}
              </button>
            </div>
            {isFormSent && passwordValid && (
              <span className="text-red-500 text-sm">{passwordValid} </span>
            )}
          </div>
          <button
            type="submit"
            className="rounded mx-auto mty-1 px-2 py-1 bg-blueSemiDark text-white hover:bg-blueDark disabled:hover:bg-blueSemiDark disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={SubmitDisabled}
          >
            Iniciar sesión
          </button>
        </form>
        <div>
          <GoogleLogin
            onSuccess={HandleGoogleLogin}
            onError={() => {
              console.log("Login Failed");
            }}
            shape="pill"
            cancel_on_tap_outside
            useOneTap
          />
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};
