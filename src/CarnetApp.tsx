import { Toaster } from "sonner";
import { AppRoutes } from "./routes/AppRoutes";

export const CarnetApp = () => {
  // Este nivel representa un layout macro
  return (
    <div className="h-auto min-h-screen bg-BlueStrong font-inter flex">
      {/* Rutas de la aplicación */}
      <AppRoutes />
      {/* Alertas */}
      <Toaster richColors expand position="top-right"  />
    </div>
  );
};
