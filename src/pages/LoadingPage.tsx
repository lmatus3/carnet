import { useState } from "react";
import { users } from "../data/tempData";
import { toast } from "sonner";
import { useSessionStore } from "../stores";

export const LoadingPage = () => {
  const onLogin = useSessionStore((state) => state.onLogin);
  const [Formulario, setFormulario] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usuario = users.find((user) => user.email === Formulario.email);
    if (!usuario) {
      toast.info("Sus credenciales no pertenecen a una cuenta");
      return;
    }
    if (usuario.password === Formulario.password) {
      toast.success("Bienvenido");
      onLogin(usuario.token);
    } else {
      toast.info("Credenciales incorrectas");
    }
  };
  return (
    <div className="bg-DarkBlue text-GreenLight flex flex-col m-auto w-11/12 md:w-1/4">
      <h1 className="text-h1 m-auto">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col pb-5 gap-2">
        <div className="flex flex-col">
          <label className="m-auto" htmlFor="Correo">
            Correo
          </label>
          <input
            className="text-black"
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
          <label className="m-auto" htmlFor="password">
            Contraseña
          </label>
          <input
            className="text-black"
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
          className="bg-PaleBlue w-fit m-auto px-10 py-1 hover:opacity-80"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};
