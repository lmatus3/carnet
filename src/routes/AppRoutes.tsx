import { Navigate, Route, Routes, useLocation } from "react-router";
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
import { VerAsistencia } from "../pages/asistencias/VerAsistencia";
import { TomarAsistencia } from "../pages/asistencias/TomarAsistencia";
import { envs } from "../plugins/envs";
import { MaintenancePage } from "../pages/MaintenancePage";
// import { Noticias } from "../pages/noticias/Noticias";

export const AppRoutes = () => {
  // ! Mantenimiento de app
  const isAppInMaintenance = envs.MAINTENANCE === "true";
  // Instanciando herramientas de sesión
  // La sesión es un string y puede ser "Logged" | "NotLogged" | "Checking"
  const session = useSessionStore((state) => state.session);
  // El token viene del backend y es la credencial del cliente para procesos
  const token = useSessionStore((state) => state.token);
  // Los perfiles pueden ser "Estudiante" | "Administrativo" | "Docente"
  const perfiles = useSessionStore((state) => state.perfiles);
  // Función para cerrar sesión
  const onLogout = useSessionStore((state) => state.onLogout);
  // Función para cargar los perfiles al estado (Cliente)
  const onLoadProfiles = useSessionStore((state) => state.onLoadProfiles);
  // Instanciando posición actual
  const { pathname } = useLocation();
  // Validando sesión actual
  const validarSesion = () => {
    //? Si no existe una sesión o token significa que no tengo acceso a la aplicación
    //? Con esta lógica también, al entrar a la página se crean los estados en la aplicación
    // Validando sesión
    // console.log(token, session)
    if (!session || !token) {
      onLogout();
    }
  };
  useEffect(() => {
    validarSesion();
  }, [pathname, token]);

  // Consiguiendo periles de usuario
  const obtenerPerfilesUsuario = async () => {
    // onLoadProfile();
    const response = await GetPerfilesDeUsuario();
    if (response.ok && response.data) {
      const PerfilesUsuarioActual = response.data.map((perfil) => {
        return perfil.nombre;
      });
      // console.log(PerfilesUsuarioActual);
      onLoadProfiles(PerfilesUsuarioActual as TypeOfUser[]);
    }
  };
  useEffect(() => {
    if (token) {
      if (!perfiles) {
        // Consultando por perfil
        obtenerPerfilesUsuario();
      } else {
        // console.log("Perfiles actuales", perfiles);
      }
    }
  }, [pathname, session]);

  return (
    <>
      <Routes>
        {isAppInMaintenance ? (
          <>
            <Route path="/mantenimiento" element={<MaintenancePage />} />
            <Route path="/*" element={<Navigate to={"/mantenimiento"} replace />} />
          </>
        ) : (
          <>
            {session === "Logged" && token && (
              <>
                <Route path="/" element={<Home />} />
                {perfiles &&
                  (perfiles?.includes("Docente") ||
                    perfiles?.includes("Docente posgrado") ||
                    perfiles?.includes("Administrativo")) && (
                    <>
                      <Route path="/eventos" element={<Eventos />} />
                      <Route path="/eventos/:id" element={<Evento />} />
                      <Route
                        path="/tomar_asistencia/:id"
                        element={<TomarAsistencia />}
                      />
                      <Route
                        path="/ver_asistencia/:id"
                        element={<VerAsistencia />}
                      />
                    </>
                  )}
                <Route path="/asistencia/:id" element={<MarcarAsistencia />} />
                <Route path="/*" element={<Navigate to={"/"} replace />} />
                {/* <Route path="/noticias" element={<Noticias />} /> */}
              </>
            )}
            {session === "NotLogged" && (
              <>
                <Route path="/validar/:codigo" element={<Validate />} />
                <Route path="/*" element={<Login />} />
              </>
            )}
          </>
        )}

        <Route path="/*" element={<LoadingPage />} />
      </Routes>
    </>
  );
};
