import { useEffect, useState } from "react";
import { carnetType } from "../data/tempData";
import { MainLayout } from "../layouts/MainLayout";
import { Carnet } from "../components/Carnet";

export const Home = () => {
  const [Carnets, setCarnets] = useState<carnetType[]>([]);


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
