import { useEffect, useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { Carnet } from "../components/Carnet";
import { GetEstudianteInfo } from "../service/GetCarnetInfo";
import { toast } from "sonner";
import { carnetType } from "../types/carnetType";
import { envs } from "../plugins/envs";

export const Home = () => {
  const [Carnets, setCarnets] = useState<carnetType[]>([]);
  // Procesando datos de backend para mostrar carnet
  const GetCarnetsOfStudent = () => {
    GetEstudianteInfo().then((res) => {
      if (res.ok && res.data) {
        const InfoEstudiante = res.data;
        InfoEstudiante.map((Estudio) => {
          if (Estudio.matriculado === "SI") {
            // Caso positivo
            if (Estudio.estado == "Expulsado") {
              // Caso expulsado
              return;
            }
            const carnet: carnetType = {
              credentialCode: Estudio.estudianteCarne,
              name: Estudio.nombreEstudiante,
              type: 1, // Estudiante
              // TODO Trim carrera nombre
              carrera: Estudio.carreraNombre,
              url: envs.LINK_APP + "validar/" + Estudio.estudianteCarne,

              photoUrl: Estudio.personaFoto,
              timeValid: Estudio.periodoLectivo,
              qrUrl: "",
            };
            setCarnets([carnet])
            return;
          }
        });
      } else {
        if (res.error) {
          toast.error(res.error);
          return;
        }
        toast.error("No se logró obtener su información");
        return;
      }
    });
  };

  useEffect(() => {
    GetCarnetsOfStudent();
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
            <Carnet key={"carnet" + carnet.type} carnetData={carnet} />
          ))}
          {Carnets.length === 0 && (
            <div className="bg-white p-8 rounded">
              <h1>
                Actualmente <b>no</b> tiene carnet activo en la institución
              </h1>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
