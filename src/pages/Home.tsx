import { useEffect, useState } from "react";
import { carnetType } from "../data/tempData";
import { MainLayout } from "../layouts/MainLayout";
import { BackendApi } from "../api/config";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useSessionStore } from "../stores";
import { Carnet } from "../components/Carnet";

export const Home = () => {
  const [Carnets, setCarnets] = useState<carnetType[]>([]);
  const onLogout = useSessionStore((state) => state.onLogout);

  const getCarnets = async () => {
    try {
      const Respuesta = await BackendApi.get("/carnets");
      const { data } = Respuesta.data;
      setCarnets(data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.msg || "No se pudo obtener los datos");
        setTimeout(() => {
          toast.info("Cerrando sesión, por favor vuelva a ingresar");
          onLogout();
        }, 2000);
        return;
      }
      toast.error("Estamos presentando dificultades técnicas");
    }
  };
  useEffect(() => {
    getCarnets();
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col overflow-hidden">
        <h1 className=" text-h2 text-white m-auto my-2 font-leagueGothic md:text-h1">
          Credenciales activas
        </h1>
        {/* Mostrando credenciales obtenidas del usuario actual */}
        {/* 
        // TODO obtener datos del backend esto es para mostrar de ejemplo
        */}
        {/* Card */}
        <div className="flex justify-around flex-wrap gap-y-24 md:gap-y-4 mt-2 mb-4">
          {Carnets.map((carnet) => (
            <Carnet key={"carnet" + carnet.id} carnetData={carnet} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
