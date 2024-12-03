import { Route, Routes } from "react-router";
import { useSessionStore } from "../stores";
import { Home } from "../pages/Home";
import { Login } from "../pages/auth/Login";
import { LoadingPage } from "../pages/LoadingPage";
import { Eventos } from "../pages/Eventos";
import { useEffect } from "react";

export const AppRoutes = () => {
  const session = useSessionStore((state) => state.session);
  const onLogout = useSessionStore((state) => state.onLogout);
  // Validando sesión actual

  const validarSesion = () => {
    if (!session) {
      onLogout();
    }
  };
  useEffect(() => {
    validarSesion();
  }, []);

  return (
    <>
      <Routes>
        {session === "Logged" && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/eventos" element={<Eventos />} />
          </>
        )}
        {session === "NotLogged" && (
          <>
            <Route path="/" element={<Login />} />
          </>
        )}
        <Route path="/*" element={<LoadingPage />} />
      </Routes>
    </>
  );
};
