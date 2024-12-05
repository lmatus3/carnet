import { useEffect, useState } from "react";
import { carnetType } from "../data/tempData";
import { MainLayout } from "../layouts/MainLayout";
import { BackendApi } from "../api/config";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useSessionStore } from "../stores";

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
        <h1 className=" text-h2 md:text-h1 text-white m-auto my-2">
          Credenciales activas
        </h1>
        {/* Mostrando credenciales obtenidas del usuario actual */}
        {/* 
        // TODO obtener datos del backend esto es para mostrar de ejemplo
        */}
        {/* Card */}
        <div className="flex justify-around flex-wrap gap-y-24 md:gap-y-4 mt-2 mb-4">
          {Carnets.map((carnet) => (
            <div
              tabIndex={0}
              key={(carnet.id, carnet.type)}
              className={`bg-gradient-to-tr ${
                carnet.type == 1 && " from-YellowStrong to-OrangeStrong"
              }  ${carnet.type == 2 && " from-YellowLight to-white"} 
              ${carnet.type == 3 && " from-BlueMedium to-GrayMedium text-white"}
              w-11/12 max-w-[500px] m-auto p-4 rounded transition-all relative focus:scale-105 focus:drop-shadow-lg`}
            >
              <h2
                className={`text-h3 md:text-h2 text-black text-center ${
                  carnet.type == 3 && " text-white "
                }`}
              >
                {carnet.name}
              </h2>
              <div>
                <span className="text-lg md:text-h3 font-bold">
                  {carnet.type == 1 && "Carrera"}
                  {carnet.type == 2 && "Cargo"}
                  {carnet.type == 3 && "Facultad"}
                </span>
                <p>
                  {carnet.type == 1 && carnet.carrera}
                  {carnet.type == 2 && carnet.cargo}
                  {carnet.type == 3 && carnet.facultad}
                </p>
              </div>
              <div>
                <span className="text-h3 font-bold">Número de carnet</span>
                <p>29123132</p>
              </div>
              <div>
                <span className="text-h3 font-bold">Válido de</span>
                <p>
                  {new Date(2024, 7, 12).toISOString().split("T")[0]} -{" "}
                  {new Date(2025, 7, 12).toISOString().split("T")[0]}
                </p>
              </div>
              <img
                src={carnet.qrUrl}
                alt={"carnet" + carnet.type}
                className="absolute right-4 bottom-4 w-36 md:w-40"
              />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
