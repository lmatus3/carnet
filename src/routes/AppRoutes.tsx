import { Route, Routes, useLocation } from "react-router";
import { useSessionStore } from "../stores";
import { Home } from "../pages/Home";
import { Login } from "../pages/auth/Login";
import { LoadingPage } from "../pages/LoadingPage";
import { useEffect } from "react";
import { Validate } from "../pages/Validate";
import { Eventos } from "../pages/eventos/Eventos";
import { Evento } from "../pages/eventos/Evento";
import { MarcarAsistencia } from "../pages/asistencias/MarcarAsistencia";
import { GetPerfilesDeUsuario } from "../service/GetPerfilesDeUsuario";
import { TypeOfUser } from "../types/userTypes";
import { TomarAsistencia } from "../pages/TomarAsistencia";

export const AppRoutes = () => {
  const session = useSessionStore((state) => state.session);
  const onLogout = useSessionStore((state) => state.onLogout);
  const token = useSessionStore((state) => state.token);
  const perfiles = useSessionStore((state) => state.perfiles);
  const onLoadProfiles = useSessionStore((state) => state.onLoadProfiles);
  // Validando sesión actual
  const validarSesion = () => {
    // console.log(session);
    if (!session) {
      onLogout();
    }
  };
  useEffect(() => {
    validarSesion();
  }, []);

  // Consiguiendo periles de usuario
  const { pathname } = useLocation();
  const obtenerPerfilesUsuario = async () => {
    // onLoadProfile();
    const response = await GetPerfilesDeUsuario();
    if (response.ok && response.data) {
      const PerfilesUsuarioActual = response.data.map((perfil) => {
        return perfil.nombre;
      });
      console.log(PerfilesUsuarioActual);
      onLoadProfiles(PerfilesUsuarioActual as TypeOfUser[]);
    }
  };
  useEffect(() => {
    if (token) {
      if (!perfiles) {
        // Consultando por perfil
        obtenerPerfilesUsuario();
      } else {
        console.log("Perfiles actuales", perfiles);
      }
    }
  }, [pathname,session]);

  return (
    <>
      <Routes>
        {session === "Logged" && token && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/eventos/:id" element={<Evento />} />
            <Route path="/asistencia/:id" element={<MarcarAsistencia />} />
            <Route path="/tomar_asistencia/:id" element={<TomarAsistencia />} />
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
