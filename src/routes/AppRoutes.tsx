import { Route, Routes } from "react-router";
import { useSessionStore } from "../stores";
import { Home } from "../pages/Home";
import { Login } from "../pages/auth/Login";
import { LoadingPage } from "../pages/LoadingPage";
import { Eventos } from "../pages/Eventos";

export const AppRoutes = () => {
  const session = useSessionStore((state) => state.session);

  return (
    <>
      <Routes>
        {session === "Logged" && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/eventos" element={<Eventos />} />
          </>
        )}
        {session === "NotLogged" && <Route path="/" element={<Login />} />}
        <Route path="/*" element={<LoadingPage />} />
      </Routes>
    </>
  );
};
