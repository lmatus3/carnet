import { toast } from "sonner";
import logoAmarillo from "../assets/imgs/logoAmarillo.png";
import { useSessionStore } from "../stores";

export const MaintenancePage = () => {
  const session = useSessionStore((state) => state.session);
  const onLogout = useSessionStore((state) => state.onLogout);
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex flex-col items-center justify-center p-4 text-center w-full text-white font-inter overflow-clip">
      {/* Logo amarillo como fondo */}
      <div className="absolute bottom-10 w-[70vh] md:w-[100vh]  z-0 opacity-80 mask-gradient">
        <img
          src={logoAmarillo}
          alt="Logo Amarillo"
          className="h-full w-auto object-contain "
        />
      </div>

      <div className="max-w-md mx-auto mt-8 z-20">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-32 fill-white opacity-80 animate-spin-slow"
              viewBox="0 -960 960 960"
            >
              <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
            </svg>
          </div>
          <div className="relative flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 fill-black bg-white rounded-full border-none"
              viewBox="0 -960 960 960"
            >
              <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-leagueGothic tracking-wide font-bold sm:text-4xl md:text-5xl mb-4">
          Estamos en mantenimiento
        </h1>

        <p className="text-muted-foreground text-lg mb-8 max-w-sm mx-auto">
          Nuestro equipo está trabajando para mejorar el sitio. Volveremos en
          breve.
        </p>

        <div className="flex items-center justify-center gap-2 mb-8 text-sm text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 fill-white"
            viewBox="0 -960 960 960"
          >
            <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
          </svg>
          <span>Tiempo estimado para regresar: 15:30PM</span>
        </div>
        {session && session === "Logged" && (
          <button
            onClick={() => {
              onLogout();
              toast.info("Se cerró la sesión")
            }}
            className="bg-white rounded px-4 py-2 text-blueDark font-bold"
          >
            Cerrar sesión
          </button>
        )}
      </div>

      <footer className="mt-auto pt-8 pb-4">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} UNICA. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
};
