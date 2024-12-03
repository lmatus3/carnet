import { carnets } from "../data/tempData";
import { MainLayout } from "../layouts/MainLayout";

export const Home = () => {
  return (
    <MainLayout>
      <div className="flex flex-col">
        <h1 className="text-h1 text-white m-auto">Credenciales activas</h1>
        {/* Mostrando credenciales obtenidas del usuario actual */}
        {/* 
        // TODO obtener datos del backend esto es para mostrar de ejemplo
        */}
        {/* Card */}
        <div className="flex justify-around flex-wrap gap-y -3">
          {carnets.map((carnet) => (
            <div
              tabIndex={0}
              key={(carnet.id, carnet.type)}
              className={`bg-gradient-to-tr ${
                carnet.type == 1 && " from-YellowStrong to-OrangeStrong"
              }  ${carnet.type == 2 && " from-YellowLight to-white"} 
              ${carnet.type == 3 && " from-BlueMedium to-GrayMedium text-white"}
              w-11/12 max-w-[500px] m-auto p-2 rounded focus:scale-105 transition-all`}
            >
              <h2 className="text-h2 text-black">{carnet.name}</h2>
              <div>
                <span className="text-h3 font-bold">Carrera</span>
                <p>Medicina</p>
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
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
