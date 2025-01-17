import { Route, Routes } from "react-router";
import { useSessionStore } from "../stores";
import { Home } from "../pages/Home";
import { Login } from "../pages/auth/Login";
import { LoadingPage } from "../pages/LoadingPage";
import { Asistencia } from "../pages/Asistencia";
import { useEffect } from "react";
import { Validate } from "../pages/Validate";
// import { Noticias } from "../pages/Noticias";

export const AppRoutes = () => {
  const session = useSessionStore((state) => state.session);
  const onLogout = useSessionStore((state) => state.onLogout);
  // Validando sesión actual

  const validarSesion = () => {
    console.log(session);
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
            <Route path="/asistencias" element={<Asistencia />} />
            {/* <Route path="/noticias" element={<Noticias />} /> */}
          </>
        )}
        {session === "NotLogged" && (
          <>
            <Route path="/validar/:codigo" element={<Validate />} />
            <Route path="/*" element={<Login />} />
          </>
        )}
        <Route path="/*" element={<LoadingPage />} />
      </Routes>
    </>
  );
};
