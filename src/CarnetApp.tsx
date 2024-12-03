import { Toaster } from "sonner";
import { AppRoutes } from "./routes/AppRoutes";

export const CarnetApp = () => {
  return (
    <div className="h-auto min-h-screen bg-BlueStrong font-azeretMono flex">
      <AppRoutes />
      {/* Alertas */}
      <Toaster richColors   />
    </div>
  );
};
