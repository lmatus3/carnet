import { useState } from "react";
import { useSessionStore } from "../../stores";
import { toast } from "sonner";
import axios, { isAxiosError } from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const Login = () => {
  const onLogin = useSessionStore((state) => state.onLogin);
  const [Formulario, setFormulario] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendURL + "/auth", {
        ...Formulario,
      });
      toast.success("Bienvenido");
      onLogin({ email: Formulario.email, token: data.token });
    } catch (error: unknown) {
      console.log(error);
      if (isAxiosError(error)) {
        toast.info(error.response?.data.msg || "No se logró iniciar sesión");
        return;
      }
      toast.info("Error desconocido");
      return;
    }
  };
  return (
    <div className="bg-white text-BlueStrong rounded-lg flex flex-col m-auto w-[300px] p-4 gap-y-2">
      <h1 className="text-h1 m-auto">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col pb-5 gap-2 text-sm">
        <div className="flex flex-col">
          <label className="" htmlFor="Correo">
            Correo
          </label>
          <input
            className="text-black rounded border py-1"
            type="email"
            name="Correo"
            id="Correo"
            onChange={(e) =>
              setFormulario({ ...Formulario, email: e.target.value })
            }
            value={Formulario.email}
          />
        </div>
        <div className="flex flex-col">
          <label className="" htmlFor="password">
            Contraseña
          </label>
          <input
            className="text-black rounded border py-1"
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setFormulario({ ...Formulario, password: e.target.value })
            }
            value={Formulario.password}
          />
        </div>
        <button
          type="submit"
          className="bg-OrangeMedium w-fit m-auto py-1 px-2 rounded hover:bg-orange-400"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};
