import { Toaster } from "sonner";
import { AppRoutes } from "./routes/AppRoutes";

export const CarnetApp = () => {
  return (
    <div className="h-svh bg-GreenPale font-azeretMono flex">
      <AppRoutes />
      {/* Alertas */}
      <Toaster />
    </div>
  );
};
